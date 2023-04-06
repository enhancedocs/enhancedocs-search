import DocumentIcon from '../../../icons/DocumentIcon';
import HashIcon from '../../../icons/HashIcon';
import classes from './DocsList.module.css';
import type { DocsListProps } from './DocsList.d';

const icons = {
  page: DocumentIcon,
  anchor: HashIcon
};

function DocsList({ docs, onClick }: DocsListProps) {
  return (
    docs.length ? (
      <ul className={classes.EnhancedSearch__SearchModal__DocsList}>
        {docs.map((doc) => {
          const Icon = (icons[doc.type] || null);
          return (
            <a key={doc._id} href={doc.url} onClick={onClick ? () => onClick(doc) : undefined}>
              <li className={classes.EnhancedSearch__SearchModal__DocsListItem}>
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
              </li>
            </a>
          )
        })}
      </ul>
    ) : null
  )
}

export default DocsList;
