"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { 
  Plus, Trash2, Link as LinkIcon, Loader2, BarChart2, Copy, CheckCircle2, GripVertical, Type, AlignLeft, Pencil, X, Save, LayoutTemplate,
  Instagram, Github, Twitter, Youtube, Linkedin, Facebook, Globe, Twitch
} from "lucide-react";

// --- HELPERY IKON I TŁA (ZOSTAJĄ BEZ ZMIAN) ---
const getIconForUrl = (url: string | undefined | null) => {
  if (!url) return <Globe className="w-4 h-4" />;
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('instagram.com')) return <Instagram className="w-4 h-4" />;
  if (lowerUrl.includes('github.com')) return <Github className="w-4 h-4" />;
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return <Twitter className="w-4 h-4" />;
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return <Youtube className="w-4 h-4" />;
  if (lowerUrl.includes('linkedin.com')) return <Linkedin className="w-4 h-4" />;
  if (lowerUrl.includes('facebook.com')) return <Facebook className="w-4 h-4" />;
  if (lowerUrl.includes('twitch.tv')) return <Twitch className="w-4 h-4" />;
  return <Globe className="w-4 h-4" />;
};

const MiniAnimatedBackground = ({ theme }: { theme: string }) => {
  if (theme === 'synthwave') return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#12002b] via-[#32004a] to-[#ff0055] overflow-hidden pointer-events-none">
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-[linear-gradient(rgba(255,0,85,0.4)_2px,transparent_2px),linear-gradient(90deg,rgba(255,0,85,0.4)_2px,transparent_2px)] bg-[size:30px_30px] [transform:perspective(300px)_rotateX(60deg)] [transform-origin:top] opacity-80" />
    </div>
  );
  if (theme === 'dark') return <div className="absolute inset-0 z-0 bg-zinc-950 pointer-events-none" />;
  if (theme === 'light') return <div className="absolute inset-0 z-0 bg-zinc-100 pointer-events-none" />;
  return <div className="absolute inset-0 z-0 bg-zinc-900 pointer-events-none" />;
};

// Zauważ, że dodaliśmy `lang` do propsów!
export default function LinksManagerClient({ dict, token, profile, lang }: { dict: any; token: string; profile: any; lang: string; }) {
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
        else finalTitle = "🎮 Widget: Steam & CSRep";
    }

    try {
      const payload = {
        title: finalTitle,
        type: newType === "WIDGET" ? "LINK" : newType,
        url: newType === "WIDGET" ? widgetType : (newType === "LINK" ? newUrl : undefined),
        content: newType === "TEXT" ? newContent : undefined,
      };

      const res = await fetch("http://localhost:3000/links", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error("Błąd");
      const newBlock = await res.json();
      setLinks([...links, newBlock]);
      
      setNewTitle(""); setNewUrl(""); setNewContent("");
      // UŻYWAMY SŁOWNIKA!
      showToast(dict.links_manager.link_added);
    } catch (err) { alert(dict.links_manager.error); } finally { setIsLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`http://localhost:3000/links/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` }});
      if (!res.ok) throw new Error("Błąd");
      setLinks(links.filter((l: any) => l.id !== id));
      // UŻYWAMY SŁOWNIKA!
      showToast(dict.links_manager.link_deleted);
    } catch (error) { console.error(error); }
  };

  const handleDragEnd = async () => {
    try {
      const updates = links.map((link: any, index: number) => ({ id: link.id, order: index }));
      await fetch("http://localhost:3000/links/reorder", {
        method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ updates }),
      });
      // UŻYWAMY SŁOWNIKA!
      showToast(dict.links_manager.order_saved);
    } catch (err) { console.error(err); }
  };

  const startEditing = (link: any) => {
    setEditingId(link.id);
    setEditTitle(link.title);
    setEditUrl(link.url || "");
    setEditContent(link.content || "");
  };

  const handleSaveEdit = async (id: string, type: string) => {
    try {
      const payload = {
        title: editTitle,
        url: type === "LINK" ? editUrl : undefined,
        content: type === "TEXT" ? editContent : undefined,
      };
      const res = await fetch(`http://localhost:3000/links/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Błąd edycji");
      setLinks(links.map((l: any) => l.id === id ? { ...l, ...payload } : l));
      setEditingId(null);
      // UŻYWAMY SŁOWNIKA!
      showToast(dict.links_manager.link_updated);
    } catch (err) { alert(dict.links_manager.error); }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 w-full">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-8 right-8 z-50 bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-white font-medium">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 max-w-2xl space-y-8">
        
        {/* NAGŁÓWEK I KOPIOWANIE LINKU */}
        <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl flex items-center justify-between">
          <div className="truncate mr-4">
            <h2 className="text-white font-bold text-sm mb-1">{dict.links_manager.share_title}</h2>
            <p className="text-indigo-400 text-xs truncate">{profileUrl}</p>
          </div>
          <button onClick={() => { navigator.clipboard.writeText(profileUrl); showToast(dict.links_manager.copied); }} className="bg-indigo-600 p-3 rounded-xl hover:bg-indigo-500 transition-colors">
            <Copy className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* KREATOR LINKÓW */}
        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 space-y-4">
          <div className="flex flex-wrap gap-2 mb-4 p-1 bg-black/40 rounded-xl border border-white/5 w-fit">
            <button type="button" onClick={() => setNewType("LINK")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${newType === "LINK" ? "bg-indigo-500 text-white" : "text-zinc-400 hover:text-white"}`}>
              <LinkIcon className="w-4 h-4" /> Link
            </button>
            <button type="button" onClick={() => setNewType("HEADER")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${newType === "HEADER" ? "bg-emerald-500 text-white" : "text-zinc-400 hover:text-white"}`}>
              <Type className="w-4 h-4" /> Header
            </button>
            <button type="button" onClick={() => setNewType("TEXT")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${newType === "TEXT" ? "bg-purple-500 text-white" : "text-zinc-400 hover:text-white"}`}>
              <AlignLeft className="w-4 h-4" /> Text
            </button>
            <button type="button" onClick={() => setNewType("WIDGET")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all text-sm ${newType === "WIDGET" ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]" : "text-amber-500/70 hover:text-amber-400 bg-amber-500/10"}`}>
              <LayoutTemplate className="w-4 h-4" /> Widget
            </button>
          </div>

          <form onSubmit={handleAddBlock} className="space-y-3">
            {newType !== "WIDGET" && (
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder={dict.links_manager.link_title} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500" required />
            )}
            {newType === "LINK" && (
              <input type="url" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder={dict.links_manager.link_url} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500" required />
            )}
            {newType === "TEXT" && (
              <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Content..." rows={3} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-indigo-500 resize-none" required />
            )}

            {newType === "WIDGET" && (
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                 <select value={widgetType} onChange={(e) => setWidgetType(e.target.value)} className="w-full bg-black border border-amber-500/30 p-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-amber-500">
                    <option value="vibelink://widget/twitch">🎥 Twitch Widget</option>
                    <option value="vibelink://widget/youtube">📺 YouTube Widget</option>
                    <option value="vibelink://widget/gaming">🎮 Steam & CS-Rep</option>
                 </select>
              </div>
            )}

            <button type="submit" disabled={isLoading} className={`w-full py-3 rounded-xl text-white font-bold transition-all flex justify-center mt-2 ${newType === "LINK" ? "bg-indigo-600 hover:bg-indigo-500" : newType === "HEADER" ? "bg-emerald-600 hover:bg-emerald-500" : newType === "TEXT" ? "bg-purple-600 hover:bg-purple-500" : "bg-amber-500 hover:bg-amber-400 text-black"}`}>
              {isLoading ? <Loader2 className="animate-spin" /> : dict.links_manager.add_btn}
            </button>
          </form>
        </div>

        {/* LISTA KLOCKÓW */}
        {links.length === 0 && (
          <div className="text-center p-8 bg-zinc-900/30 rounded-3xl border border-zinc-800 text-zinc-500 text-sm">
            {dict.links_manager.no_links}
          </div>
        )}

        <Reorder.Group axis="y" values={links} onReorder={setLinks} className="space-y-4">
          {links.map((link: any) => {
            const isWidget = link.url?.startsWith('vibelink://widget/');

            return (
              <Reorder.Item key={link.id} value={link} onDragEnd={handleDragEnd} className={`border p-4 rounded-2xl flex items-start sm:items-center gap-4 group transition-colors duration-300 ${isWidget ? 'bg-amber-500/5 border-amber-500/30' : 'bg-zinc-900/80 border-zinc-800'}`}>
                {editingId !== link.id && <GripVertical className="text-zinc-600 cursor-grab hover:text-white mt-2 sm:mt-0" />}
                
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-1 sm:mt-0 ${link.type === 'HEADER' ? 'bg-emerald-500/10 text-emerald-400' : link.type === 'TEXT' ? 'bg-purple-500/10 text-purple-400' : isWidget ? 'bg-amber-500/20 text-amber-500' : 'bg-zinc-800 text-zinc-400'}`}>
                  {link.type === "HEADER" ? <Type className="w-5 h-5" /> : link.type === "TEXT" ? <AlignLeft className="w-5 h-5" /> : isWidget ? <LayoutTemplate className="w-5 h-5" /> : getIconForUrl(link.url)}
                </div>

                {editingId === link.id && !isWidget ? (
                  <div className="flex-1 space-y-3 w-full" onPointerDown={(e) => e.stopPropagation()}>
                    <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm" />
                    {link.type === 'LINK' && <input type="url" value={editUrl} onChange={(e) => setEditUrl(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm" />}
                    {link.type === 'TEXT' && <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm" rows={3} />}
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => handleSaveEdit(link.id, link.type)} className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-sm font-bold">{dict.links_manager.save}</button>
                      <button onClick={() => setEditingId(null)} className="bg-white/5 text-zinc-400 px-4 py-2 rounded-xl text-sm font-bold">{dict.links_manager.cancel}</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold truncate ${isWidget ? 'text-amber-400' : 'text-white'}`}>{link.title}</div>
                      <div className="text-zinc-500 text-xs truncate">{isWidget ? "Widget" : link.type === "LINK" ? link.url : link.type === "HEADER" ? "Header" : "Text"}</div>
                    </div>
                    
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!isWidget && <button onClick={() => startEditing(link)} className="p-2 text-zinc-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg"><Pencil className="w-4 h-4" /></button>}
                      <button onClick={() => handleDelete(link.id)} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </>
                )}
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>

      {/* --- SMARTFON PREVIEW --- */}
      <div className="hidden lg:block sticky top-8 h-fit">
        <div className="w-[300px] h-[600px] border-[8px] border-zinc-900 rounded-[2.5rem] bg-zinc-950 overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 inset-x-0 h-5 bg-zinc-900 rounded-b-xl w-20 mx-auto z-50" />
          <MiniAnimatedBackground theme={profile.theme} />
          <div className="absolute inset-0 z-10 overflow-y-auto no-scrollbar pt-12 pb-10 px-4 flex flex-col items-center">
            
            <div className="w-20 h-20 rounded-full border-2 border-white/20 bg-white/10 overflow-hidden shadow-lg mb-3">
               {profile.avatarUrl ? <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : null}
            </div>
            
            <div className="w-full flex flex-col gap-2.5 mt-4">
              {links.filter((l: any) => l.isActive !== false).map((l: any) => {
                if (l.url === 'vibelink://widget/twitch') return <div key={l.id} className="w-full bg-purple-500/20 text-purple-400 py-3 rounded-xl text-center text-[10px] font-bold border border-purple-500/30">🎥 WIDGET</div>;
                if (l.url === 'vibelink://widget/youtube') return <div key={l.id} className="w-full bg-red-500/20 text-red-400 py-3 rounded-xl text-center text-[10px] font-bold border border-red-500/30">📺 WIDGET</div>;
                if (l.url === 'vibelink://widget/gaming') return <div key={l.id} className="w-full bg-blue-500/20 text-blue-400 py-3 rounded-xl text-center text-[10px] font-bold border border-blue-500/30">🎮 WIDGET</div>;

                if (l.type === 'HEADER') return <div key={l.id} className="text-center text-[9px] font-bold uppercase mt-2">-- {l.title} --</div>;
                if (l.type === 'TEXT') return <div key={l.id} className="bg-white/10 p-2 text-[10px] text-center rounded-xl">{l.title}</div>;
                return <div key={l.id} className="w-full bg-white/10 py-2.5 px-2 rounded-xl text-[11px] font-bold text-center text-white truncate">{l.title}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}