import type { AnswerType } from '../../services/answers.d';

export type AnswerProps = {
  accessToken: string;
  answer: AnswerType;
  loading?: boolean;
}
