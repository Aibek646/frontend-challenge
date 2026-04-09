import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import type { FC } from 'react';
import Cats from './pages/Cats';
import FavoriteCats from './pages/FavoriteCats';

const App: FC = () => (
    <BrowserRouter>
        <nav className="navigation">
            <Link className="cursor-pointer" to="/">
                Cats
            </Link>
            <Link className="cursor-pointer" to="/favorite-cats">
                Favorite Cats
            </Link>
        </nav>
        <Routes>
            <Route element={<Cats />} path="/" />
            <Route element={<FavoriteCats />} path="/favorite-cats" />
        </Routes>
    </BrowserRouter>
);

export default App;
