import { notFound } from "next/navigation";
import AnimatedProfile from "@/components/animated-profile";
// Zmieniony, w 100% bezpieczny import:
import { getDictionary } from "../../../dictionaries/dictionaries";

async function getProfile(username: string) {
  try {
    const res = await fetch(`http://localhost:3000/profiles/${username}`, { cache: 'no-store' });
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

// 3. KAFELEK CS-REP
async function fetchCsRepProfile(url: string) {
  if (!url) return null;
  try {
    const idMatch = url.match(/(?:player|profile)\/(\d+)/);
    const steamId = idMatch ? idMatch[1] : null;
    let title = "Profil CS-Rep";
    let image = null;

    if (steamId) {
      const steamUrl = `https://steamcommunity.com/profiles/${steamId}?xml=1`;
      const res = await fetch(steamUrl, { next: { revalidate: 3600 } });
      if (res.ok) {
        const xml = await res.text();
        const titleMatch = xml.match(/<steamID><!\[CDATA\[(.*?)\]\]><\/steamID>/);
        const imageMatch = xml.match(/<avatarFull><!\[CDATA\[(.*?)\]\]><\/avatarFull>/);
        if (titleMatch) title = titleMatch[1];
        if (imageMatch) image = imageMatch[1];
      }
    }
    return { title, image, url };
  } catch (err) { return null; }
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

    let game = null;
    let status = 'offline';

    const inGameMatch = html.match(/<div class="profile_in_game_name"[^>]*>(?:<a[^>]*>)?([^<]+)(?:<\/a>)?<\/div>/i);
    if (inGameMatch && inGameMatch[1]) {
        game = inGameMatch[1].trim();
        status = 'in-game';
    } else {
        const recentGameMatch = html.match(/<div class="game_name"[^>]*><a[^>]*>([^<]+)<\/a><\/div>/i);
        if (recentGameMatch && recentGameMatch[1]) {
            game = recentGameMatch[1].trim();
            status = 'recent';
        }
    }
    return { title, image, url, game, status };
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