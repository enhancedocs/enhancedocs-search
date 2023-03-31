import CheckCircle from '../../../../../icons/CheckCircle';
import DotStretching from './components/dot-stretching/DotStretching';
import classes from './Feedback.module.css';

type FeedbackProps = {
  answerId: string;
  onFeedback: Function;
  loading?: boolean;
  success?: boolean;
}

function Feedback({ answerId, onFeedback, loading, success }: FeedbackProps) {
  return loading
    ? (
      <div className={classes.EnhancedSearch__SearchModal__Feedback}>
        <DotStretching />
      </div>
    ) : (
      <div className={classes.EnhancedSearch__SearchModal__Feedback}>
        {
          success
            ? (
              <div className={classes.EnhancedSearch__SearchModal__FeedbackSuccess}>
                <CheckCircle />
                <span>Thanks for submitting your feedback!</span>
              </div>
            )
            : (
              <>
                <p className={classes.EnhancedSearch__SearchModal__FeedbackTitle}>Was this response useful?</p>
                <button
                  className={classes.EnhancedSearch__SearchModal__FeedbackButton}
                  onClick={() => onFeedback({ answerId, usefulFeedback: true })}
                >
                  Yes
                </button>
                <button
                  className={classes.EnhancedSearch__SearchModal__FeedbackButton}
                  onClick={() => onFeedback({ answerId, usefulFeedback: false })}
                >
                  No
                </button>
              </>
            )
        }
      </div>
    );
}

export default Feedback;
