import Player from '@/components/player/Player';
import VideoDetails from '@/components/player/VideoDetails';
import { PlayerProvider } from '@/components/providers';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function Page() {
    const { movieId } = useLocalSearchParams();
    return (
        <PlayerProvider>
            <View style={{ flex: 1, backgroundColor: '#000', }}>
                <Player thumbnail={{ uri: "https://artworks.thetvdb.com/banners/fanart/original/5bfce9ad47941.jpg" }} />
                <VideoDetails movieId={movieId as string} />
            </View>
        </PlayerProvider>
    )
}