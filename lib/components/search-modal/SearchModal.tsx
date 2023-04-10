import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { getLocalStorageItem, setLocalStorageItem } from '../../helpers/local-storage';
import type { Config } from '../../Search';
import BackArrowIcon from '../icons/BackArrowIcon';
import MagicIcon from '../icons/MagicIcon';
import SearchIcon from '../icons/SearchIcon';
import Key from '../key/Key';
import Answer from './components/answer/Answer';
import DocsList from './components/docs-list/DocsList';
import Footer from './components/footer/Footer';
import { getAnswers } from './services/answers';
import { getDocs } from './services/docs';
import { formatHits } from './helpers/format';
import classes from './SearchModal.module.css';
import type { AnswerType } from './services/answers.d';
import type { DocsType, DocType } from './services/docs.d';

const INITIAL_ANSWER = { _id: '', search: '', answer: '', sources: [] };
const INITIAL_DOCS: DocsType = [];

type SearchModalProps = {
  config: Config;
  isOpen: boolean;
  onClose?: any;
}

export default function SearchModal ({ config, isOpen, onClose }: SearchModalProps) {
  const inputRef = useRef(null);
  const [recentSearches, setRecentSearches] = useState<DocsType>([]);
  const [docs, setDocs] = useState<DocsType>(INITIAL_DOCS);
  const [answer, setAnswer] = useState<AnswerType>(INITIAL_ANSWER);
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  function handleClose () {
    onClose();
    setRecentSearches([]);
    setDocs(INITIAL_DOCS);
    setAnswer(INITIAL_ANSWER);
  }

  async function handleSearchDocs (event: ChangeEvent<HTMLInputElement>) {
    if (config.docSearch) {
      try {
        if (event.target.value) {
          const { hits } = await getDocs({ config: config.docSearch, search: event.target.value });
          setDocs(formatHits(hits));
        } else {
          setDocs(INITIAL_DOCS);
        }
      } catch (error) {
        console.error('Search docs', error);
      }
    }
  }

  function handleDocClick (doc: DocType) {
    handleClose();
    if (!recentSearches.find(({ _id }) => _id == doc._id)) {
      setLocalStorageItem('recentSearches', [...recentSearches, doc]);
    }
  }

  function handleDocDelete (doc: DocType) {
    const newRecentSearches = recentSearches.filter(({ _id }) => _id != doc._id);
    setRecentSearches(newRecentSearches);
    setLocalStorageItem('recentSearches', newRecentSearches);
  }

  async function handleSearchAnswers (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoadingAnswer(true);

      const data = new FormData(event.target as HTMLFormElement);
      const formValues = Object.fromEntries(data.entries());
      const search = formValues.search as string;

      if (search) {
        const data = await getAnswers({ config: config.enhancedSearch, search });
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
        <section>
          <Answer
            accessToken={config.enhancedSearch.accessToken}
            answer={answer}
            loading={loadingAnswer}
          />
          {
            config.docSearch && (
              docs.length
                ? (
                  <div>
                    <p className={classes.EnhancedSearch__SearchModal__DocsTitle}>Results</p>
                    <DocsList docs={docs} onClick={handleDocClick} />
                  </div>
                )
                : (
                  recentSearches.length
                    ? (
                      <div>
                        <p className={classes.EnhancedSearch__SearchModal__DocsTitle}>Recent</p>
                        <DocsList docs={recentSearches} onDelete={handleDocDelete} />
                      </div>
                    ) : null
                )
            )
          }
          {
            (!loadingAnswer && !answer.answer && !docs.length && !recentSearches.length)
              ? (
                <div className={classes.EnhancedSearch__SearchModal__EmptySearch}>
                  <span>No recent searches</span>
                </div>
              ) : null
          }
        </section>
        <Footer />
      </div>
    </Modal>
  );
}
