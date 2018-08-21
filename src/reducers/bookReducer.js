import { GET_BOOKS, EDIT_BOOK, DELETE_BOOK, ADD_BOOK } from "../actions/types";

let initialState = {
  books: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload.data
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [action.payload, ...state.books]
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.id)
      };
    case EDIT_BOOK:
      const newBooks = state.books.map(book => {
        if (book.id === action.payload.id) {
          return action.payload;
        }
        return book;
      });
      return {
        ...state,
        books: newBooks
      };
    default:
      return state;
  }
}
