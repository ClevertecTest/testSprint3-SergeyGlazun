import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import SwiperCore, { FreeMode, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '../../components/button';
import { Comment } from '../../components/comment';
import { Loader } from '../../components/loader';
import { Rating } from '../../components/rating';
import { formatDate } from '../../components/utils/date-utils';
import { HOST } from '../../constants/api';
import { BUTTON_TEXT } from '../../constants/button';
import { ERROR } from '../../constants/errors';
import { FEATURE_KEY } from '../../constants/feature';
import { NAV_MENU_ALL, NAV_MENU_MAIN } from '../../constants/nav-menu-list';
import { USER } from '../../constants/user';
import { bookRequest, resetBookData } from '../../store/books';
import {
    getBookCategories,
    getBookData,
    getBookDetails,
    getLoadingBook,
} from '../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteToast } from '../../store/view';

import arrowBottomBlack from './assets/arrow-bottom-black.svg';
import IconPlugImg from './assets/icon-plug-img.svg';

import './swiper-book.css';
import styles from './book-page.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

// eslint-disable-next-line complexity
export const BookPage = () => {
    const dispatch = useAppDispatch();
    const { category } = useParams();
    const { bookId } = useParams();
    const bookData = useAppSelector(getBookData);
    const bookDetails = useAppSelector(getBookDetails);
    const bookCategories = useAppSelector(getBookCategories);
    const isLoading = useAppSelector(getLoadingBook);

    const [isCommentHide, setCommentHide] = useState(true);

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

    SwiperCore.use([Pagination]);

    const status = bookData?.booking ? 'reserved' : 'free';
    const userIdReserved = bookData?.booking?.id;

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

    const deleteTost = () => {
        dispatch(deleteToast(ERROR.book));
    };

    useEffect(() => {
        if (bookId) {
            dispatch(bookRequest(bookId));
        }

        return () => {
            dispatch(resetBookData());
        };
    }, [bookId, dispatch]);

    return (
        <div className={styles.bookPage}>
            <div className={styles.breadcrumbs}>
                <div className={styles.breadcrumbsBlock}>
                    <span className={styles.breadcrumbsTitle}>
                        <Link
                            to={`/${NAV_MENU_MAIN.books.path}/${category}`}
                            className={styles.breadcrumbsLink}
                            data-test-id='breadcrumbs-link'
                            onClick={deleteTost}
                        >
                            {category === NAV_MENU_ALL.category
                                ? NAV_MENU_ALL.name
                                : bookCategories?.map(
                                      (menuList) => menuList.path === category && menuList.name,
                                  )}
                        </Link>
                        <span className={styles.breadcrumbsSeparator}>/</span>
                        {bookData?.title}
                    </span>
                </div>
            </div>
            {isLoading && <Loader />}
            {bookData && (
                <React.Fragment>
                    <div className={styles.bookDescription}>
                        <div className={styles.bookImgBlock}>
                            {bookData?.images ? (
                                <Swiper
                                    loop={bookData.images.length > 1 && true}
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    thumbs={{
                                        swiper:
                                            thumbsSwiper && !thumbsSwiper.destroyed
                                                ? thumbsSwiper
                                                : null,
                                    }}
                                    modules={[FreeMode, Thumbs, Pagination]}
                                    className={styles.swiperSlide}
                                    breakpoints={{
                                        800: {
                                            pagination: false,
                                        },
                                    }}
                                    data-test-id='slide-big'
                                >
                                    {bookData?.images.map(({ url }) => (
                                        <SwiperSlide key={url.toString()}>
                                            <img
                                                src={`${HOST}${url}`}
                                                className={styles.swiperSlideImg}
                                                alt='img'
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <img src={IconPlugImg} className={styles.swiperImgNone} alt='img' />
                            )}

                            {bookData?.images?.length > 1 && (
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    spaceBetween={10}
                                    slidesPerView={
                                        bookData.images.length <= 3 ? bookData.images.length : 4
                                    }
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Thumbs]}
                                    className={styles.swiperSlideSmall}
                                    breakpoints={{
                                        900: {
                                            slidesPerView: 4,
                                        },
                                    }}
                                >
                                    {bookData.images?.map(({ url }) => (
                                        <SwiperSlide key={url.toString()} data-test-id='slide-mini'>
                                            <img
                                                src={`${HOST}${url}`}
                                                className={styles.swiperSlideSmallImg}
                                                alt='img'
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                        <p className={styles.bookName}>{bookData?.title}</p>
                        <span className={styles.bookAuthor}>
                            {`${bookData?.authors}, ${bookData?.issueYear}`}
                        </span>
                        <div className={styles.bookButton}>
                            <Button classButton={classButtonReserve} onClick={() => {}}>
                                <span>{buttonTextReserve}</span>
                                {bookData?.booking?.dateOrder && buttonTextReserve === ''
                                    ? `Занята до ${formatDate(bookData?.booking?.dateOrder)}`
                                    : null}
                            </Button>
                        </div>
                        <span className={styles.subTitle}>О книге</span>
                        <span className={styles.description}>{bookData?.description}</span>
                    </div>

                    <div className={styles.ratingBlock}>
                        <span className={styles.ratingTitle}>Рейтинг</span>
                        <hr className={styles.line} />

                        {bookData?.rating ? (
                            <div className={styles.rating}>
                                <Rating rating={bookData?.rating} />
                                <span className={styles.ratingText}>{bookData?.rating}</span>
                            </div>
                        ) : (
                            <div className={styles.rating}>
                                <Rating rating={0} />
                                <span className={styles.noRatingText}>ещё нет оценок</span>
                            </div>
                        )}
                    </div>

                    <span className={styles.detailsTitle}>Подробная информация</span>
                    <hr className={styles.line} />
                    <div className={styles.details}>
                        {Object.values(bookDetails).map((value, index) => (
                            <div
                                className={styles.feature}
                                key={value ? value.toString() : index.toString()}
                            >
                                <span className={styles.featureKey}>{FEATURE_KEY[index]}</span>
                                <span className={styles.featureValue}>
                                    {value && typeof value === 'object' && value.length > 1
                                        ? value.join(', ')
                                        : value}
                                    {!value && 'Нет данных'}
                                </span>
                            </div>
                        ))}
                    </div>

                    <span className={styles.reviewsTitle}>
                        Отзывы
                        <span className={styles.reviewsLength}>{bookData?.comments?.length}</span>
                        {bookData?.comments && (
                            <Button
                                classButton={classNames(
                                    styles.buttonComment,
                                    !isCommentHide && styles.buttonCommentHide,
                                )}
                                onClick={() => {
                                    setCommentHide(!isCommentHide);
                                }}
                                dataTestId='button-hide-reviews'
                            >
                                <img
                                    src={arrowBottomBlack}
                                    alt='icon-arrow'
                                    className={classNames(
                                        styles.buttonImgComment,
                                        isCommentHide === false && styles.buttonImgCommentHide,
                                    )}
                                />
                            </Button>
                        )}
                    </span>
                    <hr className={styles.line} />

                    <div className={styles.reviews} data-test-id='reviews'>
                        {bookData.comments?.length > 0 &&
                            isCommentHide &&
                            bookData?.comments?.map(({ user, createdAt, rating, text }) => (
                                <Comment
                                    avatar={user.avatarUrl}
                                    name={`${user.firstName} ${user.lastName}`}
                                    date={createdAt}
                                    rating={rating}
                                    text={text}
                                    key={`${user.firstName} ${user.lastName}`}
                                />
                            ))}
                        <Button
                            classButton={styles.buttonReview}
                            dataTestId='button-rating'
                            onClick={() => {}}
                        >
                            <span>Оценить книгу</span>
                        </Button>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};
