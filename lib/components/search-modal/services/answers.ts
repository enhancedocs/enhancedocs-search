import { Get, Post } from './instance';
import type { AnswerType, GetAnswers, AnswerFeedbackType } from './answers.d';

export function getAnswers ({ config, search }: GetAnswers): Promise<AnswerType> {
  let url = `/ask?question=${search}`;
  if (config.projectId) url = `${url}&projectId=${config.projectId}`;
  return Get(url, config, { headers: { Authorization: `Bearer ${config.accessToken}` } });
}

export function answerFeedback ({ answerId, usefulFeedback, config }: AnswerFeedbackType) {
  return Post(`/answers/${answerId}`, config, {
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ useful_feedback: usefulFeedback })
  });
}
