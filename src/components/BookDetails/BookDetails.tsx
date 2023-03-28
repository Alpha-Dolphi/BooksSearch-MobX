import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ReactComponent as Logo } from '../../icons/Icon-Image.svg';
import bookStore from '../../store/book';

import styles from "./styles.module.scss";

const BookDetails = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const books = bookStore.allBooks;
  let bookData = null;


  useEffect(() => {
    if (!Object.keys(books).length && bookId) {
      bookStore.fetchBook(bookId);
    }
  }, []);

  if (bookId) {
    bookData = bookStore.getBookById(bookId);
  }

  return (
    <div className={styles.book__info_container}>
      {bookData ? (
        <>
          <div className={styles.image__box}>
            {!bookData.volumeInfo.imageLinks?.smallThumbnail ? (
              <Logo />
            ) : (
              <img
                key={bookData.id}
                src={bookData.volumeInfo.imageLinks?.smallThumbnail}
                loading="lazy"
              />
            )}
          </div>
          <div className={styles.info__box}>
            {bookData.volumeInfo.categories ? (
              <h4>{bookData.volumeInfo.categories}</h4>
            ) : null}
            <h3>{bookData.volumeInfo.title}</h3>
            <div>
              {bookData.volumeInfo?.authors
                ? Object.values(bookData.volumeInfo.authors).map(
                    (author, index) => <h4 key={index}>{author}</h4>
                  )
                : null}
              <p>{bookData.volumeInfo.description}</p>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default observer(BookDetails);
