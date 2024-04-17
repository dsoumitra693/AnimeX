import { getStreamUrls } from '@/Api';
import { IStreamUrls } from '@/types';
import { useQuery } from 'react-query';

const useStreamSource = (episodeId = "") => {
  return useQuery(`url-${episodeId}`, async () => {
    const res: IStreamUrls = await getStreamUrls(episodeId);
    return res;
  }, {
    staleTime: 60 * 60 * 1000,
    retry: true
  });
}

export default useStreamSource
