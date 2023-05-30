import { lazy, Suspense, useState } from 'react';
import LinkIcon from '../../../icons/LinkIcon';
import { answerFeedback } from '../../services/answers';
import type { AnswerData } from '../../services/answers';
import Feedback from './components/feedback/Feedback';
import classes from './Answer.module.css';
import type { OnFeedbackType } from './components/feedback/Feedback';
import type { Config } from '../../../../Search';

const ReactMarkdown = lazy(() => import('react-markdown'));

type AnswerProps = {
  config: Config;
  answer: AnswerData;
  loading?: boolean;
}

export default function Answer ({ config, answer, loading }: AnswerProps) {
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  async function handleFeedback ({ answerId, usefulFeedback }: OnFeedbackType) {
    if (answerId) {
      try {
        await answerFeedback({ answerId, usefulFeedback, config });
        setFeedbackSuccess(true);
      } catch (error) {
        console.error('Feedback', error);
      }
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
                      pre(props) {
                        return <pre className={classes.EnhancedSearch__SearchModal__ResultAnswerPre} {...props} />;
                      },
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

                {
                  answer.answerId && (
                    <Feedback
                      answerId={answer.answerId}
                      onFeedback={handleFeedback}
                      success={feedbackSuccess}
                    />
                  )
                }

                {
                  answer.sources?.length
                    ? (
                      <div className={classes.EnhancedSearch__SearchModal__Sources}>
                        <p className={classes.EnhancedSearch__SearchModal__SourcesTitle}>
                          Summary generated from the following sources:
                        </p>
                        <div className={classes.EnhancedSearch__SearchModal__SourcesContainer}>
                          {
                            answer.sources.map((source, index) => {
                              const urlParts = source.split('/');
                              const label = (urlParts ? urlParts[urlParts.length - 1] : source)
                                .split(/[-_]/)
                                .map(word => word.replace(word[0], word[0].toUpperCase()))
                                .join(' ');

                              return (
                                <a
                                  key={`source-${index}`}
                                  className={classes.EnhancedSearch__SearchModal__SourceItem}
                                  href={source}
                                >
                                  <LinkIcon />
                                  {label}
                                </a>
                              );
                            })
                          }
                        </div>
                      </div>
                    )
                    : null
                }
              </div>
            )
            : (
              <div className={classes.EnhancedSearch__SearchModal__EmptySearch}>
                There are no results
              </div>
            )
        ) : null
  );
}
