import { ImageStyle, StyleProp, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CachedImage from '../CachedImage'
import { ICharacter } from '@/types'

interface CharacterCardProps {
    character: ICharacter;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
    return (
        <View style={styles.wrapper}>
            <CachedImage source={{ uri: character.image }}
                style={styles.image as StyleProp<ImageStyle>}
                resizeMode='cover' />
            <Text style={styles.title}>{character.name.first}</Text>
            <Text style={styles.secondary}>{character.name.native}</Text>
        </View>
    )
}

export default CharacterCard

const styles = StyleSheet.create({
    wrapper: {
        width: 90,
        margin: 10,
    },
    title: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center"
    },
    secondary:{
        color: "#aaa",
        fontSize: 12,
        textAlign: "center"
    },
    image: {
        aspectRatio: 1,
        borderRadius: 45,
    },
})