import { classNames } from '../../helpers/styles';
import classes from './Key.module.css';
import type { KeyProps } from './Key.d';

export default function Key({ children, className, size = 'middle', ...props }: KeyProps) {
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
