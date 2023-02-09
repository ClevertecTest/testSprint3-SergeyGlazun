import { USER } from '../../constants/user';

import styles from './header-user.module.scss';

export const HeaderUser = () => (
    <div className={styles.headerUser}>
        <span className={styles.userName}>{`Привет, ${USER.name}!`}</span>
        <span className={styles.userContract}>Договор {USER.contract}</span>
        <div className={styles.userImg}>
            <img src={USER.img} alt='user-img' className={styles.img} />
        </div>
    </div>
);
