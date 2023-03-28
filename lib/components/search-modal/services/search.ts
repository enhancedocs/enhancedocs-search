const BASE_URL = 'https://api.enhancedocs.com/integrations';

async function Get(route: string, config?: Object) {
  return fetch(`${BASE_URL}${route}`, config).then((response) => response.json());
}

export type DocsResponse = {
  search: string;
  answer: string;
  sources: Array<string>;
};

export function getDocs(accessToken: string, search: string): Promise<DocsResponse> {
  return Get(`/search?q=${search}`, { headers: { Authorization: `Bearer ${accessToken}` } });
}
