import { ImageStyle, StyleProp, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CachedImage from '../CachedImage'
import { IEpisodeInfo } from '@/types'

interface EpisoideCardProps {
    episode: IEpisodeInfo;
    isPlaying:boolean;
}

const EpisoideCard = ({ episode, isPlaying }: EpisoideCardProps) => {
    return (
        <View style={styles.wrapper}>
            <CachedImage source={{ uri: episode.image }} 
            style={styles.image as StyleProp<ImageStyle>}
                resizeMode='cover' />
            <Text style={styles.title}>{episode.title}</Text>
            <View style={styles.playIndicator}/>
        </View>
    )
}

export default EpisoideCard

const styles = StyleSheet.create({
    wrapper: {
        width: 150,
        margin: 10
    },
    title: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center"

    },
    image: {
        aspectRatio:16/9,
        borderRadius: 5,
    },
    playIndicator:{
        position:"absolute",
        width:
    }
})