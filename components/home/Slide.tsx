import { Dimensions, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { memo, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CachedImage from '../CachedImage';
import { Icon } from 'react-native-paper';
import { normalize } from '@/utils/fontNormalise';
import { ISearchMovie } from '@/types';

interface SlideProps {
    movie: ISearchMovie
}
interface buttonProps {
    iconName: string;
    title: string;
    style?: StyleProp<ViewStyle> | undefined;
    onPress?: () => void;
    textColor: string;
}
const { width, height } = Dimensions.get('window');
const Slide: React.FC<SlideProps> = ({ movie }) => {
    const { image, title, genres, id, color, type, releaseDate, status } = movie;
    const [isInWatchList, setisInWatchList] = useState(false)
    return (
        <View
            style={{
                paddingBottom: 20,
                flexDirection: "row",
                justifyContent: "center",
            }}
        >
            <CachedImage
                source={{ uri: image }}
                height={height * 0.7}
                width={width}
                resizeMode="stretch"
            />
            <View style={styles.container}>
                <LinearGradient
                    colors={["transparent", "#000"]}
                    start={{ x: 0, y: 0.001 }}
                    end={{ x: 0, y: 0.9 }}
                    style={styles.linearGradient}
                >
                    <View style={styles.textWrapper}>
                        <Text style={styles.geners}>
                            {type} | {releaseDate} | {status}
                        </Text>
                        <Text style={styles.geners}>
                            {genres[0]} · {genres[1]} · {genres[2]}
                        </Text>
                        <Text style={styles.title}> {title?.userPreferred?.slice(0, 15)} </Text>
                    </View>
                    <View style={styles.btnWrapper}>
                        <Button
                            iconName='bookmark-outline'
                            title="Add To List"
                            textColor={color}
                            style={{ width: 180 }}
                        //   onPress={playNow}
                        />
                        <Button
                            iconName='play'
                            title="Watch Now"
                            textColor={color}
                            style={{ width: 160 }}
                        //   onPress={playNow}
                        />
                    </View>
                </LinearGradient>
            </View>
        </View>
    )
}

export default Slide

const Button = ({ iconName, title, style, onPress, textColor }: buttonProps) => (
    <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
        <Icon
            source={iconName}
            color={textColor}
            size={35}
        />
        <Text
            style={{
                fontSize: normalize(16),
                padding: 4,
                color: textColor,
            }}
        >
            {title}
        </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        height: 200,
        left: 0,
        width: "100%",
    },
    linearGradient: {
        flex: 1,
    },
    textWrapper: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: normalize(35),
        textAlign: "center",
        fontWeight: "400",
        color: "#fff",
    },
    geners: {
        fontSize: normalize(16),
        fontWeight: "400",
        color: "#fff",
    },
    btnWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        width: 180,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        padding: 15,
        backgroundColor: "rgba(0,0,0, 0.1)",
        borderColor: "rgba(51, 51, 51, 0.5)",
        borderWidth: 3,
        borderRadius: 30,
        elevation: 3,
        color: "#222",
    },
});
