import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Dimensions, ImageSourcePropType, StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from 'expo-router';
import Controls from './Controls';
import { usePlayer } from '../providers/PlayerProvider';
import { IStreamUrls } from '@/types';
import { getStreamUrls } from '@/Api';



const Player = () => {
    const videoRef = useRef<Video>(null);
    const { videoPoster, position, setAvailableQuality, setVideoSource, videoSource, videoQuality, currentEpisoide } = usePlayer();
    const [status, setStatus] = useState<AVPlaybackStatus>();
    const [streamUrls, setStreamUrls] = useState<IStreamUrls>()
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fullscreenStyle, setFullscreenStyle] = useState<ViewStyle>({
        width: '100%', aspectRatio: 16 / 9, marginTop: StatusBar.currentHeight
    });

    const toggleFullscreen = () => {
        ScreenOrientation.lockAsync(isFullscreen ? ScreenOrientation.OrientationLock.PORTRAIT : ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (isFullscreen) {
                    toggleFullscreen();
                    return true;
                }
                return false;
            };

            const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => backHandler.remove();
        }, [isFullscreen])
    );

    useEffect(() => {
        const subscription = ScreenOrientation.addOrientationChangeListener(({ orientationLock }) => {
            const { height, width } = Dimensions.get("window");
            setIsFullscreen(orientationLock === ScreenOrientation.OrientationLock.LANDSCAPE);
            setFullscreenStyle({
                width,
                height: orientationLock === ScreenOrientation.OrientationLock.LANDSCAPE ? height : undefined,
                aspectRatio: orientationLock === ScreenOrientation.OrientationLock.LANDSCAPE ? undefined : 16 / 9,
                marginTop: orientationLock === ScreenOrientation.OrientationLock.LANDSCAPE ? 0 : StatusBar.currentHeight
            });
        });

        return () => subscription.remove();
    }, []);

    useEffect(() => {
        if (currentEpisoide && currentEpisoide.id) {
            getStreamUrls(currentEpisoide.id)
                .then(setStreamUrls)
                .catch(err =>
                    console.error(err)
                )
        }
    }, [currentEpisoide])


    useEffect(() => {
        if (streamUrls && streamUrls.sources) {
            const qualities = streamUrls.sources
                .filter((source: { quality: string }) => source.quality !== "backup")
                .map((source: { quality: string }) => source.quality);
            const url = streamUrls.sources.find((source: { quality: string }) => source.quality === videoQuality)?.url;

            setAvailableQuality(qualities || []);
            setVideoSource(url as string);
        }
    }, [streamUrls, videoQuality, setAvailableQuality, setVideoSource]);


    return (
        <View style={[styles.playerWrapper, fullscreenStyle]}>
            {videoSource && <Video
                ref={videoRef}
                style={StyleSheet.absoluteFill}
                source={{ uri: videoSource }}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay
                usePoster
                posterSource={{ uri: videoPoster }}
                onPlaybackStatusUpdate={setStatus}
                onLoad={() => videoRef.current?.playFromPositionAsync(position)}
            />}
            <Controls
                status={status as AVPlaybackStatusSuccess}
                videoRef={videoRef}
                toggleFullscreen={toggleFullscreen}
                isFullscreen={isFullscreen}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    playerWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    }
});

export default Player;
