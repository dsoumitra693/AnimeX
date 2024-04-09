import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import MovieCard from '../MovieCard'
import { searchMoviesWithGenre } from '../../apiCall'
import { normalize } from '../../fontsNormalisation'

const FeedSection = ({ genre }) => {
    const [animes, setAnimes] = useState({})

    useEffect(() => {
        (async function () {
            let _animes = await searchMoviesWithGenre(genre.id)
            setAnimes(_animes)
        })()
    }, [])
    return (
        <View style={styles.container}>
            {!!animes?.length && <><Text style={styles.heading}>{genre.title} Movies & Series</Text>
                <FlatList
                    horizontal
                    data={animes}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <MovieCard src={item.image} title={item.title} animeId={item.id} />}
                    keyExtractor={item => item.id}
                />
            </>}
        </View>
    )
}

export default FeedSection

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    heading: {
        fontSize: normalize(20),
        letterSpacing: -0.5,
        fontWeight: '600',
        color: '#fff',
    }
})