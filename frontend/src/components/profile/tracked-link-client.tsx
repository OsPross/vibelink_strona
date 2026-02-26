"use client";

import { motion } from "framer-motion";
import { Instagram, Github, Twitter, Youtube, Linkedin, Facebook, Globe, Twitch } from "lucide-react";

// Inteligentny detektor ikon na podstawie URL
const getIconForUrl = (url: string) => {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('instagram.com')) return <Instagram className="w-5 h-5" />;
  if (lowerUrl.includes('github.com')) return <Github className="w-5 h-5" />;
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return <Twitter className="w-5 h-5" />;
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return <Youtube className="w-5 h-5" />;
  if (lowerUrl.includes('linkedin.com')) return <Linkedin className="w-5 h-5" />;
  if (lowerUrl.includes('facebook.com')) return <Facebook className="w-5 h-5" />;
  if (lowerUrl.includes('twitch.tv')) return <Twitch className="w-5 h-5" />;
  
  // Domyślna ikona dla innych, nierozpoznanych stron
  return <Globe className="w-5 h-5" />;
};

export default function TrackedLinkClient({ 
  link, 
  themeStyles, 
  isRounded 
}: { 
  link: any; 
  themeStyles: string; 
  isRounded: boolean;
}) {
  const handleClick = async () => {
    try {
      const res = await fetch(`http://localhost:3000/links/${link.id}/click`, {
        method: 'POST',
      });
      if (!res.ok) {
        console.error("Nie udało się zliczyć kliknięcia. Status:", res.status);
      }
    } catch (err) {
      console.error("Błąd sieci podczas analityki:", err);
    }
  };

  return (
    <motion.a
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`w-full py-4 px-6 font-semibold transition-all border flex items-center justify-center gap-3 ${themeStyles} ${isRounded ? 'rounded-2xl' : ''}`}
    >
      {/* Automatycznie dobrana ikona */}
      {getIconForUrl(link.url)}
      <span>{link.title}</span>
    </motion.a>
  );
}