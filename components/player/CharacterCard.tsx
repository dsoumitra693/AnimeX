import { ImageStyle, StyleProp, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CachedImage from '../CachedImage'
import { ICharacter } from '@/types'
import { normalize } from '@/utils/fontNormalise';
import { DEFAULT_IMAGE } from '@/constants';

interface CharacterCardProps {
    character: ICharacter;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
    return (
        <View style={styles.wrapper}>
            <CachedImage source={{ uri: character.image || DEFAULT_IMAGE }}
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
        width: 75,
        margin: 10,
    },
    title: {
        color: "#fff",
        fontSize: normalize(14),
        textAlign: "center"
    },
    secondary:{
        color: "#aaa",
        fontSize: normalize(10),
        textAlign: "center"
    },
    image: {
        aspectRatio: 1,
        borderRadius: 45,
    },
})