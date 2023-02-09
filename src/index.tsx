import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout';
import { LayoutMainPage } from './components/layout-main-page';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { ProfilePage } from './pages/profile';
import { Terms } from './pages/terms';
import { reportWebVitals } from './report-web-vitals';
import { store } from './store';

import './index.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <HashRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route element={<LayoutMainPage />}>
                        <Route path='/' element={<Navigate to='/books/all' />} />
                        <Route path='/books/:category' element={<MainPage />} />
                        <Route path='/terms' element={<Terms contentView='terms' />} />
                        <Route path='/contract' element={<Terms contentView='contract' />} />
                    </Route>
                    <Route path='/books/:category/:bookId' element={<BookPage />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/auth' element={<div>Авторизация</div>} />
                </Route>
            </Routes>
        </HashRouter>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
