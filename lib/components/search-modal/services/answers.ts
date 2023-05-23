import { Get, Post } from './instance';
import type { EnhancedSearchConfig } from '../../../Search';

export type AnswerData = {
  answerId?: string;
  threadId?: string;
  search: string;
  answer: string;
  sources: Array<string>;
};

export type GetAnswers = {
  config: EnhancedSearchConfig;
  search: string;
  threadId?: string;
}

export type AnswerFeedbackType = {
  answerId: string;
  usefulFeedback: boolean;
  config: EnhancedSearchConfig;
}

export function getAnswers ({ config, search, threadId }: GetAnswers): Promise<any> {
  let url = `/ask/stream?question=${search}`;
  if (config.projectId) url = `${url}&projectId=${config.projectId}`;
  if (threadId) url = `${url}&threadId=${threadId}`;

  return Get(url, config, {
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      'X-EnhanceDocs-Version': '1.0'
    },
    stream: true
  });
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
