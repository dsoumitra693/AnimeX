import { StyleSheet, Text, FlatList, Keyboard, View, } from 'react-native'
import React from 'react'
import MovieCard from '../MovieCard'
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { normalize } from '../../fontsNormalisation';


const SearchFeed = ({ data, searchText }) => {
    const dismissKeyboard = () => Keyboard.dismiss()

    if (!!data?.length && searchText) return (
        <View style={styles.searchFeed}>
            <Text style={styles.heading}>Showing search result '{searchText}'</Text>
            <FlatList
                data={data}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>
                    <MovieCard src={item.image} title={item.title} size={160} animeId={item.id} />}
                onScroll={dismissKeyboard}
                numColumns={2}
                key={2}
                keyExtractor={item => item.id}
            />
        </View>
    )
    if (!data?.length && searchText) return (
        <View style={{ ...styles.searchFeed, }}>
            <Text style={styles.heading}>NO RESULT</Text>
            <LottieView
                autoPlay
                // ref={animation}
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: '#222',
                }}
                source={require('../../assets/animations/no-search-results.json')}
            />
            <Text
                style={{
                    ...styles.heading,
                    fontSize: normalize(16),
                    textAlign: 'center',
                    width: 250,
                    color: '#888',
                    borderTopWidth: 0,
                }}
            >Search for your favourite anime movies by name, catagory, geners</Text>
        </View>
    )
    return (
        <View style={{ ...styles.searchFeed, }}>
            <Text style={styles.heading}>SEARCH HERE ...</Text>
            <Feather name='search' size={80} color={'#888'} />
            <Text
                style={{
                    ...styles.heading,
                    fontSize: normalize(16),
                    textAlign: 'center',
                    width: 250,
                    color: '#888',
                    borderTopWidth: 0,
                }}
            >Search for your favourite anime movies by name, catagory, geners</Text>
        </View>
    )

}

export default SearchFeed

const styles = StyleSheet.create({
    heading: {
        width: '100%',
        top: 15,
        color: '#fff',
        paddingVertical: 20,
        fontSize: normalize(20),
        borderColor: '#FE9F01',
        borderTopWidth: 2,
    },
    searchFeed: {
        width: '100%',
        position: 'relative',
        top: 40,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 50
    }
})