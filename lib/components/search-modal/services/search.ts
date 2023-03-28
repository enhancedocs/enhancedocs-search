const BASE_URL = 'https://dev.api.enhancedocs.com/integrations';

const Get = (route: string, config?: Object) => fetch(`${BASE_URL}${route}`, config).then((response) => response.json());

export type DocsResponse = {
  answer: string;
  sources: Array<string>;
};

const DOCS_MOCK = {
  answer: `Chroma is a database for building AI applications with embeddings. It comes with everything you need to get started built in, and runs on your machine. A hosted version is coming soon!

  1. Install
  \`\`\`
  pip install chromadb
  \`\`\`

  2. Get the Chroma Client
  \`\`\`
  import chromadb
  chroma_client = chromadb.Client()
  \`\`\`

  3. Create a collection
  Collections are where you'll store your embeddings, documents, and any additional metadata. You can create a collection with a name:

  \`\`\`
  collection = chroma_client.create_collection(name="my_collection")
  \`\`\`

  4. Add some text documents to the collection
  Chroma will store your text, and handle tokenization, embedding, and indexing automatically.

  5. Query the collection
You can query the collection with a list of query texts, and Chroma will return the n most similar results. It's that easy!

\`\`\`
results = collection.query(
    query_texts=["This is a query document"],
    n_results=2
)
\`\`\`
By default data stored in Chroma is ephemeral making it easy to prototype scripts. It's easy to make Chroma persistent so you can reuse every collection you create and add more documents to it later. It will load your data automatically when you start the client, and save it automatically when you close it. Check out the [Usage Guide](https://enhancedocs.github.io/chroma-docs/usage-guide/) for more info.

Find [chromadb on PyPI](https://pypi.org/project/chromadb/).
  `,
  sources: [
    'https://enhancedocs.github.io/chroma-docs/getting-started',
    'https://enhancedocs.github.io/chroma-docs/usage-guide',
    'https://enhancedocs.github.io/chroma-docs/embeddings'
  ]
};

export function getDocs(accessToken: string, search: string): Promise<DocsResponse> {
  return new Promise((resolve) => setTimeout(() => resolve(DOCS_MOCK), 2000));
  // return Get(`/search?q=${search}`, { headers: { Authorization: `Bearer ${accessToken}` } });
}
