import classNames from '../../helpers/classnames';
import classes from './Key.module.css';

type KeyProps = {
  children: React.ReactNode;
  className?: string;
}

function Key({ children, className, ...props }: KeyProps) {
  return (
    <div
      className={classNames(classes.EnhancedSearch_KeyContainer, className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default Key;
