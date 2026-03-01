import { notFound } from "next/navigation";
import AnimatedProfile from "@/components/animated-profile";
import { getDictionary } from "../../../dictionaries/dictionaries";

async function getProfile(username: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/profiles/${username}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

// 1. SCRAPER YOUTUBE
async function getLatestYoutubeVideoId(channelUrl: string) {
  try {
    if (!channelUrl) return null;
    let url = channelUrl.trim();
    if (!url.endsWith('/videos')) url = url.endsWith('/') ? url + 'videos' : url + '/videos';
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, next: { revalidate: 3600 } });
    const match = (await res.text()).match(/"videoRenderer":\{"videoId":"([a-zA-Z0-9_-]{11})"/);
    return match ? match[1] : null;
  } catch { return null; }
}

// 2. SCRAPER TWITCHA
async function getTwitchStatus(channel: string) {
  if (!channel) return null;
  const cleanChannel = channel.replace('@', '').trim();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); 

  try {
    const uptimeRes = await fetch(`https://decapi.me/twitch/uptime/${cleanChannel}`, { 
      next: { revalidate: 60 }, signal: controller.signal 
    });
    const uptimeText = await uptimeRes.text();

    if (uptimeText.toLowerCase().includes("offline") || uptimeText.toLowerCase().includes("not found")) {
      clearTimeout(timeoutId);
      return { isLive: false };
    }

    const [titleRes, viewersRes] = await Promise.all([
      fetch(`https://decapi.me/twitch/title/${cleanChannel}`, { next: { revalidate: 60 }, signal: controller.signal }),
      fetch(`https://decapi.me/twitch/viewercount/${cleanChannel}`, { next: { revalidate: 60 }, signal: controller.signal })
    ]);

    const title = await titleRes.text();
    const viewers = await viewersRes.text();
    clearTimeout(timeoutId);

    return {
      isLive: true,
      channel: cleanChannel,
      title,
      viewers,
      thumbnail: `https://static-cdn.jtvnw.net/previews-ttv/live_user_${cleanChannel.toLowerCase()}-640x360.jpg`
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    return null;
  }
}

// 3. OMIJANIE CLOUDFLARE CS-REP (Pobieranie awatara prosto ze Steama)
async function fetchCsRepProfile(url: string) {
  if (!url) return null;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);
  
  try {
    // Wyciągamy Steam64 ID z linku do CS-Rep
    const match = url.match(/\d{17}/);
    const steam64Id = match ? match[0] : null;

    let title = "CS-Rep Profile";
    let image = null;

    if (steam64Id) {
      // Uderzamy prosto do Steama z tym ID, ignorując zablokowany CS-Rep
      const steamUrl = `https://steamcommunity.com/profiles/${steam64Id}?l=english`;
      const steamRes = await fetch(steamUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }, next: { revalidate: 300 }, signal: controller.signal });
      const html = await steamRes.text();

      const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/i);
      const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);

      if (titleMatch) title = titleMatch[1].replace("Steam Community :: ", "");
      if (imageMatch) image = imageMatch[1];
    }

    clearTimeout(timeoutId);
    return { title, image, url };
  } catch { 
    clearTimeout(timeoutId);
    return { title: "CS-Rep Profile", image: null, url };
  }
}

// 4. SCRAPER STEAM
async function fetchSteamProfile(url: string) {
  if (!url) return null;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);
  
  try {
    const fetchUrl = url.includes('?') ? `${url}&l=english` : `${url}?l=english`;
    const res = await fetch(fetchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }, next: { revalidate: 300 }, signal: controller.signal });
    clearTimeout(timeoutId);
    const html = await res.text();
    
    const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/i);
    const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
    
    let title = titleMatch ? titleMatch[1].replace("Steam Community :: ", "") : "Steam Profile";
    let image = imageMatch ? imageMatch[1] : null;

    return { title, image, url };
  } catch { 
    clearTimeout(timeoutId);
    return null; 
  }
}

export default async function PublicProfilePage({ params }: { params: Promise<{ lang: 'pl' | 'en', username: string }> }) {
  const resolvedParams = await params;
  const { lang, username } = resolvedParams;

  const dict = await getDictionary(lang);

  const profile = await getProfile(username);
  if (!profile) notFound();

  const [youtubeVideoId, twitchData, steamData, csRepData] = await Promise.all([
    profile.youtubeChannelUrl ? getLatestYoutubeVideoId(profile.youtubeChannelUrl) : null,
    profile.twitchChannel ? getTwitchStatus(profile.twitchChannel) : null,
    profile.steamUrl ? fetchSteamProfile(profile.steamUrl) : null,
    profile.csRepUrl ? fetchCsRepProfile(profile.csRepUrl) : null,
  ]);

  return (
    <AnimatedProfile 
      profile={profile} 
      latestYoutubeVideoId={youtubeVideoId} 
      twitchData={twitchData} 
      steamData={steamData}
      csRepData={csRepData}
      dict={dict}
    />
  );
}