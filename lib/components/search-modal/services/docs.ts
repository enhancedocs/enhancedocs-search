import Typesense from 'typesense';
import type { GetDocs } from './docs.d';

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
