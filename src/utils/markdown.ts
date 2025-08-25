import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked renderer with syntax highlighting
const renderer = new marked.Renderer();

// Override code block rendering to use highlight.js
renderer.code = function({ text, lang }: { text: string; lang?: string }) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      const highlighted = hljs.highlight(text, { language: lang }).value;
      return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
    } catch (err) {
      console.error('Syntax highlighting error:', err);
    }
  }
  
  const highlighted = hljs.highlightAuto(text).value;
  return `<pre><code class="hljs">${highlighted}</code></pre>`;
};

// Configure marked options
marked.setOptions({
  renderer,
  breaks: true,
  gfm: true
});

export function parseMarkdown(content: string): string {
  return marked.parse(content) as string;
}
