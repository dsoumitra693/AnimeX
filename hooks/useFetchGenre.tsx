import { useQuery } from 'react-query';
import { searchMoviesWithGenre } from '@/Api';
import { ISearchMovie } from '@/types';

const useFetchGenre = (genre: string) => {
    return useQuery(`genre-${genre}`, async () => {
        const res: ISearchMovie = await searchMoviesWithGenre(genre);
        return res;
    }, {
        staleTime: 60 * 60 * 1000
    });
};

export default useFetchGenre;