import { getStreamUrls } from '@/Api';
import { IStreamUrls } from '@/types';
import { useQuery } from 'react-query';

const useStreamSource = (episodeId:string) => {
    return useQuery('streamUrl', async () => {
        const res: IStreamUrls = await getStreamUrls(episodeId);
        return res;
      });
}

export default useStreamSource
