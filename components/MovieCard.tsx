import { StyleSheet, Text, View, TouchableOpacity, StyleProp, ImageStyle } from "react-native";
import React from "react";
import CachedImage from "./CachedImage";
import { normalize } from "@/utils/fontNormalise";
import {  ISearchMovie } from "@/types";


interface MovieCardProps {
    movie: ISearchMovie;
    size?: number;
}

const MovieCard = ({ movie, size }: MovieCardProps) => {
    const { image, title, color, releaseDate } = movie;
    return (
        <TouchableOpacity
            style={{
                ...styles.card, width: size || 150,
                height: size ? 250 : 230,
                marginTop: size ? 0 : 10,
            }}
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
        fontSize: normalize(12),
        fontWeight: "700",
        color: "#fff",
        padding: 5,
    },
});
