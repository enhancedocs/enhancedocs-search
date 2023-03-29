export function classNames(...classes: Array<string | boolean | undefined>) {
  return classes.filter(Boolean).join(' ');
}
