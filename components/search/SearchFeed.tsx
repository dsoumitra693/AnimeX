import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { searchMovie } from '@/Api';
import { FlashList } from '@shopify/flash-list';
import MovieCard from '../MovieCard';
import { ISearchMovie } from "@/types"
import { normalize } from '@/utils/fontNormalise';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
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
                    style={{
                        height: 200,
                        aspectRatio: 1,
                    }}
                    colorFilters={[
                        {
                            keypath: "hover-spin",
                            color: "#888",
                        },
                    ]}
                    source={require("@/assets/animations/searching.json")}
                />
                <Text style={styles.secondary}>Searching For {searchText} </Text>
            </View>
        )

    if (searchText && !animes?.length)
        return (
            <View style={styles.wrapper}>
                <LottieView
                    autoPlay
                    loop={false}
                    style={{
                        height: 200,
                        aspectRatio: 1,
                    }}
                    colorFilters={[
                        {
                            keypath: "hover-enlarge",
                            color: "#888",
                        },
                    ]}
                    source={require("@/assets/animations/error.json")}
                />
                <Text style={styles.secondary}>No Results For {searchText} </Text>
            </View>
        )

    if (searchText && !!animes?.length && !isLoading)
        return (
            <View style={{ ...styles.wrapper, alignItems: "stretch" }}>
                <Text style={styles.title}>Results For {searchText} </Text>
                <View style={{ flex: 1 }}>
                    <FlashList<ISearchMovie>
                        estimatedItemSize={300}
                        renderItem={({ item }) => (
                            <MovieCard
                                size={100}
                                movie={item}
                                key={item.id} />
                        )}
                        keyExtractor={(item) => {
                            return item.id
                        }}
                        data={animes}
                        numColumns={3}

                    />
                </View>
            </View>
        )
    return (
        <View style={styles.wrapper}>
            <Ionicons name="search-outline" size={200} color={"#888"} />
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
    },
    title: {
        color: "#fff",
        fontSize: normalize(20),
    },
    secondary: {
        fontSize: normalize(20),
        fontWeight: "400",
        color: "#888",
        textAlign: "center"

    }
})