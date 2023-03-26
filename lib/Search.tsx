import { useState } from 'react';
import classNames from 'classnames';
import useKeyDown from './hooks/use-key-down';
import SearchIcon from './components/search-icon/SearchIcon';
import SearchModal from './components/search-modal/SearchModal';
import classes from './Search.module.css';

export type SearchProps = {
  placeholder: string;
  size?: 'small' | 'middle' | 'large';
  shape?: 'square' | 'round';
}

function Search({ placeholder, size = 'middle', shape = 'round' }: SearchProps) {
  const [searchModal, setSearchModal] = useState(false);

  const openSearchModal = () => {
    setSearchModal(true);
  };

  const closeSearchModal = () => {
    setSearchModal(false);
  };

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
      </button>
      <SearchModal
        isOpen={searchModal}
        onClose={closeSearchModal}
      />
    </>
  )
}

export default Search;
