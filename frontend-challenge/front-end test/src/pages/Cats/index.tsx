import { useEffect } from 'react';
import type { RootDispatch, RootState } from '../../store/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { getCats } from '../../features/cats/catsSlice.ts';
import { toggleFavorite } from '../../features/favoriteCats/favoriteCatsSlice.ts';
import InfiniteScroll from 'react-infinite-scroll-component';

const CatsPage = () => {
    const dispatch = useDispatch<RootDispatch>();
    const { loading, data, page, hasMore } = useSelector(
        (state: RootState) => state.cats
    );
    const favoriteCats = useSelector(
        (state: RootState) => state.favorites.items
    );

    useEffect(() => {
        if (!data || data.length === 0) {
            dispatch(getCats(0));
        }
    }, []);

    return (
        <InfiniteScroll
            next={() => dispatch(getCats(page))}
            hasMore={hasMore}
            loader={
                <p className="text-center py-4 text-gray-500">Loading...</p>
            }
            endMessage={
                <p className="text-center py-4 text-gray-400">
                    No more cats 🐱
                </p>
            }
            dataLength={data.length}
        >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
                {data?.map((cat) => {
                    const isFav = favoriteCats.some((f) => f.id === cat.id);

                    return (
                        <div
                            key={cat.id}
                            className="relative cursor-pointer break-inside-avoid aspect-square overflow-hidden rounded-lg"
                        >
                            <img
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                                src={cat.url}
                                alt="catImg"
                            />
                            <button
                                onClick={() => dispatch(toggleFavorite(cat))}
                                className="absolute cursor-pointer top-2 right-2 text-xl"
                            >
                                {isFav ? '❤️' : '🤍'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </InfiniteScroll>
    );
};
export default CatsPage;
