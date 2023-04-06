import { Get, Post } from './instance';
import type { AnswerType, GetAnswers, AnswerFeedbackType } from './answers.d';

export function getAnswers({ accessToken, search }: GetAnswers): Promise<AnswerType> {
  return Get(`/questions/ask?q=${search}`, { headers: { Authorization: `Bearer ${accessToken}` } });
}

export function answerFeedback({ accessToken, answerId, usefulFeedback } : AnswerFeedbackType) {
  return new Promise((resolve) => setTimeout(resolve, 500));
  return Post(`/answers/${answerId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    body: { usefulFeedback }
  });
}
