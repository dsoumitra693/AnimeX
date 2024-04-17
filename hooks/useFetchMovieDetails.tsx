import { getMovieInfo } from '@/Api';
import { IMovieInfo } from '@/types';
import { useQuery } from 'react-query';

const useFetchMovieDetails = (movieId: string) => {
    return useQuery(`info-${movieId}`, async () => {
        const res: IMovieInfo = await getMovieInfo(movieId);
        return res;
    });
}

export default useFetchMovieDetails