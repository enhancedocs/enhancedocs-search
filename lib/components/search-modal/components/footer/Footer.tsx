import Key from '../../../key/Key';
import Logo from './components/logo/Logo';
import classes from './Footer.module.css';

function Footer() {
  return (
    <footer className={classes.EnhancedSearch__SearchModal__Footer}>
      <div>
        <div className={classes.EnhancedSearch__SearchModal__FooterKey}>
          <Key>esc</Key>
          to close
        </div>
      </div>
      <div className={classes.EnhancedSearch__SearchModal__FooterLogoContainer}>
        <span>
          Search by
        </span>
        <a
          className={classes.EnhancedSearch__SearchModal__FooterLink}
          href="http://enhancedocs.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Logo className={classes.EnhancedSearch__SearchModal__FooterLogo} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
