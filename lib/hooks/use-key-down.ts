import { useEffect } from 'react';

export default function useKeyDown (key: string, callback: () => void) {
  function listener(event: KeyboardEvent) {
    if (event.metaKey && event.key == key) {
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
