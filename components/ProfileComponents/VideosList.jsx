import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MovieCard from '../MovieCard'

const VideosList = ({ heading, data }) => {
    return (
        <FlatList
            style={styles.container}
            data={data}
            ListHeaderComponent={<Text style={styles.heading}>{heading}</Text>}
            renderItem={({ item }) =>
                <MovieCard
                    size={150}
                    animeId={item.animeId}
                    title={item.name}
                    src={item.imgUrl} />
            }
        />
    )
}


export default VideosList

const styles = StyleSheet.create({
    container: {
        minWidth: '100%',
        height: 100,
        backgroundColor: 'red',
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
})