import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { normalize } from '../fontsNormalisation'
import CachedImage from './CachedImage'

const MovieCard = ({ title, src, size, animeId }) => {
    const navigator = useNavigation()
    return (
        <TouchableOpacity style={styles.card(normalize(size))} onPress={() => {
            navigator.navigate('Player', { animeId: animeId, thumbnail: src })
        }}>
            <CachedImage
                source={{ uri: src }}
                style={styles.image}
                resizeMethod='resize'
            />
            <View style={styles.textWrapper}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MovieCard

const styles = StyleSheet.create({
    card: (size) => ({
        width: size || 130,
        overflow: 'hidden',
        height: size ? 250 : 230,
        marginTop: size ? 0 : 10,
        marginRight: 10,
    }),
    image: {
        height: '80%',
        borderRadius: 5,
    },
    textWrapper: {
        paddingVertical: 5,
    },
    text: {
        fontSize: normalize(13),
        fontWeight: '700',
        color: '#fff'
    }
})