const BASE_URL = 'https://api.enhancedocs.com/integrations';

async function Get(route: string, config?: Object) {
  return fetch(`${BASE_URL}${route}`, config).then((response) => response.json());
}

async function Post(route: string, config?: Object) {
  return fetch(`${BASE_URL}${route}`, { method: 'POST', ...config }).then((response) => response.json());
}

export type DocsResponse = {
  _id: string;
  search: string;
  answer: string;
  sources: Array<string>;
};

type GetDocsType = {
  accessToken: string;
  search: string;
}

export function getDocs({ accessToken, search }: GetDocsType): Promise<DocsResponse> {
  return Get(`/search?q=${search}`, { headers: { Authorization: `Bearer ${accessToken}` } });
}

type AnswerFeedbackType = {
  accessToken: string;
  answerId: string;
  usefulFeedback: boolean;
}

export function answerFeedback({ accessToken, answerId, usefulFeedback } : AnswerFeedbackType) {
  return new Promise((resolve) => setTimeout(resolve, 500));
  return Post(`/answers/${answerId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    body: { usefulFeedback }
  });
}
