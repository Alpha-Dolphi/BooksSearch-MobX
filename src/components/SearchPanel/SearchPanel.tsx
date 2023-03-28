import { useState, useEffect, useRef } from 'react';
import styles from "./styles.module.scss";
import { ReactComponent as SearchIcon } from '../../icons/search-icon.svg';
import SearchProps from "../PropsInterace";
import { BookCategory, SortingOption } from "../../constants/statesEnums";

const SearchPanel : React.FC<SearchProps> = ({setValue, category, setCategory, setSortingOption}) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event : any) => {
    event.preventDefault();
    setValue(input);
  }


  return (
    <div className={styles.search__panel}>
      <div className={styles.search__panel_content}>
      <h1>Search for books</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.search__input_box}>
            <div>
            <input
              type="text"
              className={styles.search__input}
              onChange={(event) => setInput(event.target.value)}
            />
            <SearchIcon onClick={handleSubmit}/>
            </div>
          </div>
            <div className={styles.filters}>
          <div className={styles.categories}>

          <h3>Categories</h3>
          <select value={category} onChange={(e) => setCategory(e.target.value as BookCategory)}>
            <option value={BookCategory.All}>All</option>
            <option value={BookCategory.Art}>Art</option>
            <option value={BookCategory.Biography}>Biography</option>
            <option value={BookCategory.Computers}>Computers</option>
            <option value={BookCategory.History}>History</option>
            <option value={BookCategory.Medical}>Medical</option>
            <option value={BookCategory.Poetry}>Poetry</option>
          </select>
          </div>

          <div className={styles.sorting}>
          <h3>Sorting by</h3>
          <select onChange={(e) => setSortingOption(e.target.value as SortingOption)}>
            <option value={SortingOption.Relevance}>Relevance</option>
            <option value={SortingOption.Newest}>Newest</option>
          </select>
          </div>
          </div>

        </form>
        </div>
    </div>
  );
}

export default SearchPanel;
