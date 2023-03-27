import { ChangeEvent, useState } from 'react';
import Modal from 'react-modal';
import debounce from 'lodash.debounce';
import SearchIcon from '../search-icon/SearchIcon';
import EnhanceDocsLogo from './components/enhancedocs-logo/EnhanceDocsLogo';
import classes from './SearchModal.module.css';

function getDocs() {
  return new Promise((response) => setTimeout(() => response({ results: [] }), 2000));
}

type SearchModalProps = {
  isOpen: boolean;
  onClose?: any;
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  function handleClose() {
    setSearch('');
    onClose();
  }

  async function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    try {
      setLoading(true);

      const { value } = event.target;
      setSearch(value);

      if (value) {
        const data = await getDocs();
        console.log('data', data);
      }
    } finally {
      setLoading(false);
    }
  }

  const debouncedSearch = debounce(handleSearch, 300);

  return (
    <Modal
      className={classes.EnhancedSearch_SearchModal_Content}
      style={{
        overlay: {
          backgroundColor: 'rgb(24, 27, 33, 0.3)'
        }
      }}
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Search"
      ariaHideApp={false}
    >
      <div className={classes.EnhancedSearch_SearchModal_Input_Container}>
        <SearchIcon />
        <input
          className={classes.EnhancedSearch_SearchModal_Input}
          placeholder="Ask a question or search the docs..."
          onChange={debouncedSearch}
          autoFocus
        />
      </div>
      <div className={classes.EnhancedSearch_SearchModal_InnerBody}>
        <div>
          {
            loading
              ? <span>Gathering resources...</span>
              : (
                search
                  ? (
                    <span>Search results here</span>
                  ) : (
                    <span>No recent searches</span>
                  )
              )
          }
        </div>
        <div className={classes.EnhancedSearch_SearchModal_Footer}>
          <span>
            Search by
          </span>
          <a
            className={classes.EnhancedSearch_SearchModal_Footer_Link}
            href="http://enhancedocs.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <EnhanceDocsLogo className={classes.EnhancedSearch_SearchModal_Footer_Logo} />
          </a>
        </div>
      </div>
    </Modal>
  )
}

export default SearchModal;
