import { StyleSheet, Text, View, Dimensions, FlatList, } from "react-native";
import React, { useEffect } from "react";
import MovieCard from "../MovieCard";
import { FlashList } from "@shopify/flash-list";
import { normalize } from "@/utils/fontNormalise";
import { useFetchGenre } from "@/hooks";
import { ISearchMovie } from "@/types";

const { width } = Dimensions.get("window")

interface FeedSectionProps {
    genre: {
        title: string;
        id: string;
    }
}
const FeedSection = ({ genre }: FeedSectionProps) => {
    let { data: animes, isLoading, isError } = useFetchGenre(genre.id)

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{genre.title} movies & series</Text>
            {!isLoading && <FlatList<ISearchMovie>
                estimatedItemSize={170}
                renderItem={({ item }) => {
                    return <MovieCard movie={item} />
                }}
                data={animes}
                horizontal
            />}
        </View>
    );
};

export default FeedSection;

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        width: width,
        // paddingBottom:30,
    },
    heading: {
        fontSize: normalize(20),
        letterSpacing: -0.5,
        fontWeight: "600",
        color: "#fff",
        paddingLeft: 10
    },
});
