import { StyleSheet, Text, View, TouchableOpacity, StyleProp, ImageStyle } from "react-native";
import React from "react";
import CachedImage from "./CachedImage";
import { normalize } from "@/utils/fontNormalise";
import {  ISearchMovie } from "@/types";
import { useRouter } from "expo-router";


interface MovieCardProps {
    movie: ISearchMovie;
    size?: number;
}



const MovieCard = ({ movie, size }: MovieCardProps) => {
    const { image, title, color, releaseDate, id } = movie;
    const router = useRouter()
    const playMovie = ()=>{
        router.push(`/movie/${id}`)
    }
    return (
        <TouchableOpacity
            style={{
                ...styles.card, width: size || 130,
                height: size ? 220 : 200,
                marginTop: size ? 0 : 10,
            }}
            onPress={playMovie}
        >
            <CachedImage
                source={{ uri: image }}
                style={styles.image as StyleProp<ImageStyle>}
                resizeMethod="resize"
            />
            {releaseDate && (
                <View
                    style={{
                        ...styles.textWrapper,
                        top: 5,
                        right: 5,
                        width: "25%",
                        height: 25,
                        backgroundColor: color || "#000",
                        borderRadius: 5,
                    }}
                >
                    <Text style={styles.text}>{releaseDate}</Text>
                </View>
            )}
            <View style={styles.textWrapper}>
                <Text style={styles.text}>{title.english || title.userPreferred}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default MovieCard;

const styles = StyleSheet.create({
    card: {
        overflow: "hidden",
        margin: 10,
        backgroundColor: '#222'
    },
    image: {
        height: "100%",
        borderRadius: 5,
    },
    textWrapper: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        width: "100%",
        height: 40,
        alignItems: "center",
        borderRadius: 2,
    },
    text: {
        fontSize: normalize(10),
        fontWeight: "700",
        color: "#fff",
        padding: 5,
    },
});
