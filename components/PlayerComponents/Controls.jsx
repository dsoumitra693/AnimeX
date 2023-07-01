import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Slider } from '@miblanchard/react-native-slider'
import { msToTime } from '../../utils'
import * as ScreenOrientation from 'expo-screen-orientation'
import { normalize } from '../../fontsNormalisation'

let timeoutTime = 3000
let timerId

const Controls = ({ videoRef, status, videoQuality, setVideoQuality, currentPosition, setCurrentPosition }) => {
    //hnadling showing controls btns
    const [isShowingControls, setIsShowingControls] = useState(true)

    const triggerShowHide = () => {
        setIsShowingControls(true)
        setShowSettings(false)
    }

    useEffect(() => {
        if (status.isPlaying && isShowingControls) {
            timerId = setTimeout(() => {
                setIsShowingControls(false)
            }
                , timeoutTime)
        }
        return () => clearTimeout(timerId)
    }, [isShowingControls, status.isPlaying])

    //handling play pause
    const togglePlayPause = async () => {
        triggerShowHide()
        try {
            if (!status.isPlaying) {
                await videoRef?.current.playAsync()
            } else {
                await videoRef?.current.pauseAsync()
            }
        } catch (error) {
            ToastAndroid.showWithGravityAndOffset(
                error,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
        }
    }

    //hndling slider logic
    const [sliderValue, setSliderValue] = useState(0.0)
    useEffect(() => {
        let { positionMillis: currentPostion,
            durationMillis: duration } = status
        let _silderValue = currentPostion / duration
        setSliderValue(_silderValue)
    }, [status])
    const seekTo = async (value) => {
        videoRef?.current.playFromPositionAsync(value * status.durationMillis)
        await videoRef?.current.playAsync()
    }

    //landscape full screen logic
    const [isFullscreen, setIsFullscreen] = useState(false)
    const toggleFullscreen = () => {
        if (!isFullscreen) {
            videoRef.current.presentFullscreenPlayer()
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        } else {
            videoRef.current.dismissFullscreenPlayer()
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }
    }


    //toggle mute
    const toggleMute = () => {
        videoRef.current.setIsMutedAsync(!status.isMuted)
    }

    //video settings controls
    const [showSettings, setShowSettings] = useState(false)
    const toggleShowingSettings = () => setShowSettings(prev => !prev)
    useEffect(() => {
        videoRef?.current.playFromPositionAsync(currentPosition)
    }, [currentPosition])


    return (
        <TouchableWithoutFeedback onPress={triggerShowHide}>
            <View style={{
                ...styles.Controls(isFullscreen),
                opacity: isShowingControls ? 1 : 0,
                ...styles.fullscreen(isFullscreen),
            }}>
                <CTRLButton
                    iconName={status.isPlaying ? 'md-pause' : 'md-play'}
                    size={60}
                    onPress={togglePlayPause}
                    style={{
                        left: !status.isPlaying ? 2 : 0
                    }} />
                <View style={styles.timeStampWrapper}>
                    <Text style={styles.timeStampText}>{msToTime(status.positionMillis)}</Text>
                    <Text style={styles.timeStampText}>{msToTime(status.durationMillis)}</Text>
                </View>
                <Slider
                    animateTransitions
                    containerStyle={styles.sliderContainer}
                    minimumTrackTintColor="#FE9F01"
                    maximumTrackTintColor="#FFF"
                    thumbStyle={styles.thumb}
                    thumbTouchSize={{
                        width: 50,
                        height: 40,
                    }}
                    trackStyle={styles.track}
                    value={sliderValue}
                    onValueChange={value => setSliderValue(value)}
                    onSlidingComplete={seekTo}
                />
                <View style={styles.bottomCtrls}>
                    <CTRLButton
                        iconName={!status.isMuted ? 'ios-volume-high' : 'ios-volume-mute'}
                        size={20}
                        onPress={toggleMute}
                    />
                    <View style={{
                        position: 'absolute',
                        justifyContent: 'space-between',
                        flexDirection: 'row-reverse',
                        position: 'relative',
                        width: '20%'
                    }}>
                        <CTRLButton
                            iconName={isFullscreen ? 'ios-contract-outline' : 'ios-expand-outline'}
                            size={20}
                            onPress={toggleFullscreen}
                        />

                        <CTRLButton
                            iconName='ios-settings-outline'
                            size={20}
                            onPress={toggleShowingSettings}
                        />
                        {showSettings && (
                            <View style={styles.settings}>
                                {['360p', '480p', '720p', '1080p'].map((quality, id) => {
                                    return <TouchableOpacity key={id} style={styles.videoQualityWrapper} onPress={() => {
                                        setVideoQuality(quality)
                                        setCurrentPosition(status.positionMillis)
                                    }}>
                                        <Text style={styles.qualityText}>
                                            {videoQuality == quality ? '•' : ''} {quality}
                                        </Text>
                                    </TouchableOpacity>
                                })}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const CTRLButton = ({ iconName, size, onPress, style }) => (
    <TouchableOpacity onPress={onPress}>
        <Icon name={iconName} size={size} color={'#fff'} style={style} />
    </TouchableOpacity>
)

export default Controls

const styles = StyleSheet.create({
    fullscreen: (isFullscreen) => {
        if (isFullscreen) {
            return {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1000,
            }
            return {}
        }
    },
    Controls: (isFullscreen) => ({
        position: 'absolute',
        bottom: 10,
        width: isFullscreen ? window_height : '100%',
        height: isFullscreen ? window_width : '100%',
        justifyContent: 'center',
        alignItems: 'center',

    }),
    timeStampText: {
        color: '#fff',
        fontSize: normalize(14),
        // fontFamily: 'CooperHewitt'
    },
    sliderContainer: {
        height: 30,
        width: '90%',
        position: 'absolute',
        bottom: 10,
    },
    timeStampWrapper: {
        height: 30,
        width: '90%',
        position: 'absolute',
        bottom: 20,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    bottomCtrls: {
        width: '100%',
        bottom: 0,
        position: 'absolute',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 25,
    },
    thumb: {
        backgroundColor: '#FE9F01',
        borderRadius: 10 / 2,
        height: 10,
        shadowColor: '#FE9F01',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        width: 10,
    },
    track: {
        backgroundColor: '#575454',
        height: 2,
        width: '100%'
    },
    settings: {
        position: 'absolute',
        width: 80,
        height: 120,
        backgroundColor: '#222',
        bottom: 25,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    videoQualityWrapper: {
        padding: 5,
    },
    qualityText: {
        color: '#fff',
        fontSize: normalize(16),
        // fontFamily: 'CooperHewitt'
    }
})