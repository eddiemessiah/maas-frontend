import fs from 'fs';
import path from 'path';
import { Suspense } from 'react';
import { DocsViewer, DocItem } from './DocsViewer';

export default async function DocsPage() {
  const docsDir = path.join(process.cwd(), 'docs');
  
  let files: string[] = [];
  try {
    if (fs.existsSync(docsDir)) {
      files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));
    }
  } catch (err) {
    console.error("Error reading docs directory:", err);
  }

  const docs: DocItem[] = files.map(file => {
    const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
    const slug = file.replace('.md', '');
    const titleMatch = content.match(/^#\s+(.*)/m);
    
    // Default formatting if title isn't found
    const defaultTitle = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
    const title = titleMatch ? titleMatch[1] : defaultTitle;
    
    return {
      slug,
      title,
      content
    };
  });

  // Sort docs array: Overview first, SDK second, Smart Contracts third
  const sortedDocs = docs.sort((a, b) => {
    const order = ['overview', 'sdk', 'smart-contracts'];
    const idxA = order.indexOf(a.slug);
    const idxB = order.indexOf(b.slug);
    
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="flex h-screen w-full bg-black">
      <Suspense fallback={<div className="flex h-screen w-full items-center justify-center text-cyan-500 font-mono tracking-widest">LOADING PROTOCOL...</div>}>
        <DocsViewer docs={sortedDocs} />
      </Suspense>
    </div>
  );
}
