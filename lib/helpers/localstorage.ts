export function getLocalStorageItem(key: string) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function setLocalStorageItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
