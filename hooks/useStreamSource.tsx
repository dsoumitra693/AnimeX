import { getStreamUrls } from '@/Api';
import { IStreamUrls } from '@/types';
import { useQuery } from 'react-query';

const useStreamSource = (episodeId:string) => {
    return useQuery(`url-${episodeId}`, async () => {
        const res: IStreamUrls = await getStreamUrls(episodeId);
        return res;
      }, {
        staleTime: 60 * 60 * 1000
      });
}

export default useStreamSource
