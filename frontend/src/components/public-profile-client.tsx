"use client";

import { motion } from "framer-motion";
import { Instagram, Github, Twitter, Youtube, Linkedin, Facebook, Globe, Twitch, UserCircle, Zap } from "lucide-react";

const getIconForUrl = (url: string) => {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('instagram.com')) return Instagram;
  if (lowerUrl.includes('github.com')) return Github;
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return Twitter;
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return Youtube;
  if (lowerUrl.includes('linkedin.com')) return Linkedin;
  if (lowerUrl.includes('facebook.com')) return Facebook;
  if (lowerUrl.includes('twitch.tv')) return Twitch;
  return Globe;
};

// SŁOWNIK STYLÓW DLA WSZYSTKICH 8 MOTYWÓW
const THEME_STYLES: Record<string, any> = {
  dark: { wrapper: 'bg-[#0a0a0a]', text: 'text-zinc-100', bio: 'text-zinc-400', card: 'bg-zinc-900/80 border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-colors', iconBg: 'bg-zinc-800', iconColor: 'text-zinc-300', avatar: 'bg-zinc-900 border-zinc-800' },
  light: { wrapper: 'bg-[#f4f4f5]', text: 'text-zinc-900', bio: 'text-zinc-500', card: 'bg-white border-zinc-200 rounded-2xl shadow-sm hover:shadow-md hover:border-zinc-300 transition-all', iconBg: 'bg-zinc-100', iconColor: 'text-zinc-600', avatar: 'bg-white border-zinc-200 shadow-md' },
  neon: { wrapper: 'bg-[#050505]', text: 'text-cyan-400', bio: 'text-cyan-600', card: 'bg-black border-cyan-500/50 rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:border-cyan-400 transition-all', iconBg: 'bg-cyan-950', iconColor: 'text-cyan-400', avatar: 'bg-black border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]' },
  minimal: { wrapper: 'bg-white', text: 'text-black font-medium', bio: 'text-zinc-500', card: 'bg-transparent border-2 border-black rounded-none hover:bg-black hover:text-white transition-colors group', iconBg: 'bg-transparent', iconColor: 'text-black group-hover:text-white', avatar: 'bg-transparent border-2 border-black rounded-none' },
  cyberpunk: { wrapper: 'bg-[#fce000]', text: 'text-black uppercase font-black tracking-tighter', bio: 'text-black font-bold uppercase', card: 'bg-black border-2 border-red-500 rounded-none shadow-[6px_6px_0_#ef4444] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_0_#ef4444] text-white transition-all', iconBg: 'bg-red-500', iconColor: 'text-black', avatar: 'bg-black border-4 border-red-500 rounded-none' },
  synthwave: { wrapper: 'bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900', text: 'text-white drop-shadow-[0_2px_10px_rgba(236,72,153,0.8)]', bio: 'text-pink-200', card: 'bg-white/10 backdrop-blur-md border border-pink-500/50 rounded-xl hover:bg-white/20 hover:border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all', iconBg: 'bg-pink-500/20', iconColor: 'text-pink-300', avatar: 'bg-purple-900 border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.6)]' },
  hacker: { wrapper: 'bg-black font-mono', text: 'text-green-500', bio: 'text-green-600', card: 'bg-black border border-green-500/40 rounded-sm hover:bg-green-500/10 hover:border-green-400 transition-all group', iconBg: 'bg-green-950', iconColor: 'text-green-500', avatar: 'bg-black border border-green-500' },
  glass: { wrapper: 'bg-[#050505] relative', text: 'text-white', bio: 'text-zinc-300', card: 'bg-white/5 backdrop-blur-xl border border-white/20 rounded-[2rem] hover:bg-white/10 hover:border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all', iconBg: 'bg-white/10', iconColor: 'text-white', avatar: 'bg-white/5 backdrop-blur-xl border border-white/20' },
};

export default function PublicProfileClient({ profile, username }: { profile: any; username: string }) {
  const theme = profile.theme || 'dark';
  const styles = THEME_STYLES[theme] || THEME_STYLES['dark'];

  // Animacje
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center py-20 px-4 overflow-hidden ${styles.wrapper}`}>
      
      {/* Dynamiczne Tło dla motywu Glassmorphism */}
      {theme === 'glass' && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/30 blur-[150px] rounded-full pointer-events-none mix-blend-screen z-0" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen z-0" />
        </>
      )}

      {/* Dynamiczne Tło dla Hackera (Scanline) */}
      {theme === 'hacker' && (
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(34,197,94,0.05),transparent)] animate-scanline pointer-events-none z-0 h-[200%]" />
      )}

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-2xl flex flex-col items-center relative z-10"
      >
        {/* AVATAR */}
        <motion.div variants={itemAnim} className={`w-28 h-28 flex items-center justify-center mb-6 overflow-hidden border-2 z-10 ${theme === 'cyberpunk' || theme === 'minimal' ? '' : 'rounded-full'} ${styles.avatar}`}>
          {profile.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatarUrl} alt={`Avatar ${username}`} className="w-full h-full object-cover" />
          ) : (
            <UserCircle className={`w-16 h-16 ${styles.iconColor}`} />
          )}
        </motion.div>

        {/* NAZWA I BIO */}
        <motion.h1 variants={itemAnim} className={`text-3xl font-bold mb-2 ${styles.text}`}>
          @{username}
        </motion.h1>
        
        <motion.p variants={itemAnim} className={`text-center mb-10 max-w-md text-lg ${styles.bio}`}>
          {profile.bio}
        </motion.p>

        {/* LINKI */}
        <div className="w-full flex flex-col gap-4">
          {profile.links
            ?.filter((link: any) => link.isActive !== false)
            .sort((a: any, b: any) => a.order - b.order)
            .map((link: any) => {
              const Icon = getIconForUrl(link.url);
              return (
                <motion.a
                  variants={itemAnim}
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full p-4 flex items-center justify-between border ${styles.card} group/link block relative overflow-hidden`}
                >
                  {/* Półprzezroczysty blask na hover (tylko dla wybranych motywów) */}
                  {(theme === 'glass' || theme === 'synthwave') && (
                    <div className="absolute inset-0 bg-white/0 group-hover/link:bg-white/10 transition-colors duration-500" />
                  )}

                  <div className={`flex items-center justify-center w-12 h-12 ${theme === 'cyberpunk' || theme === 'minimal' ? '' : 'rounded-xl'} ${styles.iconBg} relative z-10 group-hover/link:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${styles.iconColor}`} />
                  </div>
                  
                  <span className={`font-semibold text-lg text-center flex-1 relative z-10 ${theme === 'minimal' ? 'group-hover/link:text-white' : ''}`}>
                    {link.title}
                  </span>
                  
                  <div className="w-12 relative z-10" /> {/* Balanser wyśrodkowania */}
                </motion.a>
              );
            })}

          {(!profile.links || profile.links.length === 0) && (
            <motion.p variants={itemAnim} className={`text-center mt-8 ${styles.bio}`}>
              Brak linków do wyświetlenia.
            </motion.p>
          )}
        </div>

        {/* WATERMARK */}
        <motion.div variants={itemAnim} className="mt-20 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
           <a href="/" className={`text-xs font-bold tracking-widest uppercase flex items-center gap-2 ${styles.text}`}>
             <div className={`w-5 h-5 rounded-md flex items-center justify-center ${styles.iconBg}`}>
                <Zap className={`w-3 h-3 ${styles.iconColor}`} />
             </div>
             Powered by Vibelink
           </a>
        </motion.div>
      </motion.div>
    </div>
  );
}