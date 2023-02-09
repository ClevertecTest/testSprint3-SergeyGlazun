import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { getIsLoadingBooksRequests, getLoadingBooksList } from '../../store/books/selectors';
import { getToasts } from '../../store/view/selectors';
import { Footer } from '../footer';
import { Header } from '../header';
import { Loader } from '../loader';
import { Toast } from '../toast';

import styles from './layout.module.scss';

export const Layout = () => {
    const { pathname } = useLocation();

    const isLoadingBooksRequests = useSelector(getIsLoadingBooksRequests);
    const isLoadingBooksList = useSelector(getLoadingBooksList);
    const toasts = useSelector(getToasts);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className={styles.layout} data-test-id='app'>
            <Header />
            <Outlet />
            <Footer />
            {isLoadingBooksRequests || isLoadingBooksList ? <Loader /> : null}
            {toasts.length > 0 &&
                toasts.map((item: { text: string }) => <Toast text={item.text} />)}
        </div>
    );
};
