import { useQuery } from 'react-query';
import { searchMoviesWithGenre } from '@/Api';
import { IMovieInfo, ISearchMovie } from '@/types';

const useFetchGenre = (genre: string) => {
    return useQuery(`genre-${genre}`, async () => {
        const res: ISearchMovie = await searchMoviesWithGenre(genre);
        return res;
    });
};

export default useFetchGenre;