import { useEffect } from 'react';
import classNames from 'classnames';

import { MenuViewEnum } from '../../constants/menu-view';
import { bookListRequest } from '../../store/books';
import { getBookCategories, getBookList } from '../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Card } from '../card';

import styles from './content.module.scss';

type ContentProps = {
    menuView: string;
};

export const Content = ({ menuView }: ContentProps) => {
    const dispatch = useAppDispatch();
    const bookList = useAppSelector(getBookList);
    const bookCategories = useAppSelector(getBookCategories);

    useEffect(() => {
        dispatch(bookListRequest());
    }, [dispatch]);

    const listClassName = classNames(
        menuView === MenuViewEnum.window ? styles.viewWindow : styles.viewList,
    );

    return (
        <main data-test-id='content'>
            {bookList && bookCategories && (
                <ul
                    className={classNames(
                        menuView === MenuViewEnum.window ? styles.viewWindow : styles.viewList,
                        listClassName,
                    )}
                >
                    {bookList?.map((book) => (
                        <Card data={book} key={book.id} menuView={menuView} />
                    ))}
                </ul>
            )}
        </main>
    );
};
