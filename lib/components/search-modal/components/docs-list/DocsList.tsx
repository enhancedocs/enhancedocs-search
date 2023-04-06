import { MouseEvent } from 'react';
import DocumentIcon from '../../../icons/DocumentIcon';
import HashIcon from '../../../icons/HashIcon';
import CloseIcon from '../../../icons/CloseIcon';
import type { DocType } from '../../services/docs.d';
import classes from './DocsList.module.css';

const icons = {
  page: DocumentIcon,
  anchor: HashIcon
};

type DocsListProps = {
  docs: Array<DocType>;
  onClick?: Function;
  onDelete?: Function;
}

export default function DocsList ({ docs, onClick, onDelete }: DocsListProps) {
  function handleClick (doc: DocType) {
    if (onClick) {
      onClick(doc);
    }
  }

  function handleDelete (event: MouseEvent<HTMLButtonElement>, doc: DocType) {
    if (onDelete) {
      event.stopPropagation();
      event.preventDefault();
      onDelete(doc);
    }
  }

  return (
    docs.length ? (
      <ul className={classes.EnhancedSearch__SearchModal__DocsList}>
        {docs.map((doc) => {
          const Icon = (icons[doc.type] || null);
          return (
            <a key={doc._id} href={doc.url} onClick={() => handleClick(doc)}>
              <li className={classes.EnhancedSearch__SearchModal__DocsListItem}>
                <div>
                  {Icon && (
                    <div className={classes.EnhancedSearch__SearchModal__DocsListItemIcon}>
                      <Icon />
                    </div>
                  )}
                  <div>
                    <span className={classes.EnhancedSearch__SearchModal__DocsListItemTitle}>
                      {doc.title}
                    </span>
                    <span className={classes.EnhancedSearch__SearchModal__DocsListItemDescription}>
                      {doc.description}
                    </span>
                  </div>
                </div>
                {onDelete && (
                  <button
                    className={classes.EnhancedSearch__SearchModal__DocsListItemButton}
                    onClick={(event) => handleDelete(event, doc)}
                  >
                    <CloseIcon />
                  </button>
                )}
              </li>
            </a>
          )
        })}
      </ul>
    ) : null
  )
}
