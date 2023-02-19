import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { HOST } from '../../constants/api';
import { BUTTON_TEXT } from '../../constants/button';
import { MenuViewEnum } from '../../constants/menu-view';
import { NAV_MENU_ALL, NAV_MENU_MAIN } from '../../constants/nav-menu-list';
import { USER } from '../../constants/user';
import { BookListItem } from '../../store/books/types';
import { Button } from '../button';
import { Rating } from '../rating';
import { formatDate } from '../utils/date-utils';

import IconPlugImg from './assets/icon-plug-img.svg';

import styles from './card.module.scss';

type BookType = {
    data: BookListItem;
    menuView?: string;
};

export const Card = (props: BookType) => {
    const {
        data: { rating, title, authors, id, issueYear, image, booking },
        menuView,
    } = props;
    const navigate = useNavigate();

    const { category } = useParams();

    const status = booking ? 'reserved' : 'free';
    const userIdReserved = booking?.customerId;

    const classNameCard = (name: string) =>
        classNames(
            menuView === MenuViewEnum.window ? styles[`${name}Window`] : styles[`${name}List`],
        );

    const buttonTextReserve =
        status === 'free'
            ? BUTTON_TEXT.RESERVE
            : status === 'reserved' && userIdReserved === USER.contract
            ? BUTTON_TEXT.RESERVED
            : BUTTON_TEXT.BUSY;

    const classButtonReserve = classNames(
        styles.button,
        buttonTextReserve === BUTTON_TEXT.RESERVE ? styles.buttonReserve : styles.buttonReserved,
    );

    const linkPath = category
        ? `/${NAV_MENU_MAIN.books.path}/${category}/${id}`
        : `/${NAV_MENU_MAIN.books.path}/${NAV_MENU_ALL.category}/${id}`;

    return (
        <Link to={linkPath} key={id}>
            <li className={classNameCard('card')} data-test-id='card'>
                <div className={classNameCard('cardImg')}>
                    <img src={image?.url ? `${HOST}${image?.url}` : IconPlugImg} alt={title} />
                </div>
                <div className={classNameCard('rating')}>
                    {rating || rating === 0 ? (
                        <Rating rating={rating} classNameStar={styles.star} />
                    ) : (
                        <span className={styles.textNoRaring}>Ещё нет оценок</span>
                    )}
                </div>
                <div className={classNameCard('titleBlock')}>
                    <p className={classNameCard('cardTitle')}>{title}</p>
                </div>
                <span className={classNameCard('cardAuthor')}>
                    {authors && authors.length > 0 && authors.join(', ')}, {issueYear}
                </span>
                <div className={classNameCard('cardButton')}>
                    <Button
                        classButton={classButtonReserve}
                        onClick={() => {
                            navigate('/');
                        }}
                        isDisabled={status === 'reserved' && userIdReserved !== USER.contract}
                    >
                        <span>{buttonTextReserve}</span>
                        {booking && buttonTextReserve === ''
                            ? `Занята до ${formatDate(booking?.dateOrder)}`
                            : null}
                    </Button>
                </div>
            </li>
        </Link>
    );
};
