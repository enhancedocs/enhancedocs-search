import classNames from '../../helpers/classnames';
import classes from './Key.module.css';

type KeyProps = {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'middle' | 'large';
}

function Key({ children, className, size = 'middle', ...props }: KeyProps) {
  return (
    <div
      className={
        classNames(
          classes.EnhancedSearch__KeyContainer,
          classes[`EnhancedSearch__KeyContainer__${size}`],
          className
        )
      }
      {...props}
    >
      {children}
    </div>
  )
}

export default Key;
