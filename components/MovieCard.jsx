import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { normalize } from '../fontsNormalisation'

const MovieCard = ({ title, src, size, animeId }) => {
    const navigator = useNavigation()

    return (
        <TouchableOpacity style={styles.card(normalize(size))} onPress={() => {
            navigator.navigate('Player', {animeId: animeId, thumbnail: src})
        }}>
            <Image
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
        fontFamily: 'CooperHewitt',
        fontWeight: '700',
        color: '#fff'
    }
})