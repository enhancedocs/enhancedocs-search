import { useState } from 'react';
import classNames from 'classnames';
import useKeyDown from './hooks/use-key-down';
import CommandIcon from './components/command-icon/CommandIcon';
import SearchIcon from './components/search-icon/SearchIcon';
import SearchModal from './components/search-modal/SearchModal';
import classes from './Search.module.css';

type SearchProps = {
  accessToken: string;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  shape?: 'square' | 'round';
}

function Search({ accessToken, placeholder = 'EnhanceDocs Search', size = 'large', shape = 'round' }: SearchProps) {
  const [searchModal, setSearchModal] = useState(false);

  function openSearchModal() {
    setSearchModal(true);
  }

  function closeSearchModal() {
    setSearchModal(false);
  }

  useKeyDown(openSearchModal);

  return (
    <>
      <button
        aria-label="Search"
        className={
          classNames(
            classes.EnhancedSearch,
            classes[`EnhancedSearch_${size}`],
            classes[`EnhancedSearch_${shape}`]
          )
        }
        onClick={openSearchModal}
      >
        <SearchIcon />
        {placeholder}
        <div className={classes.EnhancedSearch_IconsContainer}>
          <div className={classes.EnhancedSearch_IconContainer}>
            <CommandIcon />
          </div>
          <div className={classes.EnhancedSearch_IconContainer}>
            K
          </div>
        </div>
      </button>
      <SearchModal
        accessToken={accessToken}
        isOpen={searchModal}
        onClose={closeSearchModal}
      />
    </>
  )
}

export default Search;
