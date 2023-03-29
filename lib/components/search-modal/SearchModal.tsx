import { FormEvent, lazy, Suspense, useState } from 'react';
import Modal from 'react-modal';
import DotStretching from '../dot-stretching/DotStretching';
import CheckCircle from '../icons/CheckCircle';
import LinkIcon from '../icons/LinkIcon';
import SearchIcon from '../icons/SearchIcon';
import SubmitIcon from '../icons/SubmitIcon';
import Key from '../key/Key';
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
      className={classes.EnhancedSearch_SearchModal_Content}
      style={{ overlay: { backgroundColor: 'rgb(24, 27, 33, 0.3)' } }}
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Search"
      ariaHideApp={false}
    >
      <form
        className={classes.EnhancedSearch_SearchModal_InputContainer}
        name="search-form"
        onSubmit={handleSearchDocs}
      >
        <SearchIcon />
        <input
          className={classes.EnhancedSearch_SearchModal_Input}
          name="search"
          placeholder="Ask a question or search the docs..."
          autoFocus
        />
        <Key>
          <button className={classes.EnhancedSearch_SearchModal_SubmitButton} type="submit">
            <SubmitIcon />
          </button>
        </Key>
      </form>
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
                    <Suspense fallback={<></>}>
                      <ReactMarkdown
                        className={classes.EnhancedSearch_SearchModal_ResultAnswer}
                        components={{
                          code(props) {
                            return <code className={classes.EnhancedSearch_SearchModal_ResultAnswerCode} {...props} />;
                          },
                          a(props) {
                            return <a className={classes.EnhancedSearch_SearchModal_ResultAnswerLink} {...props} />;
                          }
                        }}
                        >
                        {docs.answer}
                      </ReactMarkdown>
                    </Suspense>

                    {
                      feedbackLoading
                        ? (
                          <div className={classes.EnhancedSearch_SearchModal_Feedback}>
                            <DotStretching />
                          </div>
                        ) : (
                          <div className={classes.EnhancedSearch_SearchModal_Feedback}>
                            {
                              feedbackSuccess
                                ? (
                                  <div className={classes.EnhancedSearch_SearchModal_SuccessFeedback}>
                                    <CheckCircle />
                                    <span>Thanks for submitting your feedback!</span>
                                  </div>
                                )
                                : (
                                  <>
                                    <p className={classes.EnhancedSearch_SearchModal_FeedbackTitle}>Was this response useful?</p>
                                    <button
                                      className={classes.EnhancedSearch_SearchModal_FeedbackButton}
                                      onClick={() => handleFeedback({ answerId: docs._id, usefulFeedback: true })}
                                    >
                                      Yes
                                    </button>
                                    <button
                                      className={classes.EnhancedSearch_SearchModal_FeedbackButton}
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
