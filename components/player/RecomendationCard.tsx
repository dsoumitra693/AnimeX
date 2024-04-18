import { ImageStyle, StyleProp, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CachedImage from '../CachedImage'
import { IMovieRecomendtaion } from '@/types'

interface RecomendationCardProps {
    movie: IMovieRecomendtaion;
    color: string
}

const RecomendationCard = ({ movie, color }: RecomendationCardProps) => {
    return (
        <View style={styles.wrapper}>
            <CachedImage source={{ uri: movie.cover }}
                style={styles.image as StyleProp<ImageStyle>}
                resizeMode='cover' />
            <View style={styles.info}>
                <Text style={{ ...styles.secondary, color: "#eee" }}>{movie.type}</Text>
            </View>
            <Text style={styles.title}>{movie.title.english}</Text>
            <Text style={styles.secondary}>{movie.title.native}</Text>
        </View>
    )
}

export default RecomendationCard

const styles = StyleSheet.create({
    wrapper: {
        width: 200,
        margin: 10,
        height: 150,
    },
    title: {
        color: "#fff",
        fontSize: 16,
        textAlign: "justify",
    },
    info: {
        position: "absolute",
        backgroundColor: "#000",
        padding: 5,
        minWidth: 40,
        alignItems: "center",
        borderRadius: 5,
        top: 6,
        right: 10,
    },
    secondary: {
        color: "#aaa",
        fontSize: 12,
        textAlign: "left"
    },
    image: {
        width: "100%",
        height: "100%"
    },
})