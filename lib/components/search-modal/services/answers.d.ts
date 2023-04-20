import type { EnhancedSearchConfig } from '../../../Search';

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
  answerId: string;
  usefulFeedback: boolean;
  config: EnhancedSearchConfig;
}
