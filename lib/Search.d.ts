export type EnhancedSearchConfig = {
  projectId: string;
  accessToken: string;
}

export type DocSearch = {
  apiKey: string;
  host: string;
  collection: string;
}

export type Config = {
  enhancedSearch: EnhancedSearchConfig;
  docSearch?: DocSearch;
}

export type SearchProps = {
  config: Config;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  shape?: 'square' | 'round';
}
