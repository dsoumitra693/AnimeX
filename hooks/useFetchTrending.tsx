import { useQuery } from 'react-query';
import { getTrendingMovies } from '@/Api';
import { ISearchMovie } from '@/types';

const useFetchTrending = () => {
  return useQuery('trendingMovies', async () => {
    const res: ISearchMovie[] = await getTrendingMovies();
    return res;
  }, {
    staleTime: 60 * 60 * 1000
  });
};

export default useFetchTrending;
