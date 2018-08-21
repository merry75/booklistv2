import { GET_BOOKS, ADD_BOOK, EDIT_BOOK, DELETE_BOOK } from "./types";
import data from "./books.json";

export const getBooks = () => {
  return {
    type: GET_BOOKS,
    payload: {
      data
    }
  };
};

export const addBook = v => {
  if (!v.image)
    v.image = "https://i.imgur.com/alZJFFR.jpg";

  return {
    type: ADD_BOOK,
    payload: v
  };
};

export const editBook = v => {
  if (!v.image)
      v.image = "https://i.imgur.com/alZJFFR.jpg";
  return {
    type: EDIT_BOOK,
    payload: v
  };
};

export const deleteBook = ({ id } = {}) => ({
  type: DELETE_BOOK,
  id
});
