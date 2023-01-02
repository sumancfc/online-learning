import { AiOutlineSearch } from "react-icons/ai";

const SearchForm = () => {
  return (
    <form className='form-control w-50'>
      <AiOutlineSearch />
      <input
        className='search-btn'
        type='search'
        placeholder='Search any thing'
        aria-label='Search'
      />
    </form>
  );
};

export default SearchForm;
