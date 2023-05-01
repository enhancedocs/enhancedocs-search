export function getLocalStorageItem (key: string): unknown {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function setLocalStorageItem (key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}
