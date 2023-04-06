import type { DocSearch } from '../../../Search';

export type DocType = {
  _id: string;
  title: string;
  description?: string;
  url?: string;
  type: 'page' | 'anchor'
}

export type DocsType = Array<DocType>;

export type GetDocs = {
  config: DocSearch;
  search: string;
}
