import classes from './Key.module.css';

type KeyProps = {
  children: React.ReactNode;
}

function Key({ children, ...props }: KeyProps) {
  return (
    <div className={classes.EnhancedSearch_KeyContainer} {...props}>
      {children}
    </div>
  )
}

export default Key;
