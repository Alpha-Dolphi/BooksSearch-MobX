import { useState, useEffect } from 'react';
import BooksList from "../../components/BooksList/BooksList";
import SearchPanel from "../../components/SearchPanel/SearchPanel";
import { observer } from "mobx-react";
import searchQueryParameters from "../../store/book/bookInterfaces";
import styles from "./styles.module.scss";
import Book from "../../store/book/bookInterfaces";
import SearchProps from "../../components/PropsInterace";
import bookStore from '../../store/book';

const BooksListPage: React.FC<SearchProps> = ({ value, setValue, category, setCategory, sortingOption, setSortingOption }) => {
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 30;

  useEffect(() => {
    bookStore.reset();
  }, [sortingOption, value, category]);

  useEffect(() => {
    bookStore.fetchBooks({
      sortingOption: sortingOption,
      searchQuery: value ? value : "{}",
      startIndex: startIndex,
      maxResults: maxResults,
      category: category,
    } as searchQueryParameters);
  }, [startIndex, sortingOption, value, category]);

  const books = bookStore.allBooks;
  // console.log("HERE");
  // console.log("unfilterdBooks ",  Object.keys(books).length, " = ", books);

  // const filterdBooks = Object.values(books)
  //   .filter(book => {
  //     const matchesSearchTerm = book.volumeInfo.title.includes(value);
  //     const matchesCategory = category === "all" || book.volumeInfo.categories?.some(str => str.includes(category));
  //     return matchesSearchTerm && matchesCategory;
  //   })
  //   .reduce((obj: Record<string, Book>, book) => {
  //     obj[book.id] = book;
  //     return obj;
  //   }, {});

    // console.log("filterdBooks ",  Object.keys(filterdBooks).length, " = ", filterdBooks);

  return (
    <div className={styles.content}>
      <SearchPanel value={value} setValue={setValue} category={category} setCategory={setCategory} sortingOption={sortingOption} setSortingOption={setSortingOption} />

      <div className={styles.total_items}>
        <h2>Found {bookStore.totalOfItems ? bookStore.totalOfItems : 0} results</h2>
      </div>

      <BooksList books={books} />
      <div className={styles.loading_indicator}>
        {bookStore.loadingStatus === 'inProgress' ? <h2>Loading Books..</h2> : ""}
      </div>

      <button className={styles.loader__button} onClick={() => setStartIndex(startIndex + 30)}>Load more</button>
    </div>
  );
};

export default observer(BooksListPage);
