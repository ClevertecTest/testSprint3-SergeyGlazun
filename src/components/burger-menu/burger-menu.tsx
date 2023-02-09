import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { NAV_MENU_MAIN } from '../../constants/nav-menu-list';
import { ButtonMenuBurger } from '../button-menu-burger';
import { Navigation } from '../navigation';

import styles from './burger-menu.module.scss';

export const BurgerMenu = () => {
    const [isButtonState, setButtonState] = useState(false);

    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (
                isButtonState &&
                dropDownRef.current &&
                !dropDownRef.current.contains(e.target as Node)
            ) {
                setButtonState?.(!isButtonState);

                e.preventDefault();
                e.stopPropagation();
            }
        };

        document.addEventListener('click', checkIfClickedOutside, true);

        return () => document.removeEventListener('click', checkIfClickedOutside, true);
    }, [isButtonState]);

    useEffect(() => {
        const bodyStyle = document.body.style;

        if (isButtonState) {
            bodyStyle.position = 'fixed';
        } else {
            bodyStyle.position = 'static';
            bodyStyle.overflowY = 'scroll';
        }
    });

    return (
        <div className={styles.burgerMenu}>
            <ButtonMenuBurger isButtonState={isButtonState} setButtonState={setButtonState} />
            <div
                className={classNames(
                    styles.burgerMenuNav,
                    isButtonState && styles.burgerMenuNavActive,
                )}
                ref={dropDownRef}
                data-test-id='burger-navigation'
            >
                <Navigation
                    setButtonState={setButtonState}
                    burgerMenuNavigation={true}
                    dataTestid='burger'
                >
                    <div
                        className={classNames(
                            styles.burgerMenuNavListUser,
                            isButtonState && styles.burgerMenuNavListUserTop,
                        )}
                    >
                        <hr className={styles.burgerMenuLine} />
                        <NavLink
                            to={`/${NAV_MENU_MAIN.profile.path}`}
                            onClick={() => {
                                setButtonState(false);
                            }}
                            className={({ isActive }) =>
                                isActive
                                    ? classNames(
                                          styles.burgerMenuNavLink,
                                          styles.burgerMenuNavLinkActive,
                                      )
                                    : styles.burgerMenuNavLink
                            }
                        >
                            {NAV_MENU_MAIN.profile.name}
                        </NavLink>
                        <NavLink
                            to={`/${NAV_MENU_MAIN.exit.path}`}
                            onClick={() => {
                                setButtonState(false);
                            }}
                            className={({ isActive }) =>
                                isActive
                                    ? classNames(
                                          styles.burgerMenuNavLink,
                                          styles.burgerMenuNavLinkActive,
                                      )
                                    : styles.burgerMenuNavLink
                            }
                        >
                            {NAV_MENU_MAIN.exit.name}
                        </NavLink>
                    </div>
                </Navigation>
            </div>
        </div>
    );
};
