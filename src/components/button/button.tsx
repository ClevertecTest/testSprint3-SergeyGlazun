import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

type ButtonProps = {
    isDisabled?: boolean;
    classButton: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: ReactNode;
    dataTestId?: string;
};

export const Button = ({
    isDisabled = false,
    classButton,
    onClick,
    children,
    dataTestId,
}: ButtonProps) => (
    <button
        type='button'
        className={classNames(classButton, isDisabled && styles.button)}
        onClick={onClick}
        disabled={isDisabled}
        data-test-id={dataTestId}
    >
        {children}
    </button>
);
