export type SearchProps = {
  placeholder: string;
  size?: 'small' | 'middle' | 'large';
}

function Search({ placeholder, size = 'middle' }: SearchProps) {
  return (
    <input placeholder={placeholder} />
  )
}

export default Search;
