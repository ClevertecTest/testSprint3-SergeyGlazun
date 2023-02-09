import classNames from 'classnames';

import { Button } from '../button';

import iconClose from './assets/icon-close.svg';
import iconSearch from './assets/icon-search.svg';

import styles from './search.module.scss';

type SearchProps = {
    isSearhView: boolean;
    setSearhView: (onChangeText: boolean) => void;
};

export const Search = ({ isSearhView, setSearhView }: SearchProps) => (
    <div className={styles.search}>
        <Button
            classButton={classNames(styles.searchButton, !isSearhView && styles.buttonHidden)}
            onClick={() => setSearhView(!isSearhView)}
            dataTestId='button-search-open'
        >
            <img src={iconSearch} alt='icon-search' />
        </Button>
        <input
            className={classNames(styles.input, !isSearhView && styles.buttonShow)}
            placeholder='Поиск книги или автора…'
            data-test-id='input-search'
        />
        <Button
            classButton={classNames(styles.searchButtonClose, isSearhView && styles.buttonHidden)}
            onClick={() => setSearhView(!isSearhView)}
            dataTestId='button-search-close'
        >
            <img src={iconClose} alt='icon-close' />
        </Button>
    </div>
);
