import { Get, Post } from './instance';

export type AnswerType = {
  _id: string;
  search: string;
  answer: string;
  sources: Array<string>;
};

type GetAnswers = {
  accessToken: string;
  search: string;
}

export function getAnswers({ accessToken, search }: GetAnswers): Promise<AnswerType> {
  return Get(`/questions/ask?q=${search}`, { headers: { Authorization: `Bearer ${accessToken}` } });
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
