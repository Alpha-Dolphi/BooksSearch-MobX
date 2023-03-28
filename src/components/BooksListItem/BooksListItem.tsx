import Book from "../../store/book/bookInterfaces";
import styles from "./styles.module.scss";
import { ReactComponent as Image } from '../../icons/Icon-Image.svg';


interface Props {
  bookData: Book;
}

const BooksListItem = ({ bookData }: Props) => {

  return (
    <div key={bookData.id} data-key={bookData.id} className={styles.book__card}>
        <div className={styles.image__box}>
            {
                !bookData.volumeInfo.imageLinks?.smallThumbnail
                ? <Image />
                : <img
                    key={bookData.id}
                    src={bookData.volumeInfo.imageLinks?.smallThumbnail}
                    loading="lazy"
                />
            }
        </div>
        <div className={styles.info__box}>
            <h4>{bookData.volumeInfo.categories ? bookData.volumeInfo.categories[0] : null}</h4>
            <h3>{bookData.volumeInfo.title}</h3>
            <div>
            {bookData.volumeInfo?.authors ? Object.values(bookData.volumeInfo.authors).map((author, index) => <h4 key={index}>{author}</h4>) : null}
            </div>
        </div>
    </div>
  );
}

export default BooksListItem;
