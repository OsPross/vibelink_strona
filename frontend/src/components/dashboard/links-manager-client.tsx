"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Plus, Trash2, Link as LinkIcon, Loader2, Copy, CheckCircle2, GripVertical, Type, AlignLeft, Pencil, LayoutTemplate, Instagram, Github, Twitter, Youtube, Linkedin, Facebook, Globe, Twitch, Zap, Gamepad2 } from "lucide-react";
import { THEME_CONFIG, MiniAnimatedBackground } from "@/lib/themes";

const getIconForUrl = (url: string | undefined | null, size: string = "w-4 h-4") => {
  if (!url) return <Globe className={size} />;
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('instagram.com')) return <Instagram className={size} />;
  if (lowerUrl.includes('github.com')) return <Github className={size} />;
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return <Twitter className={size} />;
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return <Youtube className={size} />;
  if (lowerUrl.includes('linkedin.com')) return <Linkedin className={size} />;
  if (lowerUrl.includes('facebook.com')) return <Facebook className={size} />;
  if (lowerUrl.includes('twitch.tv')) return <Twitch className={size} />;
  return <Globe className={size} />;
};

const getIconForPlatformPreview = (platform: string) => {
  switch(platform.toLowerCase()) {
    case 'instagram': return <Instagram className="w-4 h-4" />;
    case 'github': return <Github className="w-4 h-4" />;
    case 'twitter': return <Twitter className="w-4 h-4" />;
    case 'youtube': return <Youtube className="w-4 h-4" />;
    case 'linkedin': return <Linkedin className="w-4 h-4" />;
    case 'facebook': return <Facebook className="w-4 h-4" />;
    case 'twitch': return <Twitch className="w-4 h-4" />;
    default: return <Globe className="w-4 h-4" />;
  }
};

export default function LinksManagerClient({ dict, token, profile, lang }: { dict: any; token: string; profile: any; lang: string; }) {
  const t = dict?.links_manager || {};
  const [links, setLinks] = useState(profile.links || []);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [newType, setNewType] = useState<"LINK" | "HEADER" | "TEXT" | "WIDGET">("LINK");
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newContent, setNewContent] = useState("");
  const [widgetType, setWidgetType] = useState("vibelink://widget/twitch");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editContent, setEditContent] = useState("");

  const showToast = (message: string) => { setToast(message); setTimeout(() => setToast(null), 3000); };

  const [profileUrl, setProfileUrl] = useState("");
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const username = profile.user?.username || 'user';
      setProfileUrl(`${window.location.origin}/${lang}/${username}`);
    }
  }, [profile, lang]);

  const handleAddBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newType !== "WIDGET" && !newTitle.trim()) return;
    setIsLoading(true);

    let finalTitle = newTitle;
    if (newType === "WIDGET") {
        if (widgetType.includes("twitch")) finalTitle = "🎥 Widget: Twitch";
        else if (widgetType.includes("youtube")) finalTitle = "📺 Widget: YouTube";
        else finalTitle = "🎮 Widget: Steam & CS-Rep Stats";
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const payload = {
        title: finalTitle,
        type: newType === "WIDGET" ? "LINK" : newType,
        url: newType === "WIDGET" ? widgetType : (newType === "LINK" ? newUrl : undefined),
        content: newType === "TEXT" ? newContent : undefined,
      };

      const res = await fetch(`${apiUrl}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Błąd");
      const newBlock = await res.json();
      setLinks([...links, newBlock]);
      setNewTitle(""); setNewUrl(""); setNewContent("");
      showToast(t.link_added || "Element wdrożony do systemu.");
    } catch (err) { alert(t.error || "Wystąpił błąd"); } finally { setIsLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/links/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` }});
      if (!res.ok) throw new Error("Błąd");
      setLinks(links.filter((l: any) => l.id !== id));
      showToast(t.link_deleted || "Element usunięty z macierzy.");
    } catch (error) { console.error(error); }
  };

  const handleDragEnd = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const updates = links.map((link: any, index: number) => ({ id: link.id, order: index }));
      await fetch(`${apiUrl}/links/reorder`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ updates }) });
      showToast(t.order_saved || "Kolejność zsynchronizowana.");
    } catch (err) { console.error(err); }
  };

  const startEditing = (link: any) => { setEditingId(link.id); setEditTitle(link.title); setEditUrl(link.url || ""); setEditContent(link.content || ""); };

  const handleSaveEdit = async (id: string, type: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const payload = { title: editTitle, url: type === "LINK" ? editUrl : undefined, content: type === "TEXT" ? editContent : undefined };
      const res = await fetch(`${apiUrl}/links/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Błąd edycji");
      setLinks(links.map((l: any) => l.id === id ? { ...l, ...payload } : l));
      setEditingId(null);
      showToast(t.link_updated || "Element zaktualizowany.");
    } catch (err) { alert(t.error || "Błąd bazy danych"); }
  };

  const activeTheme = THEME_CONFIG[profile.theme] ? profile.theme : 'dark';
  const cfg = THEME_CONFIG[activeTheme];

  return (
    <div className="flex flex-col lg:flex-row gap-12 w-full items-start">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-8 right-8 z-50 bg-[#050510]/90 backdrop-blur-xl border border-emerald-500/30 px-6 py-4 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-white font-medium">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 w-full space-y-8">
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-6 rounded-[2rem] flex items-center justify-between backdrop-blur-md">
          <div className="truncate mr-4">
            <h2 className="text-white font-bold text-sm mb-1">{t.share_title || "Twój Publiczny Adres Węzła"}</h2>
            <p className="text-cyan-400 text-xs truncate font-mono">{profileUrl}</p>
          </div>
          <button onClick={() => { navigator.clipboard.writeText(profileUrl); showToast(t.copied || "Skopiowano do schowka"); }} className="bg-cyan-500/20 border border-cyan-500/30 p-3 rounded-xl hover:bg-cyan-500/30 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Copy className="w-5 h-5 text-cyan-400" />
          </button>
        </div>

        <div className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 space-y-6 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-wrap gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/5 w-fit">
            <button type="button" onClick={() => setNewType("LINK")} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-sm ${newType === "LINK" ? "bg-indigo-500 text-white shadow-lg" : "text-zinc-500 hover:text-white"}`}><LinkIcon className="w-4 h-4" /> Link</button>
            <button type="button" onClick={() => setNewType("HEADER")} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-sm ${newType === "HEADER" ? "bg-emerald-500 text-white shadow-lg" : "text-zinc-500 hover:text-white"}`}><Type className="w-4 h-4" /> Header</button>
            <button type="button" onClick={() => setNewType("TEXT")} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-sm ${newType === "TEXT" ? "bg-purple-500 text-white shadow-lg" : "text-zinc-500 hover:text-white"}`}><AlignLeft className="w-4 h-4" /> Text</button>
            <button type="button" onClick={() => setNewType("WIDGET")} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-sm ${newType === "WIDGET" ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]" : "text-amber-500/70 hover:text-amber-400"}`}><LayoutTemplate className="w-4 h-4" /> Widget</button>
          </div>

          <form onSubmit={handleAddBlock} className="space-y-4">
            {newType !== "WIDGET" && <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder={t.link_title || "Tytuł elementu"} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" required />}
            {newType === "LINK" && <input type="url" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder={t.link_url || "https://..."} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" required />}
            {newType === "TEXT" && <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Wprowadź treść bloku tekstowego..." rows={3} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none transition-all" required />}
            {newType === "WIDGET" && (
              <div className="bg-amber-500/5 border border-amber-500/20 p-5 rounded-2xl">
                 <select value={widgetType} onChange={(e) => setWidgetType(e.target.value)} className="w-full bg-black border border-amber-500/30 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-amber-500/50">
                    <option value="vibelink://widget/twitch">🎥 Twitch Live Widget</option>
                    <option value="vibelink://widget/youtube">📺 YouTube Latest Video</option>
                    <option value="vibelink://widget/gaming">🎮 Steam & CS-Rep Stats</option>
                 </select>
              </div>
            )}
            <button type="submit" disabled={isLoading} className={`w-full py-4 rounded-xl text-white font-bold transition-all flex justify-center items-center gap-2 mt-4 ${newType === "LINK" ? "bg-indigo-600 hover:bg-indigo-500" : newType === "HEADER" ? "bg-emerald-600 hover:bg-emerald-500" : newType === "TEXT" ? "bg-purple-600 hover:bg-purple-500" : "bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]"}`}>
              {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Plus className="w-5 h-5" /> {t.add_btn || "Dodaj do Macierzy"}</>}
            </button>
          </form>
        </div>

        {links.length === 0 && <div className="text-center p-10 bg-white/[0.02] rounded-[2rem] border border-white/5 text-zinc-500 text-sm font-medium border-dashed">{t.no_links || "Brak zainicjowanych węzłów. Dodaj pierwszy element powyżej."}</div>}

        <Reorder.Group axis="y" values={links} onReorder={setLinks} className="space-y-4">
          {links.map((link: any) => {
            const isWidget = link.url?.startsWith('vibelink://widget/');
            return (
              <Reorder.Item key={link.id} value={link} onDragEnd={handleDragEnd} className={`p-4 rounded-2xl flex items-start sm:items-center gap-4 group transition-colors duration-300 backdrop-blur-md border ${isWidget ? 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}>
                {editingId !== link.id && <GripVertical className="text-zinc-600 cursor-grab hover:text-white mt-2 sm:mt-0" />}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-1 sm:mt-0 ${link.type === 'HEADER' ? 'bg-emerald-500/10 text-emerald-400' : link.type === 'TEXT' ? 'bg-purple-500/10 text-purple-400' : isWidget ? 'bg-amber-500/10 text-amber-500' : 'bg-white/5 text-zinc-300'}`}>
                  {link.type === "HEADER" ? <Type className="w-5 h-5" /> : link.type === "TEXT" ? <AlignLeft className="w-5 h-5" /> : isWidget ? <LayoutTemplate className="w-5 h-5" /> : getIconForUrl(link.url, "w-5 h-5")}
                </div>
                {editingId === link.id && !isWidget ? (
                  <div className="flex-1 space-y-3 w-full" onPointerDown={(e) => e.stopPropagation()}>
                    <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-indigo-500/50" />
                    {link.type === 'LINK' && <input type="url" value={editUrl} onChange={(e) => setEditUrl(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-indigo-500/50" />}
                    {link.type === 'TEXT' && <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-indigo-500/50" rows={3} />}
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => handleSaveEdit(link.id, link.type)} className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-500/30 transition-colors">Zapisz</button>
                      <button onClick={() => setEditingId(null)} className="bg-white/5 text-zinc-400 border border-white/10 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">Anuluj</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-lg truncate ${isWidget ? 'text-amber-400' : 'text-white'}`}>{link.title}</div>
                      <div className="text-zinc-500 text-xs truncate font-medium mt-0.5">{isWidget ? "System Widget Component" : link.type === "LINK" ? link.url : link.type === "HEADER" ? "Header Element" : "Text Block Element"}</div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!isWidget && <button onClick={() => startEditing(link)} className="p-2.5 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-xl transition-colors"><Pencil className="w-4 h-4" /></button>}
                      <button onClick={() => handleDelete(link.id)} className="p-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </>
                )}
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>

      <div className="hidden lg:block sticky top-8 h-fit shrink-0">
        <div className="relative w-[320px] h-[660px] bg-black rounded-[3rem] border-[8px] border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.1)] ring-1 ring-white/10 overflow-hidden">
          <div className="absolute top-24 -left-[9px] w-1 h-10 bg-zinc-700 rounded-l-md" />
          <div className="absolute top-40 -left-[9px] w-1 h-16 bg-zinc-700 rounded-l-md" />
          <div className="absolute top-40 -right-[9px] w-1 h-20 bg-zinc-700 rounded-r-md" />
          <div className="absolute inset-0 z-0 bg-black overflow-hidden rounded-[2.5rem]">
            <MiniAnimatedBackground theme={activeTheme} />
            <div className={`absolute inset-0 z-10 overflow-y-auto pt-12 pb-12 px-5 flex flex-col items-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${cfg.textClass}`}>
              <div className={`w-20 h-20 flex items-center justify-center overflow-hidden shadow-xl mb-4 shrink-0 relative z-10 ${cfg.avatarClass}`}>
                {profile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : <Globe className="w-10 h-10 opacity-50" />}
              </div>
              <h3 className="font-extrabold text-lg mb-1 tracking-tight text-center w-full truncate px-2">@{profile.username}</h3>
              <p className={`text-center text-xs mb-4 px-2 leading-relaxed line-clamp-3 ${cfg.bioClass}`}>{profile.bio || "Zainicjuj protokół powitalny..."}</p>

              {profile.socials && typeof profile.socials === 'object' && Object.values(profile.socials).some(val => !!val) && (
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6 px-2 w-full">
                  {Object.entries(profile.socials).map(([platform, url]) => {
                    if (!url || typeof url !== 'string') return null;
                    return (
                      <div key={platform} className={`flex items-center justify-center w-8 h-8 transition-all border ${cfg.cardClass} ${activeTheme === 'minimal' || activeTheme === 'cyberpunk' || activeTheme === 'hacker' || activeTheme === 'monochrome' || activeTheme === 'vaporwave' ? '' : 'rounded-full'}`}>
                         <div className={`opacity-80 ${activeTheme === 'minimal' || activeTheme === 'monochrome' ? 'text-current' : cfg.textClass}`}>
                           {getIconForPlatformPreview(platform)}
                         </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              <div className="w-full flex flex-col gap-3">
                {links.filter((l: any) => l.isActive !== false).map((l: any) => {
                  if (l.url === 'vibelink://widget/twitch') return (
                    <div key={l.id} className={`w-full overflow-hidden flex flex-col items-center justify-center p-3 transition-all border ${cfg.cardClass} ${cfg.roundedClass} border-purple-500/50 bg-purple-900/20`}>
                      <Twitch className="w-5 h-5 text-purple-400 mb-1" /><span className="text-[10px] font-bold text-purple-300 uppercase">Twitch Live</span>
                    </div>
                  );
                  if (l.url === 'vibelink://widget/youtube') return (
                    <div key={l.id} className={`w-full overflow-hidden flex flex-col items-center justify-center p-3 transition-all border ${cfg.cardClass} ${cfg.roundedClass} border-red-500/50 bg-red-900/20`}>
                       <Youtube className="w-5 h-5 text-red-400 mb-1" /><span className="text-[10px] font-bold text-red-300 uppercase">YouTube Widget</span>
                    </div>
                  );
                  if (l.url === 'vibelink://widget/gaming') return (
                    <div key={l.id} className={`w-full overflow-hidden flex flex-col items-center justify-center p-3 transition-all border ${cfg.cardClass} ${cfg.roundedClass} border-blue-500/50 bg-blue-900/20`}>
                       <Gamepad2 className="w-5 h-5 text-blue-400 mb-1" /><span className="text-[10px] font-bold text-blue-300 uppercase">Steam & CS-Rep</span>
                    </div>
                  );

                  if (l.type === 'HEADER') return (
                    <div key={l.id} className="w-full flex items-center gap-2 mt-2 mb-1 opacity-80">
                       <div className={`h-[1px] flex-1 ${activeTheme === 'minimal' || activeTheme === 'cyberpunk' || activeTheme === 'monochrome' ? 'bg-current opacity-30' : 'bg-white/20'}`} />
                       <span className="text-[9px] font-bold uppercase tracking-widest truncate max-w-[120px] text-center">{l.title}</span>
                       <div className={`h-[1px] flex-1 ${activeTheme === 'minimal' || activeTheme === 'cyberpunk' || activeTheme === 'monochrome' ? 'bg-current opacity-30' : 'bg-white/20'}`} />
                    </div>
                  );

                  if (l.type === 'TEXT') return (
                    <div key={l.id} className={`w-full p-4 text-center border ${cfg.cardClass} ${cfg.roundedClass}`}>
                      {l.title && <h4 className="font-bold text-xs mb-1 truncate">{l.title}</h4>}
                      <p className={`text-[10px] line-clamp-3 leading-relaxed ${cfg.bioClass}`}>{l.content}</p>
                    </div>
                  );

                  return (
                    <div key={l.id} className={`relative w-full flex items-center p-2 transition-all border ${cfg.cardClass} ${cfg.roundedClass}`}>
                       <div className={`w-8 h-8 flex items-center justify-center shrink-0 ${activeTheme === 'minimal' || activeTheme === 'cyberpunk' || activeTheme === 'hacker' || activeTheme === 'monochrome' || activeTheme === 'vaporwave' ? '' : 'rounded-lg'} ${cfg.iconBgClass}`}>
                          {getIconForUrl(l.url, "w-4 h-4")}
                       </div>
                       <span className={`font-bold flex-1 text-center pr-8 text-[11px] truncate ${activeTheme === 'minimal' || activeTheme === 'monochrome' ? 'text-current' : cfg.textClass}`}>
                          {l.title}
                       </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-10 mb-2 flex items-center gap-1.5 opacity-40">
                <Zap className={`w-2.5 h-2.5 ${activeTheme === 'minimal' || activeTheme === 'cyberpunk' || activeTheme === 'monochrome' ? 'text-current' : cfg.textClass}`} />
                <span className="text-[8px] font-bold uppercase tracking-widest">Powered by Vibelink</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}