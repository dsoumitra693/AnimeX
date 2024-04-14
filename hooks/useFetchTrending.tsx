import { useQuery } from 'react-query';
import { getTrendingMovies } from '@/Api';
import { ISearchMovie } from '@/types';

const useFetchTrending = () => {
  return useQuery('trendingMovies', async () => {
    const res: ISearchMovie = await getTrendingMovies();
    return res;
  });
};

export default useFetchTrending;
