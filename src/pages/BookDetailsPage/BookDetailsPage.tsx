import BookDetails from "../../components/BookDetails/BookDetails";
import SearchProps from "../../components/PropsInterace";
import SearchPanel from "../../components/SearchPanel/SearchPanel";
import styles from "./styles.module.scss";

const BookDetailsPage: React.FC<SearchProps> = ({value, setValue, category, setCategory, sortingOption, setSortingOption}) => {
  return (
    <div className={styles.content}>
        <SearchPanel value={value} setValue={setValue} category={category} setCategory={setCategory} sortingOption={sortingOption} setSortingOption={setSortingOption}/>
        <BookDetails />
    </div>
  );
};

export default BookDetailsPage;
