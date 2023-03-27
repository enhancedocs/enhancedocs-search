const BASE_URL = 'https://dev.api.enhancedocs.com/integrations';

const Get = (route: string, config?: Object) => fetch(`${BASE_URL}${route}`, config).then((response) => response.json());

export type DocsResponse = {
  answer: string;
  sources: Array<string>;
};

export function getDocs(accessToken: string, search: string): Promise<DocsResponse> {
  console.log('accessToken', accessToken);
  return Get(`/search?q=${search}`, { headers: { Authorization: `Bearer ${accessToken}` } });
}
