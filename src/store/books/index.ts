import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookCategoriesDataType, BookDataType, BookListDataType, BooksType } from './types';

export const initialState: BooksType = {
    bookList: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
    },
    book: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
    },
    bookCategories: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
    },
};

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        bookListRequest: (state) => {
            state.bookList.isLoading = true;
        },
        bookListRequestSuccess: (state, action: PayloadAction<BookListDataType>) => {
            state.bookList.isLoading = false;
            state.bookList.isError = false;
            state.bookList.isSuccess = true;
            state.bookList.data = action.payload;
        },
        bookListRequestFailure: (state) => {
            state.bookList.isLoading = false;
            state.bookList.isError = true;
            state.bookList.isSuccess = false;
            state.bookList.data = null;
        },

        bookRequest: (state, action: PayloadAction<string>) => {
            state.book.isLoading = true;
        },
        bookRequestSuccess: (state, action: PayloadAction<BookDataType>) => {
            state.book.isLoading = false;
            state.book.isError = false;
            state.book.isSuccess = true;
            state.book.data = action.payload;
        },
        bookRequestFailure: (state) => {
            state.book.isLoading = false;
            state.book.isError = true;
            state.book.isSuccess = false;
            state.book.data = null;
        },
        resetBookData: (state) => {
            state.book.data = null;
        },

        bookCategoriesRequest: (state) => {
            state.bookCategories.isLoading = true;
        },
        bookCategoriesSuccess: (state, action: PayloadAction<BookCategoriesDataType>) => {
            state.bookCategories.isLoading = false;
            state.bookCategories.isError = false;
            state.bookCategories.isSuccess = true;
            state.bookCategories.data = action.payload;
        },
        bookCategoriesFailure: (state) => {
            state.bookCategories.isLoading = false;
            state.bookCategories.isError = true;
            state.bookCategories.isSuccess = false;
            state.bookCategories.data = null;
        },
    },
});

export const {
    bookListRequest,
    bookListRequestSuccess,
    bookListRequestFailure,
    bookRequest,
    bookRequestSuccess,
    bookRequestFailure,
    resetBookData,
    bookCategoriesRequest,
    bookCategoriesSuccess,
    bookCategoriesFailure,
} = booksSlice.actions;
