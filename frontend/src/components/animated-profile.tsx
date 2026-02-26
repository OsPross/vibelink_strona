"use client";

import { motion } from "framer-motion";
import { 
  Instagram, Github, Twitter, Youtube, Linkedin, Facebook, Globe, Twitch, ArrowRight, Gamepad2, ShieldCheck, Play 
} from "lucide-react";

const getIconForUrl = (url: string | undefined | null) => {
  if (!url) return <Globe className="w-5 h-5" />;
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('instagram.com')) return <Instagram className="w-5 h-5" />;
  if (lowerUrl.includes('github.com')) return <Github className="w-5 h-5" />;
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return <Twitter className="w-5 h-5" />;
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return <Youtube className="w-5 h-5" />;
  if (lowerUrl.includes('linkedin.com')) return <Linkedin className="w-5 h-5" />;
  if (lowerUrl.includes('facebook.com')) return <Facebook className="w-5 h-5" />;
  if (lowerUrl.includes('twitch.tv')) return <Twitch className="w-5 h-5" />;
  return <Globe className="w-5 h-5" />;
};

const getIconForPlatform = (platform: string) => {
  switch(platform.toLowerCase()) {
    case 'instagram': return <Instagram className="w-6 h-6" />;
    case 'github': return <Github className="w-6 h-6" />;
    case 'twitter': return <Twitter className="w-6 h-6" />;
    case 'youtube': return <Youtube className="w-6 h-6" />;
    case 'linkedin': return <Linkedin className="w-6 h-6" />;
    case 'facebook': return <Facebook className="w-6 h-6" />;
    case 'twitch': return <Twitch className="w-6 h-6" />;
    default: return <Globe className="w-6 h-6" />;
  }
};

const AnimatedBackground = ({ theme }: { theme: string }) => {
  if (theme === 'synthwave') return (
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#12002b] via-[#32004a] to-[#ff0055] overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-[linear-gradient(rgba(255,0,85,0.4)_2px,transparent_2px),linear-gradient(90deg,rgba(255,0,85,0.4)_2px,transparent_2px)] bg-[size:50px_50px] [transform:perspective(500px)_rotateX(60deg)] [transform-origin:top] opacity-80" />
    </div>
  );
  if (theme === 'neon') return <div className="fixed inset-0 z-0 bg-[#050505]" />;
  if (theme === 'cyberpunk') return <div className="fixed inset-0 z-0 bg-[#fcee0a]" />;
  if (theme === 'glass') return <div className="fixed inset-0 z-0 bg-slate-900" />;
  if (theme === 'hacker') return <div className="fixed inset-0 z-0 bg-black" />;
  if (theme === 'dark') return <div className="fixed inset-0 z-0 bg-zinc-950" />;
  if (theme === 'light') return <div className="fixed inset-0 z-0 bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200" />;
  return <div className="fixed inset-0 z-0 bg-white" />;
};

export default function AnimatedProfile({ 
  profile, latestYoutubeVideoId, twitchData, steamData, csRepData
}: { 
  profile: any, latestYoutubeVideoId?: string | null, twitchData?: any, steamData?: any, csRepData?: any 
}) {
  const themeStyles: Record<string, string> = {
    dark: "text-white", light: "text-zinc-900", neon: "text-white", minimal: "text-black font-serif",
    cyberpunk: "text-black uppercase tracking-wider font-bold", synthwave: "text-white", hacker: "text-green-500 font-mono", glass: "text-white",
  };
  const currentThemeText = themeStyles[profile.theme] || themeStyles.dark;
  const isLight = profile.theme === 'light' || profile.theme === 'minimal' || profile.theme === 'cyberpunk';

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  const handleLinkClick = async (linkId: string) => {
    try { await fetch(`http://localhost:3000/links/${linkId}/click`, { method: 'POST' }); } 
    catch (error) {}
  };

  // --- LOGIKA LAYOUTU ENGINE ---
  const rawLinks = profile.links?.sort((a: any, b: any) => a.order - b.order) || [];
  let renderItems = [...rawLinks].filter(l => l.isActive !== false);

  // Sprawdzamy czy użytkownik ręcznie wrzucił widgety z panelu
  const placedTwitch = renderItems.some(l => l.url === "vibelink://widget/twitch");
  const placedYoutube = renderItems.some(l => l.url === "vibelink://widget/youtube");
  const placedGaming = renderItems.some(l => l.url === "vibelink://widget/gaming");

  // Jeśli nie wrzucił, a dane są, ładujemy je awaryjnie NA SAMĄ GÓRĘ profilu
  if (!placedGaming && (steamData || csRepData)) {
    renderItems.unshift({ id: 'auto-gaming', type: 'LINK', url: 'vibelink://widget/gaming' });
  }
  if (!placedYoutube && latestYoutubeVideoId) {
    renderItems.unshift({ id: 'auto-yt', type: 'LINK', url: 'vibelink://widget/youtube' });
  }
  if (!placedTwitch && twitchData?.isLive) {
    renderItems.unshift({ id: 'auto-twitch', type: 'LINK', url: 'vibelink://widget/twitch' });
  }

  return (
    <main className={`min-h-screen relative overflow-hidden flex flex-col items-center py-20 px-4 ${currentThemeText}`}>
      <AnimatedBackground theme={profile.theme} />

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-2xl w-full flex flex-col items-center relative z-10">
        
        {/* AWATAR */}
        <motion.div variants={itemVariants} className="relative group mb-6">
          <div className={`w-32 h-32 rounded-full border-4 shadow-2xl overflow-hidden bg-black/50 ${isLight ? 'border-black/20' : 'border-white/20'}`}>
            {profile.avatarUrl ? <img src={profile.avatarUrl} alt={profile.username} className="w-full h-full object-cover" /> : null}
          </div>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-3xl font-extrabold mb-2">@{profile.username}</motion.h1>
        {profile.bio && <motion.p variants={itemVariants} className="text-center mb-8 max-w-md">{profile.bio}</motion.p>}

        {/* KLOCKI LAYOUTU */}
        <div className="flex flex-col gap-4 w-full">
          {renderItems.map((item: any) => {
            
            // --- 1. WIDGET TWITCH ---
            if (item.url === "vibelink://widget/twitch") {
              if (!twitchData?.isLive) return null; // Ukrywa zepsuty, jeśli wyłączony stream
              return (
                <motion.a variants={itemVariants} key={item.id} href={`https://twitch.tv/${twitchData.channel}`} target="_blank" rel="noopener noreferrer" className={`w-full p-1 rounded-[2rem] shadow-lg mb-2 border block group ${isLight ? 'bg-white border-purple-500/30' : 'bg-black/50 backdrop-blur-xl border-purple-500/30'}`}>
                  <div className="flex items-center justify-between px-5 py-3 border-b border-purple-500/20">
                    <div className="flex items-center gap-2"><Twitch className="w-5 h-5 text-purple-500" /><span className="font-bold text-sm text-purple-400">Twitch</span></div>
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span><span className="text-[10px] font-bold text-red-500 uppercase">Na Żywo</span></div>
                  </div>
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 rounded-b-[1.7rem]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                    <img src={twitchData.thumbnail} alt="Stream" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute bottom-4 left-5 right-5 z-20"><h3 className="text-white font-bold text-lg drop-shadow-lg mb-2">{twitchData.title}</h3><div className="text-zinc-300 text-xs font-semibold bg-black/40 w-fit px-3 py-1.5 rounded-lg border border-white/10">{twitchData.viewers} widzów</div></div>
                  </div>
                </motion.a>
              );
            }

            // --- 2. WIDGET YOUTUBE ---
            if (item.url === "vibelink://widget/youtube") {
              if (!latestYoutubeVideoId) return null;
              return (
                <motion.div variants={itemVariants} key={item.id} className={`w-full p-1 rounded-[2rem] shadow-xl mb-2 border overflow-hidden ${isLight ? 'bg-black/5 border-black/10' : 'bg-white/10 backdrop-blur-xl border-white/20'}`}>
                  <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10"><Youtube className="w-5 h-5 text-red-500" /><span className="font-bold text-sm opacity-90">Ostatnio na Kanale</span></div>
                  <div className="aspect-video w-full rounded-b-[1.7rem] bg-black"><iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${latestYoutubeVideoId}?rel=0`} title="YouTube Video" frameBorder="0" allowFullScreen></iframe></div>
                </motion.div>
              );
            }

            // --- 3. WIDGET KARTY GAMINGOWE ---
            if (item.url === "vibelink://widget/gaming") {
              if (!steamData && !csRepData) return null;
              return (
                <motion.div variants={itemVariants} key={item.id} className={`w-full grid gap-4 mb-2 ${steamData && csRepData ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 max-w-[400px] mx-auto'}`}>
                  {steamData && (
                    <a href={steamData.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 rounded-3xl border transition-all ${isLight ? 'bg-white border-blue-500/20' : 'bg-[#171a21]/80 backdrop-blur-xl border-blue-500/30'}`}>
                      <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-[#66c0f4]/50 relative"><img src={steamData.image} alt="Steam" className="w-full h-full object-cover" /></div>
                      <div className="flex-1 overflow-hidden flex flex-col justify-center">
                        <p className="text-[10px] font-bold text-[#66c0f4] uppercase tracking-wider mb-0.5">Steam Profile</p>
                        <p className={`font-bold truncate text-sm ${isLight ? 'text-black' : 'text-white'}`}>{steamData.title}</p>
                      </div>
                    </a>
                  )}
                  {csRepData && (
                    <a href={csRepData.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 rounded-3xl border transition-all ${isLight ? 'bg-white border-orange-500/20' : 'bg-[#1a1a1a]/80 backdrop-blur-xl border-orange-500/30'}`}>
                      <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-orange-500/50"><img src={csRepData.image} alt="CSRep" className="w-full h-full object-cover" /></div>
                      <div className="flex-1 overflow-hidden flex flex-col justify-center">
                        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-0.5">CS-Reputation</p>
                        <p className={`font-bold truncate text-sm ${isLight ? 'text-black' : 'text-white'}`}>{csRepData.title}</p>
                      </div>
                    </a>
                  )}
                </motion.div>
              );
            }

            // --- 4. ZWYKŁY NAGŁÓWEK ---
            if (item.type === 'HEADER') return (
              <motion.div variants={itemVariants} key={item.id} className="w-full flex items-center gap-4 mt-6 mb-1">
                <div className={`h-px flex-1 ${isLight ? 'bg-black/20' : 'bg-white/40'}`} />
                <h2 className="text-sm font-bold uppercase tracking-[0.25em] opacity-80">{item.title}</h2>
                <div className={`h-px flex-1 ${isLight ? 'bg-black/20' : 'bg-white/40'}`} />
              </motion.div>
            );
            
            // --- 5. ZWYKŁY TEKST ---
            if (item.type === 'TEXT') return (
              <motion.div variants={itemVariants} key={item.id} className={`w-full backdrop-blur-2xl rounded-3xl p-6 text-center border ${isLight ? 'bg-black/5 border-black/10' : 'bg-white/10 border-white/20'}`}>
                {item.title && <h3 className="font-bold mb-3 text-lg">{item.title}</h3>}
                <p className="whitespace-pre-wrap opacity-90">{item.content}</p>
              </motion.div>
            );

            // --- 6. ZWYKŁY LINK ---
            return (
              <motion.a variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" onClick={() => handleLinkClick(item.id)} className={`group relative w-full flex items-center p-2 rounded-2xl shadow-xl overflow-hidden border ${isLight ? 'bg-white border-black/10 text-black' : 'bg-white/10 backdrop-blur-2xl border-white/20 text-white'}`}>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${isLight ? 'bg-black/5' : 'bg-white/10'}`}>{getIconForUrl(item.url)}</div>
                <span className="font-bold tracking-wide flex-1 text-center pr-14 text-lg">{item.title}</span>
                <div className="absolute right-5 opacity-0 group-hover:opacity-100 transition-all"><ArrowRight className="w-6 h-6" /></div>
              </motion.a>
            );
          })}
        </div>
        
        <motion.div variants={itemVariants} className="mt-20 mb-8 w-full text-center opacity-60 text-sm font-semibold">
          <p>Stworzone z <span className="text-red-500">❤️</span> w VibeLink</p>
        </motion.div>
      </motion.div>
    </main>
  );
}