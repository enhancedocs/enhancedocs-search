import { FormEvent, useRef, useState } from 'react';
import Modal from 'react-modal';
import type { Config } from '../../Search';
import BackArrowIcon from '../icons/BackArrowIcon';
import MagicIcon from '../icons/MagicIcon';
import SearchIcon from '../icons/SearchIcon';
import Key from '../key/Key';
import Answer from './components/answer/Answer';
import Footer from './components/footer/Footer';
import { getAnswers } from './services/answers';
import type { AnswerData } from './services/answers';
import { processStream } from './helpers/stream';
import classes from './SearchModal.module.css';

const INITIAL_ANSWER = { answerId: '', search: '', answer: '', sources: [] };

type SearchModalProps = {
  config: Config;
  isOpen: boolean;
  onClose?: () => void;
}

export default function SearchModal ({ config, isOpen, onClose }: SearchModalProps) {
  const inputRef = useRef(null);
  const answerContainerRef = useRef<HTMLDivElement>(null);
  const [answer, setAnswer] = useState<AnswerData>(INITIAL_ANSWER);
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  function handleClose () {
    if (onClose) onClose();
    setAnswer(INITIAL_ANSWER);
  }

  async function handleSearchAnswers (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoadingAnswer(true);

      const data = new FormData(event.target as HTMLFormElement);
      const formValues = Object.fromEntries(data.entries());
      const search = formValues.search as string;

      if (search) {
        const response = await getAnswers({ config, search });

        setLoadingAnswer(false);

        await processStream(response.body, (text, result: AnswerData) => {
          setAnswer({
            search,
            answer: text,
            answerId: result ? result.answerId : undefined,
            threadId: result ? result.threadId : undefined,
            sources: result ? result.sources : []
          });
        });

        if (inputRef.current) {
          (inputRef.current as HTMLInputElement).blur();
        }
        if (answerContainerRef.current) {
          answerContainerRef.current.scrollTop = answerContainerRef.current.scrollHeight;
        }
      } else {
        setAnswer(INITIAL_ANSWER);
      }
    } catch(error) {
      console.error('Search answers', error);
    }
  }

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
          autoFocus
        />
        <Key className={classes.EnhancedSearch__SearchModal__SubmitButtonKey}>
          <button className={classes.EnhancedSearch__SearchModal__SubmitButton} type="submit">
            <MagicIcon />
          </button>
        </Key>
      </form>

      <div className={classes.EnhancedSearch__SearchModal__InnerBody}>
        <section ref={answerContainerRef}>
          <Answer
            config={config}
            answer={answer}
            loading={loadingAnswer}
          />
          {
            (!loadingAnswer && !answer.answer)
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
