import { createRoot } from 'react-dom/client';
import EnhancedSearch from './Search';
import type { SearchProps } from './Search';

export function loadScript (src: string, onLoadCallback: () => void) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = onLoadCallback;
  document.head.appendChild(script);
}

export function appendGlobalStyles (href: string) {
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = href || 'https://unpkg.com/enhancedocs-search/dist/style.css';
  document.head.appendChild(linkElement);
}

export function renderSearch (elementId: string, props: SearchProps) {
  const domNode = document.getElementById(elementId);
  if (domNode) {
    const root = createRoot(domNode);
    root.render(<EnhancedSearch {...props} />);

    return root;
  } else {
    console.warn('EnhancedSearch: Provide an existing "elementId".');
  }
}
