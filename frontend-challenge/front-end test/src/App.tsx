import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cats from './pages/Cats';
import FavoriteCats from './pages/FavoriteCats';
import Navbar from './components/Navbar.tsx';

const App: FC = () => (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route element={<Cats />} path="/" />
            <Route element={<FavoriteCats />} path="/favorite-cats" />
        </Routes>
    </BrowserRouter>
);

export default App;
