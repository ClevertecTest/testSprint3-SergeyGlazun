import { HOST } from '../../constants/api';
import { Rating } from '../rating';

import avatarImg from './assets/avatar.jpg';

import styles from './comment.module.scss';

type CommentProps = {
    avatar?: string;
    name: string;
    date: string;
    rating: number;
    text?: string;
};

export const Comment = ({ avatar = avatarImg, name, date, rating, text }: CommentProps) => (
    <div className={styles.comment}>
        <div className={styles.commentBlock}>
            <img
                src={avatar ? `${HOST}${avatar}` : avatarImg}
                alt='Аватар'
                className={styles.avatar}
            />
            <span className={styles.name}>{name}</span>
            <span className={styles.date}>{date}</span>
        </div>
        <div className={styles.commentRating}>
            <Rating rating={rating} />
        </div>
        <span className={styles.commentText}>{text}</span>
    </div>
);
