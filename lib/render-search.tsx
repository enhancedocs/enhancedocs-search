import { createRoot } from 'react-dom/client';
import EnhancedSearch from './Search';
import type { SearchProps } from './Search';

function appendGlobalStyles() {
  const linkElement = document.createElement('link');

  linkElement.rel = 'stylesheet';
  linkElement.href = 'node_modules/enhancedocs-search/dist/style.css';

  document.head.appendChild(linkElement);
}

export function renderSearch(elementId: string, props: SearchProps) {
  const domNode = document.getElementById(elementId);
  if (domNode) {
    const root = createRoot(domNode);
    root.render(<EnhancedSearch {...props} />);

    appendGlobalStyles();
  } else {
    console.warn('EnhancedSearch: Provide an existing "elementId".');
  }
}
