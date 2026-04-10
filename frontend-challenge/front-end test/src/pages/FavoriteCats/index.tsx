import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import { toggleFavorite } from '../../features/favoriteCats/favoriteCatsSlice.ts';

const FavoriteCats = () => {
    const dispatch = useDispatch();
    const favoriteCats = useSelector(
        (state: RootState) => state.favorites.items
    );

    if (favoriteCats.length === 0) {
        return <p>No Cats 😢</p>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
            {favoriteCats.map((cat) => (
                <div className="relative aspect-square overflow-hidden rounded-lg">
                    <img
                        key={cat.id}
                        src={cat.url}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                    />
                    <button
                        onClick={() => dispatch(toggleFavorite(cat))}
                        className="absolute cursor-pointer top-2 right-2 text-xl"
                    >
                        ❤️
                    </button>
                </div>
            ))}
        </div>
    );
};
export default FavoriteCats;
