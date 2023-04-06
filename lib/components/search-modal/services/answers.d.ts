import type { EnhancedSearchConfig } from '../../../Search.d';

export type AnswerType = {
  _id: string;
  search: string;
  answer: string;
  sources: Array<string>;
};

export type GetAnswers = {
  config: EnhancedSearchConfig;
  search: string;
}

export type AnswerFeedbackType = {
  accessToken: string;
  answerId: string;
  usefulFeedback: boolean;
}
