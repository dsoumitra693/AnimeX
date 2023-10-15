import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MovieCard from '../MovieCard'

const VideosList = ({ heading, data }) => {
    if (data != undefined && data?.length != 0) return (
        <View style={styles.container}>
            <Text style={styles.heading}>{heading}</Text>
            <FlatList
                data={data}
                horizontal={true}
                renderItem={({ item }) =>
                    <MovieCard
                        size={150}
                        animeId={item.animeId}
                        title={item.name}
                        src={item.imgUrl} />
                }

            />
        </View>
    )
    return <></>
}


export default VideosList

const styles = StyleSheet.create({
    container: {
        minWidth: '100%',
        height: 280,
        marginTop: 10,
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    heading: {
        marginBottom: 10,
        fontSize: 20,
        fontFamily: 'CooperHewitt'
    }
})