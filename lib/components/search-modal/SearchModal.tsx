import Modal from 'react-modal';
import SearchIcon from '../search-icon/SearchIcon';
import classes from './SearchModal.module.css';

const INSET = 40;

export type SearchModalProps = {
  isOpen: boolean;
  onClose?: any;
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  return (
    <Modal
      style={{
        overlay: {
          backgroundColor: 'rgb(24, 27, 33, 0.3)'
        },
        content: {
          inset: INSET,
          maxWidth: 500,
          height: 'fit-content',
          minHeight: 200,
          maxHeight: `calc(100vh - ${INSET * 2}px)`,
          borderRadius: 16,
          padding: 0,
          margin: '0 auto'
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
    </Modal>
  )
}

export default SearchModal;
