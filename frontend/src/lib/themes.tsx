import { motion } from "framer-motion";

export const THEME_CONFIG: Record<string, any> = {
  // Klasyki
  dark: { name: "Dark Matter", bgClass: "bg-[#09090b]", textClass: "text-zinc-100", bioClass: "text-zinc-400", cardClass: "bg-zinc-900/40 border border-white/5 hover:bg-zinc-900/80 hover:border-white/10 shadow-2xl backdrop-blur-md", avatarClass: "bg-[#18181b] border-2 border-white/10 rounded-full", roundedClass: "rounded-2xl", iconBgClass: "bg-white/5" },
  light: { name: "Clean Light", bgClass: "bg-[#fcfcfc]", textClass: "text-zinc-900", bioClass: "text-zinc-500", cardClass: "bg-white border border-black/5 hover:border-black/15 shadow-[0_8px_30px_rgb(0,0,0,0.04)]", avatarClass: "bg-white border border-black/10 shadow-md rounded-full", roundedClass: "rounded-2xl", iconBgClass: "bg-black/5" },
  
  // Minimalistyczne / Surowe
  minimal: { name: "Minimalist", bgClass: "bg-white", textClass: "text-black font-serif", bioClass: "text-zinc-500 font-sans", cardClass: "bg-transparent border-2 border-black hover:bg-black hover:text-white transition-colors group", avatarClass: "bg-transparent border-2 border-black rounded-none", roundedClass: "rounded-none", iconBgClass: "bg-transparent" },
  monochrome: { name: "Monochrome", bgClass: "bg-[#050505]", textClass: "text-white uppercase font-black tracking-widest", bioClass: "text-zinc-500", cardClass: "bg-black border-2 border-white/20 hover:border-white hover:bg-white hover:text-black group transition-all", avatarClass: "bg-black border-2 border-white rounded-none", roundedClass: "rounded-none", iconBgClass: "bg-white/10" },
  
  // Neon / Cyber
  neon: { name: "Neon Flux", bgClass: "bg-[#02000a]", textClass: "text-[#00f0ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]", bioClass: "text-cyan-700", cardClass: "bg-black/50 border border-[#00f0ff]/30 shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:border-[#00f0ff] backdrop-blur-md", avatarClass: "bg-black border-2 border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.4)] rounded-full", roundedClass: "rounded-[2rem]", iconBgClass: "bg-[#00f0ff]/10" },
  cyberpunk: { name: "Night City", bgClass: "bg-[#fcee0a]", textClass: "text-black uppercase tracking-widest font-black", bioClass: "text-black/80 font-bold uppercase", cardClass: "bg-black border-2 border-[#ff003c] text-white shadow-[6px_6px_0px_#ff003c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#ff003c] transition-all", avatarClass: "bg-black border-4 border-[#ff003c] rounded-none", roundedClass: "rounded-none", iconBgClass: "bg-[#ff003c]/20" },
  hacker: { name: "Terminal", bgClass: "bg-[#050505]", textClass: "text-[#00ff41] font-mono drop-shadow-[0_0_5px_rgba(0,255,65,0.6)]", bioClass: "text-[#008f11] font-mono", cardClass: "bg-black border border-[#00ff41]/30 hover:bg-[#00ff41]/10 hover:border-[#00ff41] group", avatarClass: "bg-black border-2 border-[#00ff41] rounded-none", roundedClass: "rounded-none", iconBgClass: "bg-[#00ff41]/10" },
  
  // Estetyczne / Vibe
  synthwave: { name: "Synthwave", bgClass: "bg-[#0b0014]", textClass: "text-white drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]", bioClass: "text-[#f72585]", cardClass: "bg-white/5 backdrop-blur-md border border-[#f72585]/50 shadow-[0_0_15px_rgba(247,37,133,0.2)] hover:border-[#f72585] hover:bg-white/10", avatarClass: "bg-[#3a0ca3] border-2 border-[#4cc9f0] shadow-[0_0_25px_rgba(76,201,240,0.6)] rounded-full", roundedClass: "rounded-[2rem]", iconBgClass: "bg-[#f72585]/20" },
  vaporwave: { name: "Vaporwave", bgClass: "bg-[#ffb6c1]", textClass: "text-[#2d00f7] font-bold tracking-wide", bioClass: "text-[#8a2be2]", cardClass: "bg-white/40 backdrop-blur-lg border-2 border-[#ff1493] shadow-[8px_8px_0px_#00ffff] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#00ffff] transition-all", avatarClass: "bg-[#00ffff] border-4 border-[#ff1493] rounded-none", roundedClass: "rounded-none", iconBgClass: "bg-white/60" },
  glass: { name: "Frosted Glass", bgClass: "bg-[#050510]", textClass: "text-white tracking-tight", bioClass: "text-white/60", cardClass: "bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 hover:border-white/20", avatarClass: "bg-white/5 backdrop-blur-xl border border-white/20 rounded-full", roundedClass: "rounded-[2.5rem]", iconBgClass: "bg-white/10" },
  
  // Natury i Inne z Animacjami
  dracula: { name: "Dracula", bgClass: "bg-[#282a36]", textClass: "text-[#f8f8f2]", bioClass: "text-[#6272a4]", cardClass: "bg-[#44475a]/80 backdrop-blur-md border border-[#bd93f9]/30 hover:border-[#bd93f9] hover:shadow-[0_0_20px_rgba(189,147,249,0.2)]", avatarClass: "bg-[#44475a] border-2 border-[#bd93f9] rounded-full", roundedClass: "rounded-2xl", iconBgClass: "bg-[#282a36]" },
  ocean: { name: "Deep Ocean", bgClass: "bg-[#001220]", textClass: "text-[#e0fbfc]", bioClass: "text-[#3d5a80]", cardClass: "bg-[#001d3d]/60 backdrop-blur-md border border-[#98c1d9]/20 hover:border-[#98c1d9]/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)]", avatarClass: "bg-[#003566] border-2 border-[#98c1d9] rounded-[2rem]", roundedClass: "rounded-3xl", iconBgClass: "bg-[#002855]" },
  magma: { name: "Magma", bgClass: "bg-[#0a0000]", textClass: "text-[#ff4d00]", bioClass: "text-[#cc3300]/70", cardClass: "bg-[#1a0000]/80 backdrop-blur-sm border border-[#ff4d00]/30 hover:border-[#ff4d00] shadow-[0_0_15px_rgba(255,77,0,0.1)] hover:shadow-[0_0_20px_rgba(255,77,0,0.4)] transition-all", avatarClass: "bg-[#1a0000] border-2 border-[#ff4d00] shadow-[0_0_20px_rgba(255,77,0,0.5)] rounded-full", roundedClass: "rounded-2xl", iconBgClass: "bg-[#ff4d00]/10" },
  midnight: { name: "Midnight Space", bgClass: "bg-[#020005]", textClass: "text-[#e2e8f0]", bioClass: "text-[#818cf8]", cardClass: "bg-[#0f0c29]/50 backdrop-blur-xl border border-[#4f46e5]/30 hover:border-[#4f46e5] shadow-2xl", avatarClass: "bg-[#0f0c29] border-2 border-[#818cf8] rounded-full", roundedClass: "rounded-2xl", iconBgClass: "bg-[#4f46e5]/20" },
  forest: { name: "Dark Forest", bgClass: "bg-[#0c120c]", textClass: "text-[#c7f9cc]", bioClass: "text-[#57cc99]", cardClass: "bg-[#1b261e]/80 backdrop-blur-sm border border-[#38a3a5]/30 hover:border-[#38a3a5] hover:bg-[#1b261e]", avatarClass: "bg-[#1b261e] border-2 border-[#57cc99] rounded-full", roundedClass: "rounded-2xl", iconBgClass: "bg-[#38a3a5]/20" },
  royal: { name: "Royal Gold", bgClass: "bg-[#0a0a0a]", textClass: "text-[#d4af37]", bioClass: "text-[#d4af37]/60", cardClass: "bg-black/80 backdrop-blur-md border border-[#d4af37]/30 hover:border-[#d4af37] shadow-[0_4px_20px_rgba(212,175,55,0.1)]", avatarClass: "bg-black border-2 border-[#d4af37] rounded-full", roundedClass: "rounded-2xl", iconBgClass: "bg-[#d4af37]/10" },

  // --- EKSTREMALNE MOTYWY ---
  trippy: { name: "LSD Trip", bgClass: "bg-[#ff00ff]", textClass: "text-white font-black drop-shadow-[2px_4px_0px_rgba(0,0,0,0.5)]", bioClass: "text-white/90 font-bold", cardClass: "bg-white/10 backdrop-blur-2xl border-2 border-white/50 shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 hover:-rotate-1 transition-transform", avatarClass: "bg-gradient-to-tr from-yellow-400 via-fuchsia-500 to-cyan-500 p-1 shadow-[0_0_30px_rgba(255,0,255,0.8)] rounded-full", roundedClass: "rounded-3xl", iconBgClass: "bg-white/30" },
  glitch: { name: "System Glitch", bgClass: "bg-black", textClass: "text-white drop-shadow-[3px_3px_0px_#ff003c,-3px_-3px_0px_#00f0ff] font-black uppercase tracking-widest", bioClass: "text-zinc-500 font-mono", cardClass: "bg-black border-4 border-white hover:-translate-x-2 hover:translate-y-2 hover:shadow-[8px_8px_0px_#ff003c,-8px_-8px_0px_#00f0ff] transition-all", avatarClass: "bg-black border-4 border-[#ff003c] rounded-none", roundedClass: "rounded-none", iconBgClass: "bg-white/20" },
  inferno: { name: "Hellfire Inferno", bgClass: "bg-[#050000]", textClass: "text-[#ff2a00] font-black drop-shadow-[0_0_10px_rgba(255,42,0,0.8)]", bioClass: "text-[#ff6600]/80", cardClass: "bg-[#1a0000]/80 backdrop-blur-md border-2 border-[#ff2a00]/50 shadow-[0_0_20px_rgba(255,42,0,0.4)] hover:shadow-[0_0_50px_rgba(255,42,0,0.8)] hover:bg-[#330000] transition-colors", avatarClass: "bg-black border-2 border-[#ff2a00] shadow-[0_0_40px_rgba(255,42,0,1)] rounded-2xl", roundedClass: "rounded-2xl", iconBgClass: "bg-[#ff2a00]/20" },
  toxic: { name: "Biohazard Slime", bgClass: "bg-[#020a02]", textClass: "text-[#39ff14] font-black drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]", bioClass: "text-[#39ff14]/70", cardClass: "bg-[#051405]/80 border-2 border-[#39ff14] border-dashed shadow-[0_0_20px_rgba(57,255,20,0.2)] hover:bg-[#0a290a] transition-colors", avatarClass: "bg-black border-4 border-[#39ff14] border-dashed shadow-[0_0_30px_rgba(57,255,20,0.5)] rounded-full", roundedClass: "rounded-2xl", iconBgClass: "bg-[#39ff14]/20" },
  void: { name: "The Void", bgClass: "bg-black", textClass: "text-zinc-500 hover:text-white transition-colors duration-700", bioClass: "text-zinc-700 hover:text-zinc-400 transition-colors duration-700", cardClass: "bg-black border border-zinc-900 hover:border-zinc-700 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-700", avatarClass: "bg-black border border-zinc-900 opacity-30 hover:opacity-100 transition-opacity duration-1000 rounded-full", roundedClass: "rounded-2xl", iconBgClass: "bg-zinc-900" },
};

// --- DETERMINISTYCZNE GENERATORY CZĄSTECZEK ---
// W The Void wydłużyłem 'dur' (cykl życia) i 'd' (opóźnienie), żeby gwiazdy zapalały się powoli i miękko.
const generateVoidStars = () => Array.from({length: 60}).map((_, i) => ({ t: `${(i * 17) % 100}%`, l: `${(i * 23) % 100}%`, s: (i % 3) + 1, d: (i * 0.23) % 5, dur: 1.5 + (i % 4) }));
const generateEmbers = () => Array.from({length: 30}).map((_, i) => ({ l: `${(i * 19) % 100}%`, s: (i % 4) + 2, d: (i * 0.2) % 3, dur: 2 + (i % 3) }));
const generateBubbles = () => Array.from({length: 25}).map((_, i) => ({ l: `${(i * 27) % 100}%`, s: (i % 5) + 3, d: (i * 0.3) % 2, dur: 3 + (i % 4) }));
const generateFireflies = () => Array.from({length: 25}).map((_, i) => ({ t: `${(i * 31) % 100}%`, l: `${(i * 13) % 100}%`, s: (i % 3) + 2, d: (i * 0.4) % 3, dur: 3 + (i % 3) }));
const generateDust = () => Array.from({length: 40}).map((_, i) => ({ t: `${(i * 41) % 100}%`, l: `${(i * 37) % 100}%`, s: (i % 2) + 1, d: (i * 0.15) % 2, dur: 1.5 + (i % 2) }));
const TRIPPY_SHAPES = [{ t: "20%", l: "10%", size: 60, d: 0, dur: 8 }, { t: "70%", l: "80%", size: 90, d: 1, dur: 12 }, { t: "40%", l: "60%", size: 120, d: 2, dur: 10 }, { t: "80%", l: "20%", size: 70, d: 0.5, dur: 9 }, { t: "10%", l: "70%", size: 150, d: 1.5, dur: 15 }, { t: "50%", l: "30%", size: 85, d: 2.5, dur: 11 }];

// --- GŁÓWNE TŁO PROFILU PUBLICZNEGO ---
export const AnimatedBackground = ({ theme }: { theme: string }) => {
  if (theme === 'synthwave') return (
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#12002b] via-[#32004a] to-[#ff0055] overflow-hidden pointer-events-none">
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-b from-yellow-400 to-pink-500 rounded-full blur-[2px] shadow-[0_0_100px_rgba(255,0,85,0.8)]" />
      <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-[linear-gradient(rgba(255,0,85,0.4)_2px,transparent_2px),linear-gradient(90deg,rgba(255,0,85,0.4)_2px,transparent_2px)] bg-[size:50px_50px] [transform:perspective(500px)_rotateX(60deg)] [transform-origin:top] opacity-80" />
    </div>
  );
  if (theme === 'glass') return (
    <div className="fixed inset-0 z-0 bg-[#050510] overflow-hidden pointer-events-none">
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/30 blur-[150px] rounded-full mix-blend-screen" />
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-600/20 blur-[150px] rounded-full mix-blend-screen" />
    </div>
  );
  if (theme === 'hacker') return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,255,65,0.15),transparent)] animate-scanline h-[200%]" />
    </div>
  );
  if (theme === 'cyberpunk') return (
    <div className="fixed inset-0 z-0 bg-[#fcee0a] pointer-events-none">
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwdjJIMHptMCAyMGg0MHYySDB6IiBmaWxsPSIjMDAwIi8+PC9zdmc+')] mix-blend-overlay" />
    </div>
  );
  if (theme === 'neon') return (
    <div className="fixed inset-0 z-0 bg-[#02000a] pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f0ff]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff003c]/10 blur-[120px] rounded-full" />
    </div>
  );

  // Estetyczne
  if (theme === 'ocean') return (
    <div className="fixed inset-0 z-0 bg-[#001220] pointer-events-none overflow-hidden">
      <motion.div animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/3 left-1/4 w-[50vw] h-[50vw] bg-[#3d5a80]/20 blur-[150px] rounded-full mix-blend-screen" />
      {generateBubbles().map((b, i) => (
        <motion.div key={i} className="absolute bottom-[-5%] rounded-full border border-[#e0fbfc]/30 bg-[#e0fbfc]/10" style={{ left: b.l, width: b.s, height: b.s }} animate={{ y: [0, -1000], x: [0, 30, -30, 0], opacity: [0, 0.6, 0] }} transition={{ duration: b.dur, repeat: Infinity, ease: "easeIn", delay: b.d }} />
      ))}
    </div>
  );
  if (theme === 'magma') return (
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0a0000] to-[#1a0000] pointer-events-none overflow-hidden">
      <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] bg-[#ff4d00]/30 blur-[150px] rounded-full" />
      {generateEmbers().map((e, i) => (
        <motion.div key={i} className="absolute bottom-[-5%] bg-[#ff4d00] rounded-full blur-[1px]" style={{ left: e.l, width: e.s, height: e.s }} animate={{ y: [0, -800], x: [0, 20, -20, 0], opacity: [0, 1, 0] }} transition={{ duration: e.dur, repeat: Infinity, ease: "easeOut", delay: e.d }} />
      ))}
    </div>
  );
  if (theme === 'forest') return (
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0c120c] to-[#1b261e] pointer-events-none overflow-hidden">
       {generateFireflies().map((f, i) => (
         <motion.div key={i} className="absolute bg-[#c7f9cc] rounded-full shadow-[0_0_10px_#57cc99]" style={{ top: f.t, left: f.l, width: f.s, height: f.s }} animate={{ x: [0, 40, -40, 0], y: [0, -40, 40, 0], opacity: [0.2, 0.9, 0.2] }} transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: f.d }} />
       ))}
    </div>
  );
  if (theme === 'royal') return (
    <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_100%)] pointer-events-none overflow-hidden">
       {generateDust().map((d, i) => (
         <motion.div key={i} className="absolute bg-[#d4af37] rounded-full blur-[0.5px]" style={{ top: d.t, left: d.l, width: d.s, height: d.s }} animate={{ y: [0, 100], opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: d.dur, repeat: Infinity, ease: "linear", delay: d.d }} />
       ))}
    </div>
  );
  if (theme === 'midnight') return (
    <div className="fixed inset-0 z-0 bg-[#020005] pointer-events-none overflow-hidden">
      <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-[-20%] right-[-10vw] w-[60vw] h-[60vw] bg-[#4f46e5]/10 blur-[130px] rounded-full" />
      <motion.div animate={{ rotate: -360, scale: [1, 1.3, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-20%] left-[-10vw] w-[50vw] h-[50vw] bg-[#c026d3]/10 blur-[130px] rounded-full" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
    </div>
  );
  if (theme === 'vaporwave') return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#ffb6c1]">
      <motion.div animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-br from-[#ffb6c1] via-[#ff69b4] to-[#00ffff] opacity-40 mix-blend-color-burn" style={{ backgroundSize: "400% 400%" }} />
      <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-[linear-gradient(rgba(0,255,255,0.4)_2px,transparent_2px),linear-gradient(90deg,rgba(0,255,255,0.4)_2px,transparent_2px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] [transform-origin:top] opacity-60" />
    </div>
  );
  
  // --- EKSTREMALNE ANIMACJE ---
  if (theme === 'trippy') return (
    <div className="fixed inset-0 z-0 bg-[#ff00ff] overflow-hidden pointer-events-none">
       <motion.div animate={{ filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"], scale: [1, 1.5, 1], rotate: [0, 180, 360] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -top-1/2 -left-1/2 w-[200vw] h-[200vw] bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-yellow-400 via-fuchsia-500 to-cyan-500 opacity-60 mix-blend-screen" />
       {TRIPPY_SHAPES.map((shape, i) => (
         <motion.div key={`shape-${i}`} className="absolute border-4 border-white mix-blend-overlay" style={{ width: shape.size, height: shape.size, top: shape.t, left: shape.l }} animate={{ y: [0, -150, 0], x: [0, 100, 0], rotate: [0, 360], borderRadius: ["10%", "50%", "10%"] }} transition={{ duration: shape.dur, repeat: Infinity, ease: "easeInOut", delay: shape.d }} />
       ))}
    </div>
  );
  if (theme === 'glitch') return (
    <motion.div animate={{ x: [-3, 3, -1, 1, 0], opacity: [1, 0.8, 1, 0.9, 1] }} transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }} className="fixed inset-0 z-0 bg-black pointer-events-none">
       <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[size:100%_4px] z-10" />
    </motion.div>
  );
  if (theme === 'inferno') return (
    <div className="fixed inset-0 z-0 bg-[#050000] overflow-hidden pointer-events-none">
       <motion.div animate={{ y: [100, -500], opacity: [0, 0.8, 0], scale: [1, 2, 3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeIn" }} className="absolute bottom-[-10%] left-1/4 w-[40vw] h-[40vw] bg-[#ff2a00]/30 blur-[100px] rounded-full" />
       <motion.div animate={{ y: [100, -600], opacity: [0, 0.6, 0], scale: [1, 1.5, 2] }} transition={{ duration: 7, repeat: Infinity, ease: "easeIn", delay: 2 }} className="absolute bottom-[-10%] right-1/4 w-[50vw] h-[50vw] bg-[#ff6600]/20 blur-[120px] rounded-full" />
       {generateEmbers().map((e, i) => (
         <motion.div key={i} className="absolute bottom-[-5%] bg-[#ff9900] rounded-full blur-[2px]" style={{ left: e.l, width: e.s * 2, height: e.s * 2 }} animate={{ y: [0, -1200], x: [0, 50, -50, 0], opacity: [0, 1, 0], scale: [1, 0] }} transition={{ duration: e.dur * 0.8, repeat: Infinity, ease: "easeIn", delay: e.d }} />
       ))}
    </div>
  );
  if (theme === 'toxic') return (
    <div className="fixed inset-0 z-0 bg-[#020a02] overflow-hidden pointer-events-none">
       <motion.div animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[-10%] left-0 w-full h-[50vh] bg-[#39ff14]/15 blur-[80px]" />
       {generateBubbles().map((b, i) => (
        <motion.div key={i} className="absolute bottom-[-5%] rounded-full bg-[#39ff14]/40 blur-[1px]" style={{ left: b.l, width: b.s * 1.5, height: b.s * 1.5 }} animate={{ y: [0, -800], x: [0, 20, -20, 0], opacity: [0, 0.8, 0] }} transition={{ duration: b.dur * 1.2, repeat: Infinity, ease: "easeIn", delay: b.d }} />
      ))}
    </div>
  );
  if (theme === 'void') return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
       {generateVoidStars().map((star, i) => (
         <motion.div key={`star-${i}`} className="absolute bg-white rounded-full shadow-[0_0_8px_white]" style={{ width: star.s, height: star.s, top: star.t, left: star.l }} animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.2, 0.5] }} transition={{ duration: star.dur, repeat: Infinity, delay: star.d }} />
       ))}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_85%)]" />
    </div>
  );

  const cfg = THEME_CONFIG[theme] || THEME_CONFIG.dark;
  return <div className={`fixed inset-0 z-0 ${cfg.bgClass} pointer-events-none`} />;
};

// --- MINI TŁA DO DASHBOARDU (Zoptymalizowane pod wydajność) ---
export const MiniAnimatedBackground = ({ theme }: { theme: string }) => {
  if (theme === 'synthwave') return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#12002b] via-[#32004a] to-[#ff0055] overflow-hidden pointer-events-none">
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-b from-yellow-400 to-pink-500 rounded-full blur-[2px]" />
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-[linear-gradient(rgba(255,0,85,0.4)_2px,transparent_2px),linear-gradient(90deg,rgba(255,0,85,0.4)_2px,transparent_2px)] bg-[size:20px_20px] [transform:perspective(200px)_rotateX(60deg)] [transform-origin:top] opacity-80" />
    </div>
  );
  if (theme === 'glass') return (
    <div className="absolute inset-0 z-0 bg-[#050510] overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-48 h-48 bg-indigo-600/30 blur-[60px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-56 h-56 bg-cyan-600/20 blur-[60px] rounded-full mix-blend-screen" />
    </div>
  );
  if (theme === 'hacker') return (
    <div className="absolute inset-0 z-0 bg-black pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,255,65,0.2),transparent)] animate-scanline h-[200%]" />
    </div>
  );
  if (theme === 'cyberpunk') return <div className="absolute inset-0 z-0 bg-[#fcee0a] pointer-events-none" />;
  if (theme === 'neon') return (
    <div className="absolute inset-0 z-0 bg-[#02000a] pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#00f0ff]/20 blur-[50px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#ff003c]/20 blur-[50px] rounded-full" />
    </div>
  );
  if (theme === 'ocean') return <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-[#3d5a80]/30 blur-[60px] rounded-full mix-blend-screen pointer-events-none" />;
  if (theme === 'midnight') return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#4f46e5]/20 blur-[50px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#c026d3]/20 blur-[50px] rounded-full" />
    </div>
  );
  if (theme === 'magma') return <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-48 h-32 bg-[#ff4d00]/30 blur-[60px] rounded-full pointer-events-none" />;
  if (theme === 'trippy') return (
    <motion.div animate={{ filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"], rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-yellow-400 via-fuchsia-500 to-cyan-500 opacity-60 mix-blend-screen pointer-events-none" />
  );
  if (theme === 'glitch') return <div className="absolute inset-0 z-0 bg-black pointer-events-none"><div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[size:100%_4px]" /></div>;
  if (theme === 'inferno') return <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#ff2a00]/40 blur-[50px] rounded-full pointer-events-none" />;
  if (theme === 'toxic') return <div className="absolute bottom-0 left-0 w-full h-32 bg-[#39ff14]/20 blur-[40px] pointer-events-none" />;
  if (theme === 'void') return <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_80%)] pointer-events-none" />;
  if (theme === 'forest') return <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0c120c] to-[#1b261e] pointer-events-none" />;
  if (theme === 'royal') return <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_100%)] pointer-events-none" />;
  if (theme === 'vaporwave') return <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#ffb6c1] via-[#ff69b4] to-[#00ffff] opacity-40 mix-blend-color-burn pointer-events-none" />;

  const cfg = THEME_CONFIG[theme] || THEME_CONFIG.dark;
  return <div className={`absolute inset-0 z-0 ${cfg.bgClass} pointer-events-none`} />;
};