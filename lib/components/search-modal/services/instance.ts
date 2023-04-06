const BASE_URL = 'https://api.enhancedocs.com';

export async function Get (route: string, config?: Object) {
  return fetch(`${BASE_URL}${route}`, config).then((response) => response.json());
}

export async function Post (route: string, config?: Object) {
  return fetch(`${BASE_URL}${route}`, { method: 'POST', ...config }).then((response) => response.json());
}
