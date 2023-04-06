import type { DocType } from '../../services/docs.d';

export type DocsListProps = {
  docs: Array<DocType>;
  onClick?: Function;
  onDelete?: Function;
}
