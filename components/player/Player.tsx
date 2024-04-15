import { BackHandler, Dimensions, ImageSourcePropType, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Video, ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';
import Controls from './Controls';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useFocusEffect, useNavigation } from 'expo-router';

interface VideoPlayerProps {
    videoUrl: string;
    thumbnail?: ImageSourcePropType;
}

type IfullscreenStyle = { width: number; height: number; } | { aspectRatio: number; width: string | number; marginTop: number | undefined; }



const Player = ({ videoUrl, thumbnail }: VideoPlayerProps) => {
    const videoRef = useRef<Video>(null);
    const [status, setStatus] = useState<AVPlaybackStatus>();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fullscreenStyle, setFullscreenStyle] = useState<IfullscreenStyle>({
        width: "100%", aspectRatio: 16 / 9,
        marginTop: StatusBar.currentHeight
    })
    // Navigation
    const navigation = useNavigation();
    const toggleFullscreen = () => {
        if (isFullscreen) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        } else {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        }

    }

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (isFullscreen) {
                    console.log("screen is in fullscreen")
                    toggleFullscreen()
                    return true;
                } else {
                    return false;
                }
            };

            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () => subscription.remove();
        }, [isFullscreen])
    );

    useEffect(() => {
        ScreenOrientation.addOrientationChangeListener(evt => {
            const { height, width } = Dimensions.get("window")
            if (evt.orientationLock == 5) {
                setIsFullscreen(true);
                setFullscreenStyle({
                    width, height, marginTop: 0
                })
            } else {
                setIsFullscreen(false)
                setFullscreenStyle({
                    width, aspectRatio: 16 / 9,
                    marginTop: StatusBar.currentHeight
                })
            }

        })
    }, [])


    return (
        <View style={[styles.playerWrapper, fullscreenStyle]}>
            <Video
                style={styles.player}
                ref={videoRef}
                source={{ uri: videoUrl }}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay={true}
                usePoster={true}
                useNativeControls={false}
                posterSource={thumbnail}
                onPlaybackStatusUpdate={setStatus}
            />
            <Controls
                status={status as AVPlaybackStatusSuccess}
                videoRef={videoRef}
                toggleFullscreen={toggleFullscreen}
                isFullscreen={isFullscreen}
            />
        </View>
    )
}

export default Player
const styles = StyleSheet.create({
    playerWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    player: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
})