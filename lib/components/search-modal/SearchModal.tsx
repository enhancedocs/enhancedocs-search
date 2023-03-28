import { ChangeEvent, useRef, useState } from 'react';
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown';
import debounce from 'lodash.debounce';
import SearchIcon from '../icons/SearchIcon';
import LinkIcon from '../icons/LinkIcon';
import Key from '../key/Key';
import EnhanceDocsLogo from './components/enhancedocs-logo/EnhanceDocsLogo';
import { DocsResponse, getDocs } from './/services/search';
import classes from './SearchModal.module.css';

const INITIAL_DOCS = { search: '', answer: '', sources: [] };

type SearchModalProps = {
  accessToken: string;
  isOpen: boolean;
  onClose?: any;
}

function SearchModal({ accessToken, isOpen, onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [docs, setDocs] = useState<DocsResponse>(INITIAL_DOCS);
  const [loading, setLoading] = useState(false);

  function clearInput() {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  function handleClose() {
    onClose();
    clearInput();
    setDocs(INITIAL_DOCS);
  }

  async function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    try {
      setLoading(true);

      const { value } = event.target;

      if (value) {
        const data = await getDocs(accessToken, value);
        setDocs({
          search: value,
          answer: data.answer,
          sources: data.sources
        });
        clearInput();
      }
    } catch(error) {
      console.error(error);
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
      <div className={classes.EnhancedSearch_SearchModal_InputContainer}>
        <SearchIcon />
        <input
          className={classes.EnhancedSearch_SearchModal_Input}
          ref={inputRef}
          placeholder="Ask a question or search the docs..."
          onChange={debouncedSearch}
          autoFocus
        />
      </div>
      <div className={classes.EnhancedSearch_SearchModal_InnerBody}>
        {
          loading
            ? (
              <div className={classes.EnhancedSearch_SearchModal_SearchContainer}>
                <span>Gathering sources...</span>
                <div className={classes.EnhancedSearch_SearchModal_LoadingContainer}>
                  <div className={classes.EnhancedSearch_SearchModal_Loading} />
                </div>
              </div>
            )
            : (
              docs.search
                ? (
                  <div>
                    <h2 className={classes.EnhancedSearch_SearchModal_ResultQuery}>{docs.search}</h2>
                    <ReactMarkdown
                      className={classes.EnhancedSearch_SearchModal_ResultAnswer}
                      components={{
                        code(props) {
                          return <code className={classes.EnhancedSearch_SearchModal_ResultAnswerCode} {...props} />
                        },
                        a(props) {
                          return <a className={classes.EnhancedSearch_SearchModal_ResultAnswerLink} {...props} />;
                        }
                      }}
                    >
                      {docs.answer}
                    </ReactMarkdown>
                    <div className={classes.EnhancedSearch_SearchModal_ResultSources}>
                      <p className={classes.EnhancedSearch_Search_modal_ResultSourcesTitle}>
                        Summary generated from the following sources:
                      </p>
                      <div>
                        {docs.sources.map((source, index) => {
                          return (
                            <a
                              key={`source-${index}`}
                              className={classes.EnhancedSearch_SearchModal_ResultSourceItem}
                              href={source}
                            >
                              <LinkIcon />
                              {source}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={classes.EnhancedSearch_SearchModal_SearchContainer}>
                    <span>No recent searches</span>
                  </div>
                )
            )
        }
        <div className={classes.EnhancedSearch_SearchModal_Footer}>
          <div>
            <div className={classes.EnhancedSearch_SearchModal_FooterKey}>
              <Key>esc</Key>
              to close
            </div>
          </div>
          <div className={classes.EnhancedSearch_SearchModal_FooterLogoContainer}>
            <span>
              Search by
            </span>
            <a
              className={classes.EnhancedSearch_SearchModal_FooterLink}
              href="http://enhancedocs.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <EnhanceDocsLogo className={classes.EnhancedSearch_SearchModal_FooterLogo} />
            </a>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SearchModal;
