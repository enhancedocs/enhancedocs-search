import { FormEvent, lazy, Suspense, useRef, useState } from 'react';
import Modal from 'react-modal';
import BackArrowIcon from '../icons/BackArrowIcon';
import CheckCircle from '../icons/CheckCircle';
import LinkIcon from '../icons/LinkIcon';
import MagicIcon from '../icons/MagicIcon';
import SearchIcon from '../icons/SearchIcon';
import Key from '../key/Key';
import DotStretching from './components/dot-stretching/DotStretching';
import EnhanceDocsLogo from './components/enhancedocs-logo/EnhanceDocsLogo';
import { DocsResponse, getDocs, answerFeedback } from './services/search';
import classes from './SearchModal.module.css';

const ReactMarkdown = lazy(() => import('react-markdown'));

const INITIAL_DOCS = { _id: '', search: '', answer: '', sources: [] };

type SearchModalProps = {
  accessToken: string;
  isOpen: boolean;
  onClose?: any;
}

function SearchModal({ accessToken, isOpen, onClose }: SearchModalProps) {
  const inputRef = useRef(null);
  const [docs, setDocs] = useState<DocsResponse>(INITIAL_DOCS);
  const [loading, setLoading] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  function handleClose() {
    onClose();
    setDocs(INITIAL_DOCS);
    setFeedbackSuccess(false);
  }

  async function handleFeedback({ answerId, usefulFeedback }: { answerId: string, usefulFeedback: boolean }) {
    try {
      setFeedbackLoading(true);
      await answerFeedback({ accessToken, answerId, usefulFeedback });
      setFeedbackSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setFeedbackLoading(false);
    }
  }

  async function handleSearchDocs(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);

      const data = new FormData(event.target as HTMLFormElement);
      const formValues = Object.fromEntries(data.entries());
      const search = formValues.search as string;

      if (search) {
        const data = await getDocs({ accessToken, search });
        setDocs({
          search,
          _id: data._id,
          answer: data.answer,
          sources: data.sources
        });
        if (inputRef.current) {
          (inputRef.current as HTMLInputElement).blur();
        }
      } else {
        setDocs(INITIAL_DOCS);
      }
    } catch(error) {
      console.error(error);
    } finally {
      setFeedbackSuccess(false);
      setLoading(false);
    }
  }

  return (
    <Modal
      className={classes.EnhancedSearch__SearchModal__Content}
      style={{ overlay: { backgroundColor: 'rgb(24, 27, 33, 0.3)' } }}
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Search"
      ariaHideApp={false}
    >
      <form
        className={classes.EnhancedSearch__SearchModal__InputContainer}
        name="search-form"
        onSubmit={handleSearchDocs}
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
          autoFocus
        />
        <Key className={classes.EnhancedSearch__SearchModal__SubmitButtonKey}>
          <button className={classes.EnhancedSearch__SearchModal__SubmitButton} type="submit">
            <MagicIcon />
          </button>
        </Key>
      </form>
      <div className={classes.EnhancedSearch__SearchModal__InnerBody}>
        {
          loading
            ? (
              <div className={classes.EnhancedSearch__SearchModal__EmptySearch}>
                <span>Gathering sources...</span>
                <div className={classes.EnhancedSearch__SearchModal__LoadingContainer}>
                  <div className={classes.EnhancedSearch__SearchModal__Loading} />
                </div>
              </div>
            )
            : (
              docs.search
                ? (
                  <div className={classes.EnhancedSearch__SearchModal__SearchContainer}>
                    <h2 className={classes.EnhancedSearch__SearchModal__ResultQuery}>{docs.search}</h2>
                    <Suspense fallback={<></>}>
                      <ReactMarkdown
                        className={classes.EnhancedSearch__SearchModal__ResultAnswer}
                        components={{
                          code(props) {
                            return <code className={classes.EnhancedSearch__SearchModal__ResultAnswerCode} {...props} />;
                          },
                          a(props) {
                            return <a className={classes.EnhancedSearch__SearchModal__ResultAnswerLink} {...props} />;
                          }
                        }}
                        >
                        {docs.answer}
                      </ReactMarkdown>
                    </Suspense>

                    {
                      feedbackLoading
                        ? (
                          <div className={classes.EnhancedSearch__SearchModal__Feedback}>
                            <DotStretching />
                          </div>
                        ) : (
                          <div className={classes.EnhancedSearch__SearchModal__Feedback}>
                            {
                              feedbackSuccess
                                ? (
                                  <div className={classes.EnhancedSearch__SearchModal__SuccessFeedback}>
                                    <CheckCircle />
                                    <span>Thanks for submitting your feedback!</span>
                                  </div>
                                )
                                : (
                                  <>
                                    <p className={classes.EnhancedSearch__SearchModal__FeedbackTitle}>Was this response useful?</p>
                                    <button
                                      className={classes.EnhancedSearch__SearchModal__FeedbackButton}
                                      onClick={() => handleFeedback({ answerId: docs._id, usefulFeedback: true })}
                                    >
                                      Yes
                                    </button>
                                    <button
                                      className={classes.EnhancedSearch__SearchModal__FeedbackButton}
                                      onClick={() => handleFeedback({ answerId: docs._id, usefulFeedback: false })}
                                    >
                                      No
                                    </button>
                                  </>
                                )
                            }
                          </div>
                        )
                    }

                    <div className={classes.EnhancedSearch__SearchModal__ResultSources}>
                      <p className={classes.EnhancedSearch__SearchModal__ResultSourcesTitle}>
                        Summary generated from the following sources:
                      </p>
                      <div>
                        {docs.sources.map((source, index) => {
                          return (
                            <a
                              key={`source-${index}`}
                              className={classes.EnhancedSearch__SearchModal__ResultSourceItem}
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
                  <div className={classes.EnhancedSearch__SearchModal__EmptySearch}>
                    <span>No recent searches</span>
                  </div>
                )
            )
        }
        <footer className={classes.EnhancedSearch__SearchModal__Footer}>
          <div>
            <div className={classes.EnhancedSearch__SearchModal__FooterKey}>
              <Key>esc</Key>
              to close
            </div>
          </div>
          <div className={classes.EnhancedSearch__SearchModal__FooterLogoContainer}>
            <span>
              Search by
            </span>
            <a
              className={classes.EnhancedSearch__SearchModal__FooterLink}
              href="http://enhancedocs.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <EnhanceDocsLogo className={classes.EnhancedSearch__SearchModal__FooterLogo} />
            </a>
          </div>
        </footer>
      </div>
    </Modal>
  )
}

export default SearchModal;
