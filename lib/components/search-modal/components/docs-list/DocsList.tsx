import DocumentIcon from '../../../icons/DocumentIcon';
import HashIcon from '../../../icons/HashIcon';
import { DocType } from '../../services/docs';
import classes from './DocsList.module.css';

const icons = {
  page: DocumentIcon,
  anchor: HashIcon
};

type DocsListProps = {
  docs: Array<DocType>;
  onClick?: Function;
}

function DocsList({ docs, onClick }: DocsListProps) {
  return (
    docs.length ? (
      <ul className={classes.EnhancedSearch__SearchModal__DocsList}>
        {docs.map((doc) => {
          const Icon = (icons[doc.type] || null);
          return (
            <li
              key={doc._id}
              className={classes.EnhancedSearch__SearchModal__DocsListItem}
              onClick={onClick ? () => onClick(doc) : undefined}
            >
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
          )
        })}
      </ul>
    ) : null
  )
}

export default DocsList;
