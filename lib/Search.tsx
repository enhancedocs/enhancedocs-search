import { useEffect, useState } from 'react';
import { classNames, setGlobalColor } from './helpers/styles';
import useKeyDown from './hooks/use-key-down';
import useCustomTheme from './hooks/use-custom-theme';
import CommandIcon from './components/icons/CommandIcon';
import SearchIcon from './components/icons/SearchIcon';
import Key from './components/key/Key';
import SearchModal from './components/search-modal/SearchModal';
import classes from './Search.module.css';
import './global.css';

export type EnhancedSearchConfig = {
  projectId: string;
  accessToken: string;
}

export type DocSearch = {
  apiKey: string;
  host: string;
  collection: string;
}

export type Config = {
  enhancedSearch: EnhancedSearchConfig;
  docSearch?: DocSearch;
}

export type Theme = {
  primaryColor?: string;
}

export type SearchProps = {
  config: Config;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  shape?: 'square' | 'round';
  theme?: Theme;
}

export default function Search ({
  config,
  placeholder = 'Search',
  size = 'middle',
  shape = 'round',
  theme
}: SearchProps) {
  const [searchModal, setSearchModal] = useState(false);

  function openSearchModal() {
    setSearchModal(true);
  }

  function closeSearchModal() {
    setSearchModal(false);
  }

  useCustomTheme(theme);
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
        <span className={classes.EnhancedSearch__Placeholder}>{placeholder}</span>
        <div className={classes.EnhancedSearch__IconsContainer}>
          <Key size={size}><CommandIcon /></Key>
          <Key size={size}>K</Key>
        </div>
      </button>
      <SearchModal
        config={config}
        isOpen={searchModal}
        onClose={closeSearchModal}
      />
    </>
  )
}
