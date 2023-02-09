import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '../../api/axios';
import { BOOKS_URL } from '../../constants/api';
import { ERROR } from '../../constants/errors';
import { TOAST } from '../../constants/toast';
import { setToast } from '../view';

import { BookCategoriesDataType, BookDataType, BookListDataType } from './types';
import {
    bookCategoriesFailure,
    bookCategoriesRequest,
    bookCategoriesSuccess,
    bookListRequest,
    bookListRequestFailure,
    bookListRequestSuccess,
    bookRequest,
    bookRequestFailure,
    bookRequestSuccess,
} from '.';

function* bookListRequestWorker() {
    try {
        const response: AxiosResponse<BookListDataType> = yield call(
            axiosInstance.get,
            BOOKS_URL.list,
        );

        yield put(bookListRequestSuccess(response.data));
    } catch {
        yield put(bookListRequestFailure());
        yield put(setToast({ type: TOAST.warning, text: ERROR.book }));
    }
}

function* bookCategoriesRequestWorker() {
    try {
        const response: AxiosResponse<BookCategoriesDataType> = yield call(
            axiosInstance.get,
            BOOKS_URL.categories,
        );

        yield put(bookCategoriesSuccess(response.data));
    } catch {
        yield put(bookCategoriesFailure());
        yield put(setToast({ type: TOAST.warning, text: ERROR.book }));
    }
}

function* bookRequestWorker({ payload }: PayloadAction<string>) {
    try {
        const response: AxiosResponse<BookDataType> = yield call(
            axiosInstance.get,
            `${BOOKS_URL.item}/${payload}`,
        );

        yield put(bookRequestSuccess(response.data));
    } catch {
        yield put(bookRequestFailure());
        yield put(setToast({ type: TOAST.warning, text: ERROR.book }));
    }
}

export function* watchBookListRequest() {
    yield takeLatest(bookListRequest, bookListRequestWorker);
}

export function* watchBookRequest() {
    yield takeLatest(bookRequest, bookRequestWorker);
}

export function* watchBookCategoriesRequest() {
    yield takeLatest(bookCategoriesRequest, bookCategoriesRequestWorker);
}
