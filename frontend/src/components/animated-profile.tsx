"use client";

import { motion, Variants } from "framer-motion";
import { Instagram, Github, Twitter, Youtube, Linkedin, Facebook, Globe, Twitch, ArrowRight, Zap, Gamepad2, ShieldCheck } from "lucide-react";
import { THEME_CONFIG, AnimatedBackground } from "@/lib/themes";

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
    case 'instagram': return <Instagram className="w-5 h-5" />;
    case 'github': return <Github className="w-5 h-5" />;
    case 'twitter': return <Twitter className="w-5 h-5" />;
    case 'youtube': return <Youtube className="w-5 h-5" />;
    case 'linkedin': return <Linkedin className="w-5 h-5" />;
    case 'facebook': return <Facebook className="w-5 h-5" />;
    case 'twitch': return <Twitch className="w-5 h-5" />;
    default: return <Globe className="w-5 h-5" />;
  }
};

export default function AnimatedProfile({ 
  profile, latestYoutubeVideoId, twitchData, steamData, csRepData, dict
}: { 
  profile: any, latestYoutubeVideoId?: string | null, twitchData?: any, steamData?: any, csRepData?: any, dict?: any 
}) {
  const theme = THEME_CONFIG[profile.theme] ? profile.theme : 'dark';
  const cfg = THEME_CONFIG[theme];

  // FIX: Dodany typ Variants i rzutowanie tablicy ease, żeby Vercel nie płakał
  const containerVariants: Variants = { 
    hidden: { opacity: 0 }, 
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    } 
  };
  
  const itemVariants: Variants = { 
    hidden: { opacity: 0, y: 30, scale: 0.95 }, 
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
      } 
    } 
  };

  const handleLinkClick = async (linkId: string) => {
    try { await fetch(`http://localhost:3000/links/${linkId}/click`, { method: 'POST' }); } 
    catch (error) {}
  };

  const rawLinks = profile.links?.sort((a: any, b: any) => a.order - b.order) || [];
  let renderItems = [...rawLinks].filter(l => l.isActive !== false);

  const placedTwitch = renderItems.some(l => l.url === "vibelink://widget/twitch");
  const placedYoutube = renderItems.some(l => l.url === "vibelink://widget/youtube");
  const placedGaming = renderItems.some(l => l.url === "vibelink://widget/gaming");

  if (!placedGaming && (steamData || csRepData)) renderItems.unshift({ id: 'auto-gaming', type: 'LINK', url: 'vibelink://widget/gaming' });
  if (!placedYoutube && latestYoutubeVideoId) renderItems.unshift({ id: 'auto-yt', type: 'LINK', url: 'vibelink://widget/youtube' });
  if (!placedTwitch && twitchData?.isLive) renderItems.unshift({ id: 'auto-twitch', type: 'LINK', url: 'vibelink://widget/twitch' });

  return (
    <main className={`min-h-screen relative overflow-hidden flex flex-col items-center py-20 px-4 selection:bg-white/30 selection:text-white`}>
      <AnimatedBackground theme={theme} />

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-2xl w-full flex flex-col items-center relative z-10">
        
        <motion.div variants={itemVariants} className="relative mb-6">
          <div className={`w-32 h-32 flex items-center justify-center overflow-hidden shadow-2xl relative z-10 ${cfg.avatarClass}`}>
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatarUrl} alt={profile.username} className="w-full h-full object-cover" />
            ) : (
              <Globe className="w-16 h-16 opacity-50" />
            )}
          </div>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className={`text-3xl md:text-4xl font-extrabold mb-3 text-center ${cfg.textClass}`}>
          @{profile.username}
        </motion.h1>
        
        {profile.bio && (
          <motion.p variants={itemVariants} className={`text-center mb-6 max-w-md text-lg leading-relaxed ${cfg.bioClass}`}>
            {profile.bio}
          </motion.p>
        )}

        {profile.socials && typeof profile.socials === 'object' && Object.values(profile.socials).some(val => !!val) && (
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-10 w-full px-4">
            {Object.entries(profile.socials).map(([platform, url]) => {
              if (!url || typeof url !== 'string') return null;
              return (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center w-12 h-12 transition-all duration-300 hover:scale-110 shadow-lg ${theme === 'minimal' || theme === 'cyberpunk' || theme === 'hacker' || theme === 'monochrome' || theme === 'vaporwave' ? 'border-2' : 'rounded-full'} ${cfg.cardClass} group`}>
                  <div className={`transition-colors opacity-80 group-hover:opacity-100 ${theme === 'minimal' || theme === 'monochrome' ? 'group-hover:text-current' : cfg.textClass}`}>
                    {getIconForPlatform(platform)}
                  </div>
                </a>
              );
            })}
          </motion.div>
        )}

        <div className="flex flex-col gap-5 w-full">
          {renderItems.map((item: any) => {
            if (item.url === "vibelink://widget/twitch") {
              if (!twitchData?.isLive) return null;
              return (
                <motion.a variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} key={item.id} href={`https://twitch.tv/${twitchData.channel}`} target="_blank" rel="noopener noreferrer" className={`w-full overflow-hidden block group transition-all ${cfg.cardClass} ${cfg.roundedClass}`}>
                  <div className={`flex items-center justify-between px-6 py-4 border-b ${theme === 'minimal' || theme === 'monochrome' ? 'border-current' : 'border-white/10'}`}>
                    <div className="flex items-center gap-3"><Twitch className="w-5 h-5 text-purple-500" /><span className={`font-bold ${theme === 'minimal' || theme === 'monochrome' ? 'text-current group-hover:text-current' : 'text-purple-400'}`}>Twitch Stream</span></div>
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /><span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Na Żywo</span></div>
                  </div>
                  <div className={`relative aspect-video w-full overflow-hidden bg-black ${theme === 'minimal' || theme === 'monochrome' ? '' : 'rounded-b-inherit'}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={twitchData.thumbnail} alt="Stream" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute bottom-4 left-6 right-6 z-20">
                      <h3 className="text-white font-bold text-xl drop-shadow-lg mb-2 truncate">{twitchData.title}</h3>
                      <div className="text-white text-xs font-bold bg-black/60 backdrop-blur-md w-fit px-4 py-2 rounded-xl border border-white/20">{twitchData.viewers} widzów</div>
                    </div>
                  </div>
                </motion.a>
              );
            }

            if (item.url === "vibelink://widget/youtube") {
              if (!latestYoutubeVideoId) return null;
              return (
                <motion.div variants={itemVariants} key={item.id} className={`w-full overflow-hidden transition-all ${cfg.cardClass} ${cfg.roundedClass}`}>
                  <div className={`flex items-center gap-3 px-6 py-4 border-b ${theme === 'minimal' || theme === 'monochrome' ? 'border-current' : 'border-white/10'}`}>
                    <Youtube className="w-5 h-5 text-red-500" />
                    <span className={`font-bold ${theme === 'minimal' || theme === 'monochrome' ? 'text-current group-hover:text-current' : cfg.textClass}`}>Ostatnio na Kanale</span>
                  </div>
                  <div className={`aspect-video w-full bg-black ${theme === 'minimal' || theme === 'monochrome' ? '' : 'rounded-b-inherit'}`}>
                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${latestYoutubeVideoId}?rel=0`} title="YouTube Video" frameBorder="0" allowFullScreen></iframe>
                  </div>
                </motion.div>
              );
            }

            if (item.url === "vibelink://widget/gaming") {
              if (!steamData && !csRepData) return null;
              return (
                <motion.div variants={itemVariants} key={item.id} className={`w-full grid gap-4 ${steamData && csRepData ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 max-w-[400px] mx-auto'}`}>
                  {steamData && (
                    <a href={steamData.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-5 transition-all group ${cfg.cardClass} ${cfg.roundedClass}`}>
                      <div className={`w-14 h-14 overflow-hidden shrink-0 ${theme === 'minimal' || theme === 'cyberpunk' || theme === 'monochrome' ? 'rounded-none border-2 border-current' : 'rounded-2xl border-2 border-blue-500/30'}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={steamData.image} alt="Steam" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1 overflow-hidden flex flex-col justify-center">
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${theme === 'minimal' || theme === 'monochrome' ? 'text-current opacity-70' : 'text-blue-500'}`}>Steam Profile</p>
                        <p className={`font-bold truncate text-lg ${theme === 'minimal' || theme === 'monochrome' ? 'text-current group-hover:text-current' : cfg.textClass}`}>{steamData.title}</p>
                      </div>
                    </a>
                  )}
                  {csRepData && (
                    <a href={csRepData.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-5 transition-all group ${cfg.cardClass} ${cfg.roundedClass}`}>
                      <div className={`w-14 h-14 overflow-hidden shrink-0 ${theme === 'minimal' || theme === 'cyberpunk' || theme === 'monochrome' ? 'rounded-none border-2 border-current' : 'rounded-2xl border-2 border-orange-500/30'}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={csRepData.image} alt="CSRep" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1 overflow-hidden flex flex-col justify-center">
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${theme === 'minimal' || theme === 'monochrome' ? 'text-current opacity-70' : 'text-orange-500'}`}>CS-Reputation</p>
                        <p className={`font-bold truncate text-lg ${theme === 'minimal' || theme === 'monochrome' ? 'text-current group-hover:text-current' : cfg.textClass}`}>{csRepData.title}</p>
                      </div>
                    </a>
                  )}
                </motion.div>
              );
            }

            if (item.type === 'HEADER') return (
              <motion.div variants={itemVariants} key={item.id} className="w-full flex items-center gap-6 mt-8 mb-2">
                <div className={`h-[2px] flex-1 ${theme === 'minimal' || theme === 'cyberpunk' || theme === 'monochrome' ? 'bg-current opacity-30' : 'bg-white/10'}`} />
                <h2 className={`text-sm font-extrabold uppercase tracking-[0.3em] ${cfg.textClass} opacity-80`}>{item.title}</h2>
                <div className={`h-[2px] flex-1 ${theme === 'minimal' || theme === 'cyberpunk' || theme === 'monochrome' ? 'bg-current opacity-30' : 'bg-white/10'}`} />
              </motion.div>
            );
            
            if (item.type === 'TEXT') return (
              <motion.div variants={itemVariants} key={item.id} className={`w-full p-8 text-center ${cfg.cardClass} ${cfg.roundedClass}`}>
                {item.title && <h3 className={`font-extrabold mb-4 text-xl ${cfg.textClass}`}>{item.title}</h3>}
                <p className={`whitespace-pre-wrap leading-relaxed ${cfg.bioClass}`}>{item.content}</p>
              </motion.div>
            );

            return (
              <motion.a variants={itemVariants} whileHover={theme === 'cyberpunk' || theme === 'monochrome' ? {} : { scale: 1.02 }} whileTap={theme === 'cyberpunk' ? {} : { scale: 0.98 }} key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" onClick={() => handleLinkClick(item.id)} className={`group relative w-full flex items-center p-3 transition-all ${cfg.cardClass} ${cfg.roundedClass}`}>
                {theme === 'minimal' || theme === 'hacker' || theme === 'monochrome' ? null : (
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none" />
                )}
                <div className={`w-14 h-14 flex items-center justify-center shrink-0 ${theme === 'minimal' || theme === 'cyberpunk' || theme === 'hacker' || theme === 'monochrome' || theme === 'vaporwave' ? '' : 'rounded-xl'} ${cfg.iconBgClass} transition-transform duration-300 group-hover:scale-110`}>
                  {getIconForUrl(item.url)}
                </div>
                <span className={`font-extrabold tracking-wide flex-1 text-center pr-14 text-lg ${theme === 'minimal' || theme === 'monochrome' ? 'text-current group-hover:text-current' : cfg.textClass}`}>
                  {item.title}
                </span>
                <div className={`absolute right-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 ${theme === 'minimal' || theme === 'monochrome' ? 'text-current' : cfg.textClass}`}>
                  <ArrowRight className="w-6 h-6" />
                </div>
              </motion.a>
            );
          })}
        </div>
        
        <motion.div variants={itemVariants} className="mt-24 mb-8 w-full flex justify-center">
           <a href="/" target="_blank" className={`flex items-center gap-2 px-4 py-2 opacity-50 hover:opacity-100 transition-opacity ${theme === 'minimal' || theme === 'cyberpunk' || theme === 'monochrome' ? 'bg-current text-white mix-blend-difference' : 'bg-white/5 border border-white/10 rounded-full'}`}>
             <Zap className={`w-3 h-3 ${theme === 'minimal' || theme === 'cyberpunk' || theme === 'monochrome' ? '' : cfg.textClass}`} />
             <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'minimal' || theme === 'cyberpunk' || theme === 'monochrome' ? '' : cfg.textClass}`}>
               Powered by VibeLink
             </span>
           </a>
        </motion.div>
      </motion.div>
    </main>
  );
}