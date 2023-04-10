import { useEffect } from 'react';
import { setGlobalColor } from '../helpers/styles';
import type { Theme } from '../Search';

export default function useCustomTheme (theme?: Theme) {
  useEffect(() => {
    if (theme?.primaryColor) {
      setGlobalColor('--color-primary-base', theme.primaryColor);
    }
  }, []);
}
