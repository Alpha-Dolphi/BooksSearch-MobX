import { BookCategory, SortingOption } from "../../constants/statesEnums";


export default interface SearchProps {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>;
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<BookCategory>>;
    sortingOption: SortingOption,
    setSortingOption: React.Dispatch<React.SetStateAction<SortingOption>>;
  }