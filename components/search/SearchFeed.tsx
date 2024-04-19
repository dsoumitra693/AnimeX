import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { searchMovie } from '@/Api';
import { FlashList } from '@shopify/flash-list';
import MovieCard from '../MovieCard';
import { ISearchMovie } from "@/types"
import { normalize } from '@/utils/fontNormalise';


interface SearchFeedProps {
    searchText: string;
}
const SearchFeed = ({ searchText }: SearchFeedProps) => {
    const [amines, setAmines] = useState();
    const searchTimeout = useRef(null);

    useEffect(() => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        searchTimeout.current = setTimeout(async () => {
            const _amines = await searchMovie(searchText);
            console.log(_amines)
            setAmines(_amines);
        }, 800); // Delay the API call by 500 milliseconds

        return () => clearTimeout(searchTimeout.current); // Cleanup on unmount
    }, [searchText]);
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Results For {searchText} </Text>
            <View style={{ flex: 1 }}>
                <FlashList<ISearchMovie>
                    estimatedItemSize={300}
                    renderItem={({ item }) => (
                        <MovieCard
                            movie={item}
                            key={item.id} />
                    )}
                    keyExtractor={(item) => {
                        return item.id
                    }}
                    data={amines}
                    numColumns={2}

                />
            </View>
        </View>
    )
}

export default SearchFeed

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 10,
        width: "100%",

    },
    title: {
        color: "#fff",
        fontSize: normalize(20),
    },
})