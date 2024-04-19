import {
    View,
    Animated,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { Slider } from "@miblanchard/react-native-slider";
import CTRLButton from "./CTRLButton";
import { AVPlaybackStatusSuccess, Video } from "expo-av";
import { msToTime, showToast } from "@/utils/time";
import { normalize } from "@/utils/fontNormalise";
import { usePlayer } from "../providers/PlayerProvider";

interface ControlsProps {
    status: AVPlaybackStatusSuccess;
    videoRef: RefObject<Video> | null;
    toggleFullscreen: () => void;
    isFullscreen: boolean
}
const Controls = ({
    videoRef,
    status,
    toggleFullscreen,
    isFullscreen
}: ControlsProps) => {
    let { setPosition, availableQuality, setVideoQuality, videoQuality } = usePlayer()
    const playFrom = async (ms: number) => {
        if (videoRef?.current) {
            await videoRef.current.playFromPositionAsync(ms)
            await videoRef.current.playAsync();
        }
    };

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [isShowingControls, setIsShowingControls] = useState(true);
    const [showSettings, setShowSettings] = useState(false);


    const triggerShowHide = () => {
        setIsShowingControls(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        clearTimeout(timerId);
        startAutoHideTimer();
    };

    let timerId: string | number | NodeJS.Timeout | undefined;
    const timeoutTime = 4000;

    const startAutoHideTimer = () => {
        if (status?.isPlaying) {
            timerId = setTimeout(() => {
                hideControls();
            }, timeoutTime);
        }
    };

    const hideControls = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsShowingControls(false);
            setShowSettings(false);
        });
    };

    useEffect(() => {
        startAutoHideTimer();
        return () => clearTimeout(timerId);
    }, [isShowingControls, status?.isPlaying, timerId, timeoutTime]);

    const togglePlayPause = async () => {
        if (!isShowingControls) return;
        try {
            if (!status?.isPlaying) {
                triggerShowHide();
                await videoRef?.current?.playAsync();
            } else {
                setIsShowingControls(true);
                await videoRef?.current?.pauseAsync();
            }
        } catch (error: any) {
            showToast(error);
        }
    };

    const [sliderValue, setSliderValue] = useState<number[]>([]);
    useEffect(() => {
        if (status) {
            let { positionMillis: currentPostion, durationMillis: duration } = status;
            let _silderValue = currentPostion / (duration || 1);
            if (!status.isBuffering) {
                setPosition(currentPostion)
            }
            if (isShowingControls) {
                setSliderValue([_silderValue]);
            }
        }
    }, [status]);

    const seekTo = async (value: number[]) => {
        let val = value[0]
        if (!isShowingControls) return;
        if (videoRef?.current) {
            val *= status?.durationMillis || 0.1
            await playFrom(val);
        }
    };

    const skipTo = async (ms: number) => {
        if (!isShowingControls) return;
        if (videoRef?.current) {
            playFrom(status?.positionMillis + ms);
        }
    };


    const toggleMute = () => {
        if (isShowingControls && videoRef?.current)
            videoRef.current.setIsMutedAsync(!status?.isMuted);
    };

    const toggleShowingSettings = () => setShowSettings((prev) => !prev);
    return (
        <TouchableOpacity
            onPress={triggerShowHide}
            activeOpacity={1}
            style={{
                ...styles.Controls,
                opacity: isShowingControls ? 1 : 0,
            }}
        >
            <View style={styles.playPauseWrapper}>
                <CTRLButton
                    iconName={"backward"}
                    size={25}
                    onPress={() => skipTo(-30000)}
                />
                {status?.isPlaying ? (
                    <CTRLButton
                        iconName={"pause"}
                        size={25}
                        onPress={togglePlayPause}
                        style={{
                            left: 0,
                        }}
                    />
                ) : (
                    <CTRLButton
                        iconName={"play"}
                        size={25}
                        onPress={togglePlayPause}
                        style={{
                            left: 2,
                        }}
                    />
                )}
                <CTRLButton
                    iconName={"forward"}
                    size={25}
                    onPress={() => skipTo(10000)}
                />
            </View>

            <View style={styles.timeStampWrapper}>
                <Text style={styles.timeStampText}>
                    {msToTime(status?.positionMillis)}
                </Text>
                <Text style={styles.timeStampText}>
                    {msToTime(status?.durationMillis)}
                </Text>
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
                onValueChange={(value) => setSliderValue(value)} // Change this line
                onSlidingComplete={(value) => seekTo(value)}
            />
            <View style={styles.bottomCtrls}>
                {status?.isMuted ? (
                    <CTRLButton
                        iconName={"volume-xmark"}
                        size={20}
                        onPress={toggleMute}
                    />
                ) : (
                    <CTRLButton
                        iconName={"volume-high"}
                        size={20}
                        onPress={toggleMute}
                    />
                )}
                <View
                    style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        position: "relative",
                        width: 80,
                    }}
                >
                    <CTRLButton
                        iconName="gear"
                        size={20}
                        onPress={toggleShowingSettings}
                    />
                    {isFullscreen ? (
                        <CTRLButton
                            iconName="compress"
                            size={20}
                            onPress={toggleFullscreen}
                        />
                    ) : (
                        <CTRLButton
                            iconName="expand"
                            size={20}
                            onPress={toggleFullscreen}
                        />
                    )}
                    {showSettings && (
                        <View style={styles.settings}>
                            {availableQuality?.map((quality) => {
                                return (
                                    <TouchableOpacity
                                        key={quality}
                                        style={styles.videoQualityWrapper}
                                        onPress={() => setVideoQuality(quality)}
                                    >
                                        <Text style={styles.qualityText}>
                                            {videoQuality == quality ? "•" : ""} {quality}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Controls;

const styles = StyleSheet.create({
    Controls: {
        position: "absolute",
        zIndex: 1000,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0, 0.5)'
    },
    playPauseWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        bottom: 20
    },
    timeStampText: {
        color: "#fff",
        fontSize: normalize(14),
    },
    sliderContainer: {
        height: 10,
        width: "95%",
        position: "absolute",
        bottom: 40,
    },
    timeStampWrapper: {
        height: 30,
        width: "90%",
        position: "absolute",
        bottom: 45,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    bottomCtrls: {
        width: "100%",
        bottom: 10,
        position: "absolute",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 25,
    },
    thumb: {
        backgroundColor: "#FE9F01",
        borderRadius: 10 / 2,
        height: 10,
        shadowColor: "#FE9F01",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        width: 10,
    },
    track: {
        backgroundColor: "#575454",
        height: 2,
        width: "100%",
    },
    settings: {
        position: "absolute",
        backgroundColor: "#222",
        bottom: 25,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    videoQualityWrapper: {
        padding: 5,
    },
    qualityText: {
        color: "#fff",
        fontSize: normalize(14),
    },
});
