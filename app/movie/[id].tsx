import Player from '@/components/player/Player';
import VideoDetails from '@/components/player/VideoDetails';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function Page() {
    const { id } = useLocalSearchParams();
    return (
        <View style={{ flex: 1, backgroundColor: '#000', }}>
            <Player videoUrl='https://www038.vipanicdn.net/streamhls/fdcad23e1c5207b2bf688e8a6823e122/ep.1.1709242484.720.m3u8'
                thumbnail={{ uri: "https://artworks.thetvdb.com/banners/fanart/original/5bfce9ad47941.jpg" }} />
            <VideoDetails />
        </View>
    )
}