import { useAppDispatch } from '../../store/hooks';
import { deleteToast } from '../../store/view';

import { ReactComponent as Icon } from './assets/alert_icon.svg';

import styles from './toast.module.scss';

export const Toast = ({ text }: { text: string }) => {
    const dispatch = useAppDispatch();

    return (
        <div className={styles.wrapper} data-test-id='error'>
            <Icon className={styles.icon} />
            <p className={styles.text}>{text}</p>
            <button type='button' onClick={() => dispatch(deleteToast(text))}>
                закрыть
            </button>
        </div>
    );
};
