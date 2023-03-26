import Modal from 'react-modal';
import SearchIcon from '../search-icon/SearchIcon';
import classes from './SearchModal.module.css';

export type SearchModalProps = {
  isOpen: boolean;
  onClose?: any;
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  return (
    <Modal
      className={classes.EnhancedSearch_SearchModal_Content}
      style={{
        overlay: {
          backgroundColor: 'rgb(24, 27, 33, 0.3)'
        }
      }}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Search"
      ariaHideApp={false}
    >
      <div className={classes.EnhancedSearch_SearchModal_Input_Container}>
        <SearchIcon />
        <input
          className={classes.EnhancedSearch_SearchModal_Input}
          placeholder="Ask a question or search the docs..."
          autoFocus
        />
      </div>
      <div className={classes.EnhancedSearch_SearchModal_InnerBody}>
        <div>
          <span>No recent searches</span>
        </div>
        <div className={classes.EnhancedSearch_SearchModal_Footer}>
          <span>
            Search by
          </span>
          <img
            className={classes.EnhancedSearch_SearchModal_Footer_Logo}
            src="/logo-enhance-docs.png"
            alt="EnhanceDocs"
          />
        </div>
      </div>
    </Modal>
  )
}

export default SearchModal;
