import { EnhancedSearchConfig } from '../../../Search';

const BASE_URL = 'https://api.enhancedocs.com';

export async function Get (route: string, config: EnhancedSearchConfig, options?: Object) {
  const baseURL = config.apiBaseURL || BASE_URL;
  return fetch(`${baseURL}${route}`, options).then((response) => response.json());
}

export async function Post (route: string, config: EnhancedSearchConfig, options?: Object) {
  const baseURL = config.apiBaseURL || BASE_URL;
  return fetch(`${baseURL}${route}`, { method: 'POST', ...options }).then((response) => response.json());
}
