import { Get } from './instance';

export type DocType = {
  _id: string;
  title: string;
  description?: string;
  type: 'page' | 'anchor'
}

export type DocsType = Array<DocType>;

type GetDocs = {
  accessToken: string;
  search: string;
}

export function getDocs({ accessToken, search }: GetDocs): Promise<DocsType> {
  return new Promise((resolve) => setTimeout(() => {
    resolve(search ? [
      { _id: '11111111', title: 'Doc 1', description: 'Description 1', type: 'page' },
      { _id: '22222222', title: 'Doc 2', type: 'anchor' },
      { _id: '33333333', title: 'Doc 3', description: 'Description 3', type: 'anchor' }
    ] : []);
  }, 200));
}
