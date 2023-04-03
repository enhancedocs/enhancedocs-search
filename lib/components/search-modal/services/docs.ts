import Typesense from 'typesense';
import type { TypesenseConfig } from '../../../Search';

export type DocType = {
  _id: string;
  title: string;
  description?: string;
  url?: string;
  type: 'page' | 'anchor'
}

export type DocsType = Array<DocType>;

type GetDocs = {
  config: TypesenseConfig;
  search: string;
}

export const getDocs = async ({ config, search }: GetDocs) => {
  const client = new Typesense.Client({
    nodes: [
      {
        host: config.host,
        port: 443,
        protocol: 'https'
      }
    ],
    apiKey: config.apiKey,
    connectionTimeoutSeconds: 2
  });

  return client.collections(config.collection)
    .documents()
    .search({
      q: search,
      query_by: 'content, anchor'
    });
}
