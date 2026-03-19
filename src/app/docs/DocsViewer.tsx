"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FileText, Code, Box, ChevronRight, Activity, Zap, Terminal, Menu, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export interface DocItem {
  slug: string;
  title: string;
  content: string;
}

const getIconForSlug = (slug: string) => {
  if (slug === 'overview') return <FileText size={16} />;
  if (slug === 'sdk') return <Code size={16} />;
  if (slug === 'smart-contracts') return <Box size={16} />;
  return <Terminal size={16} />;
};

export function DocsViewer({ docs }: { docs: DocItem[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [activeSlug, setActiveSlug] = useState<string>(docs.length > 0 ? docs[0].slug : "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const slugParams = searchParams.get('doc');
    if (slugParams && docs.some(d => d.slug === slugParams)) {
      setActiveSlug(slugParams);
    } else if (docs.length > 0 && !slugParams) {
      setActiveSlug(docs[0].slug);
    }
  }, [searchParams, docs]);

  const activeDoc = docs.find(d => d.slug === activeSlug) || docs[0];

  const handleNavClick = (slug: string) => {
    setActiveSlug(slug);
    setIsMobileMenuOpen(false); // Close menu on mobile after selection
    router.push(`/docs?doc=${slug}`, { scroll: true });
  };

  if (!docs.length) {
    return (
      <div className="flex h-screen items-center justify-center text-zinc-500 font-mono tracking-widest uppercase">
        <Activity className="animate-spin mr-3 text-cyan-500" />
        Initializing Documentation Protocol...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-zinc-100 font-sans overflow-hidden radar-grid relative w-full">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_4px,3px_100%] opacity-20" />
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Docs Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-zinc-950/95 backdrop-blur-xl border-r border-white/10 h-screen p-6 flex flex-col z-50`}>
        <div className="flex justify-between items-center mb-10 overflow-hidden">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex-shrink-0 border border-cyan-500/50 bg-cyan-950/30 rounded flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              <Zap size={16} className="text-cyan-400" />
            </div>
            <h1 className="text-sm font-bold text-white tracking-widest uppercase">Fabric Docs</h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-3 overflow-y-auto">
          <div className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-4 px-2">
            Modules
          </div>
          {docs.map((doc) => {
            const isActive = activeSlug === doc.slug;
            return (
              <button
                key={doc.slug}
                onClick={() => handleNavClick(doc.slug)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded transition-all group relative overflow-hidden text-left ${
                  isActive
                    ? "bg-cyan-900/20 text-cyan-400 border border-cyan-500/30 shadow-[inset_0_0_15px_rgba(6,182,212,0.1)]"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className={isActive ? "text-cyan-400" : "group-hover:text-zinc-300"}>
                  {getIconForSlug(doc.slug)}
                </div>
                <span className="text-xs font-semibold tracking-widest flex-1">{doc.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeDocTab"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    initial={false}
                  />
                )}
                {!isActive && <ChevronRight size={14} className="opacity-0 group-hover:opacity-50 transition-opacity" />}
              </button>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-4 border-t border-white/10">
          <Link href="/dashboard" className="flex items-center space-x-2 text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-2">
            <Activity size={14} />
            <span className="text-xs font-mono tracking-widest uppercase">Return to HUD</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center p-4 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 mr-3 text-zinc-400 hover:text-white bg-white/5 border border-white/10 rounded"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-bold tracking-widest uppercase text-white truncate">
            {activeDoc.title}
          </span>
        </div>
        
        {/* Scrollable Document */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 scroll-smooth">
          <div className="max-w-4xl mx-auto pb-20">
            <motion.div 
              key={activeDoc.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="prose prose-invert prose-zinc max-w-none 
                prose-headings:font-bold prose-headings:tracking-widest prose-headings:uppercase
                prose-h1:text-3xl prose-h1:text-white prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-4 prose-h1:mb-8
                prose-h2:text-xl prose-h2:text-cyan-400 prose-h2:mt-12
                prose-h3:text-lg prose-h3:text-zinc-300
                prose-p:text-zinc-400 prose-p:leading-relaxed
                prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-bold
                prose-code:text-cyan-300 prose-code:bg-cyan-950/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-cyan-500/20 prose-code:before:content-none prose-code:after:content-none
                prose-blockquote:border-l-2 prose-blockquote:border-cyan-500/50 prose-blockquote:bg-cyan-950/10 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:text-zinc-400 prose-blockquote:not-italic
                prose-ul:text-zinc-400 prose-li:marker:text-cyan-500
              "
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <div className="relative my-6 group">
                        <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-900 border-b border-l border-white/10 rounded-bl-md z-10">
                          {match[1]}
                        </div>
                        <div className="relative border border-white/10 rounded-md overflow-hidden bg-black/50 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                          {/* Corner Accents */}
                          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/30 z-20" />
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/30 z-20" />
                          <SyntaxHighlighter
                            style={atomDark}
                            language={match[1]}
                            PreTag="div"
                            className="!m-0 !bg-transparent !p-4 !text-sm font-mono scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                            showLineNumbers={true}
                            lineNumberStyle={{ minWidth: "2.5em", paddingRight: "1em", color: "#4f4f54", textAlign: "right" }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {activeDoc.content}
              </ReactMarkdown>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
