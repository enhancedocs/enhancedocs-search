import CheckCircle from '../../../../../icons/CheckCircle';
import classes from './Feedback.module.css';
import type { FeedbackProps } from './Feedback.d';

function Feedback({ answerId, onFeedback, loading, success }: FeedbackProps) {
  return loading
    ? (
      <div className={classes.EnhancedSearch__SearchModal__Feedback}>
        <div className={classes.EnhancedSearch__DotStretching} />
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
