import { lazy, Suspense, useState } from 'react';
import LinkIcon from '../../../icons/LinkIcon';
import { answerFeedback } from '../../services/answers';
import Feedback from './components/feedback/Feedback';
import classes from './Answer.module.css';
import type { AnswerProps } from './Answer.d';

const ReactMarkdown = lazy(() => import('react-markdown'));

function Answer({ accessToken, answer, loading }: AnswerProps) {
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  async function handleFeedback({ answerId, usefulFeedback }: { answerId: string, usefulFeedback: boolean }) {
    try {
      setFeedbackLoading(true);
      await answerFeedback({ accessToken, answerId, usefulFeedback });
      setFeedbackSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setFeedbackLoading(false);
    }
  }

  return (
    loading
      ? (
        <div className={classes.EnhancedSearch__SearchModal__EmptySearch}>
          <span>Gathering sources...</span>
          <div className={classes.EnhancedSearch__SearchModal__LoadingContainer}>
            <div className={classes.EnhancedSearch__SearchModal__Loading} />
          </div>
        </div>
      )
      : answer.search
        ? (
          answer.answer
            ? (
              <div className={classes.EnhancedSearch__SearchModal__SearchContainer}>
                <h2 className={classes.EnhancedSearch__SearchModal__ResultQuery}>{answer.search}</h2>
                <Suspense fallback={<></>}>
                  <ReactMarkdown
                    className={classes.EnhancedSearch__SearchModal__ResultAnswer}
                    components={{
                      code(props) {
                        return <code className={classes.EnhancedSearch__SearchModal__ResultAnswerCode} {...props} />;
                      },
                      a(props) {
                        return <a className={classes.EnhancedSearch__SearchModal__ResultAnswerLink} {...props} />;
                      }
                    }}
                  >
                    {answer.answer}
                  </ReactMarkdown>
                </Suspense>

                <Feedback
                  answerId={answer._id}
                  onFeedback={handleFeedback}
                  loading={feedbackLoading}
                  success={feedbackSuccess}
                />

                <div className={classes.EnhancedSearch__SearchModal__ResultSources}>
                  <p className={classes.EnhancedSearch__SearchModal__ResultSourcesTitle}>
                    Summary generated from the following sources:
                  </p>
                  <div>
                    {answer.sources.map((source, index) => {
                      return (
                        <a
                          key={`source-${index}`}
                          className={classes.EnhancedSearch__SearchModal__ResultSourceItem}
                          href={source}
                        >
                          <LinkIcon />
                          {source}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            )
            : (
              <div className={classes.EnhancedSearch__SearchModal__EmptySearch}>
                There are no results
              </div>
            )
        ) : null
  )
}

export default Answer;
