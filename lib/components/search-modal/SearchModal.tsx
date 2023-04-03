import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { getLocalStorageItem, setLocalStorageItem } from '../../helpers/localstorage';
import type { Config } from '../../Search';
import BackArrowIcon from '../icons/BackArrowIcon';
import MagicIcon from '../icons/MagicIcon';
import SearchIcon from '../icons/SearchIcon';
import Key from '../key/Key';
import Answer from './components/answer/Answer';
import DocsList from './components/docs-list/DocsList';
import Footer from './components/footer/Footer';
import { AnswerType, getAnswers } from './services/answers';
import { DocsType, DocType, getDocs } from './services/docs';
import classes from './SearchModal.module.css';

function formatHits(hits: any) {
  return hits.map((hit: any) => {
    const { objectID, hierarchy, content, type, url } = hit.document;
    const hierarchyValues = Object.values(hierarchy).filter(Boolean);

    return {
      _id: objectID,
      title: hierarchyValues[hierarchyValues.length - 1],
      descrption: content,
      type,
      url
    };
  });
}

const INITIAL_ANSWER = { _id: '', search: '', answer: '', sources: [] };
const INITIAL_DOCS: DocsType = [];

type SearchModalProps = {
  config: Config;
  isOpen: boolean;
  onClose?: any;
}

function SearchModal({ config, isOpen, onClose }: SearchModalProps) {
  const inputRef = useRef(null);
  const [recentSearches, setRecentSearches] = useState<DocsType>([]);
  const [docs, setDocs] = useState<DocsType>(INITIAL_DOCS);
  const [answer, setAnswer] = useState<AnswerType>(INITIAL_ANSWER);
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  function handleClose() {
    onClose();
    setRecentSearches([]);
    setDocs(INITIAL_DOCS);
    setAnswer(INITIAL_ANSWER);
  }

  async function handleSearchDocs(event: ChangeEvent<HTMLInputElement>) {
    try {
      const { hits } = await getDocs({ config: config.typesense, search: event.target.value });
      setDocs(formatHits(hits));
    } catch (error) {
      console.error('Search docs', error);
    }
  }

  function handleDocClick(doc: DocType) {
    handleClose();
    setLocalStorageItem('recentSearches', [...recentSearches, doc]);
  }

  async function handleSearchAnswers(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoadingAnswer(true);

      const data = new FormData(event.target as HTMLFormElement);
      const formValues = Object.fromEntries(data.entries());
      const search = formValues.search as string;

      if (search) {
        const data = await getAnswers({ accessToken: config.enhancedocs.accessToken, search });
        setAnswer({
          search,
          _id: data._id,
          answer: data.answer,
          sources: data.sources
        });
        if (inputRef.current) {
          (inputRef.current as HTMLInputElement).blur();
        }
      } else {
        setAnswer(INITIAL_ANSWER);
      }
    } catch(error) {
      console.error('Search answers', error);
    } finally {
      setLoadingAnswer(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      const localRecentSearches = getLocalStorageItem('recentSearches');
      if (localRecentSearches) {
        setRecentSearches(localRecentSearches);
      }
    }
  }, [isOpen]);

  return (
    <Modal
      className={classes.EnhancedSearch__SearchModal}
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Search"
      ariaHideApp={false}
    >
      <form
        className={classes.EnhancedSearch__SearchModal__InputContainer}
        name="enhancedsearch-form"
        onSubmit={handleSearchAnswers}
      >
        <div
          className={classes.EnhancedSearch__SearchModal__BackContainer}
          onClick={handleClose}
        >
          <BackArrowIcon className={classes.EnhancedSearch__SearchModal__BackArrowIcon} />
        </div>
        <SearchIcon className={classes.EnhancedSearch__SearchModal__SearchIcon} />
        <input
          className={classes.EnhancedSearch__SearchModal__Input}
          ref={inputRef}
          name="search"
          placeholder="Search the docs or ask a question..."
          onChange={handleSearchDocs}
          autoFocus
        />
        <Key className={classes.EnhancedSearch__SearchModal__SubmitButtonKey}>
          <button className={classes.EnhancedSearch__SearchModal__SubmitButton} type="submit">
            <MagicIcon />
          </button>
        </Key>
      </form>

      <div className={classes.EnhancedSearch__SearchModal__InnerBody}>
        <Answer
          accessToken={config.enhancedocs.accessToken}
          answer={answer}
          loading={loadingAnswer}
        />
        {
          docs.length
            ? (
              <>
                <p className={classes.EnhancedSearch__SearchModal__DocsTitle}>Results</p>
                <DocsList
                  docs={docs}
                  onClick={handleDocClick}
                />
              </>
            )
            : (
              recentSearches.length
                ? (
                  <>
                    <p className={classes.EnhancedSearch__SearchModal__DocsTitle}>Recent</p>
                    <DocsList docs={recentSearches} />
                  </>
                )
                : (
                  <div className={classes.EnhancedSearch__SearchModal__EmptySearch}>
                    <span>No recent searches</span>
                  </div>
                )
            )
        }
        <Footer />
      </div>
    </Modal>
  )
}

export default SearchModal;
