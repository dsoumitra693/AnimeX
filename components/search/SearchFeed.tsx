import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { searchMovie } from '@/Api';
import { FlashList } from '@shopify/flash-list';
import MovieCard from '../MovieCard';
import { ISearchMovie } from "@/types"
import { normalize } from '@/utils/fontNormalise';
import { FontAwesome } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';


interface SearchFeedProps {
    searchText: string;
}
const SearchFeed = ({ searchText }: SearchFeedProps) => {
    const [animes, setAnimes] = useState<ISearchMovie[]>();
    const [isLoading, setIsLoading] = useState(false)
    const searchTimeout = useRef(null);

    useEffect(() => {
        if (!!searchText) {
            setIsLoading(true)
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
            searchTimeout.current = setTimeout(async () => {
                const _animes = await searchMovie(searchText);
                setAnimes(_animes);
                setIsLoading(false)
            }, 500); // Delay the API call by 500 milliseconds 
        }
        return () => clearTimeout(searchTimeout.current); // Cleanup on unmount
    }, [searchText]);

    if (isLoading)
        return (
            <View style={styles.wrapper}>
                <LottieView
                    autoPlay
                    source={require("@/assets/animations/searching.json")}
                />
                <Text style={styles.secondary}>Searching For {searchText} </Text>
            </View>
        )

    if (searchText && !animes?.length)
        return (
            <View style={styles.wrapper}>
                <Text style={styles.secondary}>No Results For {searchText} </Text>
            </View>
        )

    if (searchText && !!animes?.length && !isLoading)
        return (
            <View style={{...styles.wrapper, alignItems:"stretch"}}>
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
                        data={animes}
                        numColumns={2}

                    />
                </View>
            </View>
        )
    return (
        <View style={styles.wrapper}>
            <FontAwesome name="search" size={200} color={"#888"} />
            <Text style={styles.secondary}>Search for your favorite anime movies and shows</Text>
        </View>)
}

export default SearchFeed

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#ff0"
    },
    title: {
        color: "#fff",
        fontSize: normalize(20),
    },
    secondary: {
        fontSize: normalize(20),
        fontWeight: "400",
        color: "#888"
    }
})