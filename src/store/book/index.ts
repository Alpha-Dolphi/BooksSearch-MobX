import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { LoadingStatuses } from '../../constants/loadingStatuses';
import searchQueryParameters from './bookInterfaces';
import Book from './bookInterfaces';
import { enableLogging } from "mobx-logger";
import { toJS } from 'mobx';

// enableLogging({
//   predicate: () => true, // log all changes
//   action: true, // log actions
//   reaction: false, // don't log reactions
//   compute: false, // don't log computed values
// });


interface BookState {
  totalItems: string;
  status: LoadingStatuses;
  entities: {
    [id: string]: Book;
  };
  ids: string[];
}

const initialState: BookState = {
  totalItems: '',
  status: LoadingStatuses.Idle,
  entities: {},
  ids: [],
};

class BookStore {
  totalItems = '';
  status = LoadingStatuses.Idle;
  entities: { [id: string]: Book } = {};
  ids: string[] = [];

  // static mobxLoggerConfig: {
  //   enabled: true,
  //   // methods: {
  //   //     myAction: true
  //   // }
  // };

  constructor() {
    makeAutoObservable(this);
  }

  get allBooks(): { [id: string]: Book } {
    return this.entities;
  }

  get loadingStatus(): LoadingStatuses {
    return this.status;
  }

  get totalOfItems() : string {
    return this.totalItems;
  }

  getBookById(id : string) : Book {
    return this.entities[id];
  }

  async fetchBooks({
    sortingOption,
    searchQuery,
    startIndex,
    maxResults,
    category,
  }: searchQueryParameters) {
    try {
      this.setStatus(LoadingStatuses.InProgress);
      const response = await axios.get(
        `${(window as any).API_URL}?q=${searchQuery}+subject:${category}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${sortingOption}&key=${(window as any).API_KEY}`
      );
      this.setBooks(response.data.items);
      this.setTotalItems(response.data.totalItems);
      this.setStatus(LoadingStatuses.Success);
    } catch (error) {
      this.setStatus(LoadingStatuses.Failed);
      throw error;
    }
  }

  async fetchBook(id: string) {
    try {
      this.setStatus(LoadingStatuses.InProgress);
      const response = await axios.get(`${(window as any).API_URL}/${id}`);
      this.setBook(response.data);
      this.setStatus(LoadingStatuses.Success);
    } catch (error) {
      this.setStatus(LoadingStatuses.Failed);
      throw error;
    }
  }

  setBooks(books: Book[]) {
    // if (!books) {
    //   return;
    // }

    this.ids.push(...books.map((item: Book) => item.id));
    this.entities = {
      ...this.entities,
      ...books.reduce(
      (acc: { [id: string]: Book }, item: Book) => {
        acc[item.id] = item;
        return acc;
      },
      {}
    )};
    console.log("entities ",  Object.keys(this.entities).length, " = ", toJS(this.entities));
  }

  setBook(book: Book) {
    this.ids.push(book.id);
    this.entities[book.id] = book;
  }

  setTotalItems(totalItems: string) {
    this.totalItems = totalItems;
  }

  setStatus(status: LoadingStatuses) {
    this.status = status;
  }

  reset() {
    this.ids = initialState.ids;
    this.entities = initialState.entities;
    this.totalItems = initialState.totalItems;
    this.status = initialState.status;
  }
}

const bookStore = new BookStore();

export default bookStore;
