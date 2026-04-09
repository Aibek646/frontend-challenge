import { useEffect } from 'react';
import type { RootDispatch, RootState } from '../../store/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { getCats } from '../../features/cats/catsSlice.ts';

const CatsPage = () => {
    const dispatch = useDispatch<RootDispatch>();
    const { loading, data } = useSelector((state: RootState) => state.cats);

    useEffect(() => {
        if (!data || data.length === 0) {
            dispatch(getCats());
        }
    }, [dispatch, data]);

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div className="grid grid-rows-5 grid-cols-5 max-h-[900px] gap-3">
            {data?.map((cat) => (
                <img
                    className="width-[50px] object-cover"
                    key={cat.id}
                    src={cat.url}
                    alt="catImg"
                />
            ))}
        </div>
    );
};
export default CatsPage;
