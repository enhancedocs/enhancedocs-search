import CheckCircle from '../../../../../icons/CheckCircle';
import classes from './Feedback.module.css';

export type OnFeedbackType = {
  answerId?: string;
  usefulFeedback: boolean;
}

export type FeedbackProps = {
  answerId?: string;
  onFeedback: ({ answerId, usefulFeedback }: OnFeedbackType) => void;
  loading?: boolean;
  success?: boolean;
}

export default function Feedback ({ answerId, onFeedback, success }: FeedbackProps) {
  return (
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
