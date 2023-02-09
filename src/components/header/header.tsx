import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { HEADER_TITLE } from '../../constants/location';
import { bookCategoriesRequest } from '../../store/books';
import { useAppDispatch } from '../../store/hooks';
import { BurgerMenu } from '../burger-menu';
import { HeaderUser } from '../header-user';

import logo from './assets/logo.svg';

import styles from './header.module.scss';

export const Header = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(bookCategoriesRequest());
    }, [dispatch]);

    return (
        <header className={styles.header} data-test-id='header'>
            <Link to='/' className={styles.headerLink} data-test-id='header-logo-link'>
                <img src={logo} alt='logo' className={styles.logo} />
            </Link>
            <BurgerMenu />

            <div className={styles.block}>
                <h2 className={styles.title}>{HEADER_TITLE.library}</h2>
                <HeaderUser />
            </div>
        </header>
    );
};
