const BASE_URL = 'https://dev.api.enhancedocs.com/integrations';

const Get = (route: string) => fetch(`${BASE_URL}${route}`).then((response) => response.json());

export type DocsResponse = {
  answer: string;
  sources: Array<string>;
};

export function getDocs(search: string): Promise<DocsResponse> {
  return Get(`/search?q=${search}`);
}
