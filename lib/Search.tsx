import { useState } from 'react';
import classNames from './helpers/classnames';
import useKeyDown from './hooks/use-key-down';
import CommandIcon from './components/icons/CommandIcon';
import SearchIcon from './components/icons/SearchIcon';
import Key from './components/key/Key';
import SearchModal from './components/search-modal/SearchModal';
import classes from './Search.module.css';

type SearchProps = {
  accessToken: string;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  shape?: 'square' | 'round';
}

function Search({
  accessToken,
  placeholder = 'Search',
  size = 'large',
  shape = 'round'
}: SearchProps) {
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
            classes[`EnhancedSearch__${size}`],
            classes[`EnhancedSearch__${shape}`]
          )
        }
        onClick={openSearchModal}
      >
        <SearchIcon />
        {placeholder}
        <div className={classes.EnhancedSearch__IconsContainer}>
          <Key><CommandIcon /></Key>
          <Key>K</Key>
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
