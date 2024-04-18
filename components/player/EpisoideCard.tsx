import { ImageStyle, StyleProp, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CachedImage from '../CachedImage'
import { IEpisodeInfo } from '@/types'
import LottieView from 'lottie-react-native';

interface EpisoideCardProps {
    episode: IEpisodeInfo;
    isPlaying: boolean;
}

const EpisoideCard = ({ episode, isPlaying }: EpisoideCardProps) => {
    return (
        <View style={styles.wrapper}>
            <CachedImage source={{ uri: episode.image }}
                style={styles.image as StyleProp<ImageStyle>}
                resizeMode='cover' />
            <Text style={styles.title}>{episode.title || `EP${episode.number}`}</Text>
            {isPlaying && <View style={styles.playIndicator} >
                <Text style={{ ...styles.title, fontSize: 14 }}>Now Playing</Text>
                <LottieView
                    autoPlay
                    style={{
                        aspectRatio: 1,
                        height: 26,
                    }}
                    colorFilters={[
                        {
                            keypath: "Shape Layer 3",
                            color: "#fff",
                        },
                        {
                            keypath: "Shape Layer 2",
                            color: "#fff",
                        },
                        {
                            keypath: "Shape Layer 1",
                            color: "#fff",
                        },
                    ]}
                    source={require("@/assets/animations/playing.json")}
                />
            </View>}
        </View>
    )
}

export default EpisoideCard

const styles = StyleSheet.create({
    wrapper: {
        width: 150,
        margin: 10,
    },
    title: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center"
    },
    image: {
        aspectRatio: 16 / 9,
        borderRadius: 5,
    },
    playIndicator: {
        position: "absolute",
        width: "100%",
        aspectRatio: 16 / 9,
        zIndex: 10,
        backgroundColor: "rgba(0,0,0, 0.6)",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    }
})