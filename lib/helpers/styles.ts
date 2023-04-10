export function classNames (...classes: Array<string | boolean | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function setGlobalColor (colorName: string, colorValue: string) {
  document.documentElement.style.setProperty(colorName, colorValue);
}
