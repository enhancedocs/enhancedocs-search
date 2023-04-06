import { useEffect } from 'react';

export default function useKeyDown (callback: Function) {
  function listener(event: KeyboardEvent) {
    if (event.metaKey && event.key == 'k') {
      callback();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);
}
