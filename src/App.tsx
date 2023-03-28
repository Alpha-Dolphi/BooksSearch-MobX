import { useState } from "react";
import { Provider } from 'mobx-react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookCategory, SortingOption } from "./constants/statesEnums";
import BookDetailsPage from "./pages/BookDetailsPage/BookDetailsPage";
import BooksListPage from "./pages/BooksListPage/BooksListPage";
import NotFound from "./pages/NotFound/NotFound";
import store from "./store/book";

const App = () => {
  const [sortingOption, setSortingOption] = useState<SortingOption>(SortingOption.Relevance);
  const [value, setValue] = useState<string>("");
  const [category, setCategory] = useState<BookCategory>(BookCategory.All);

  return (
    <BrowserRouter>
      <Provider store={store}>
            <Routes>
              <Route index path="/" element={<BooksListPage  value={value} setValue={setValue} category={category} setCategory={setCategory} sortingOption={sortingOption} setSortingOption={setSortingOption}/>}></Route>
              <Route index path="/:bookId" element={<BookDetailsPage value={value} setValue={setValue} category={category} setCategory={setCategory} sortingOption={sortingOption} setSortingOption={setSortingOption}/>}></Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
