import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "../";
import { Slider } from "@miblanchard/react-native-slider";
import { msToTime, showToast } from "../../utils";
import * as ScreenOrientation from "expo-screen-orientation";
import { normalize } from "../../fontsNormalisation";

const Controls = ({
  videoRef,
  VideoSource,
  status,
  videoQuality,
  setVideoQuality,
  currentPosition,
  setCurrentPosition,
}) => {
  const playFrom = async (ms) => {
    if (videoRef?.current) {
      videoRef.current.playFromPositionAsync(ms);
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

  let timerId;
  const timeoutTime = 4000;

  const startAutoHideTimer = () => {
    if (status.isPlaying) {
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
  }, [isShowingControls, status.isPlaying, timerId, timeoutTime]);

  const togglePlayPause = async () => {
    if (!isShowingControls) return;
    try {
      if (!status.isPlaying) {
        triggerShowHide();
        await videoRef?.current.playAsync();
      } else {
        setIsShowingControls(true);
        await videoRef?.current.pauseAsync();
      }
    } catch (error) {
      showToast(error);
    }
  };

  const [sliderValue, setSliderValue] = useState(0.0);
  useEffect(() => {
    let { positionMillis: currentPostion, durationMillis: duration } = status;
    let _silderValue = currentPostion / duration;
    if (isShowingControls) {
      setSliderValue(_silderValue);
    }
  }, [status]);

  const seekTo = async (value) => {
    if (!isShowingControls) return;
    if (videoRef?.current) {
      await playFrom(value * status.durationMillis);
    }
  };

  const skipTo = async (ms) => {
    if (!isShowingControls) return;
    if (videoRef?.current) {
      await playFrom(status.positionMillis + ms);
    }
  };

  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.presentFullscreenPlayer();
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      } else {
        videoRef.current.dismissFullscreenPlayer();
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
    }
  };

  const toggleMute = () => {
    if (isShowingControls && videoRef.current)
      videoRef.current.setIsMutedAsync(!status.isMuted);
  };

  const toggleShowingSettings = () => setShowSettings((prev) => !prev);
  useEffect(() => {
    videoRef?.current.playFromPositionAsync(currentPosition);
  }, [currentPosition]);

  return (
    <TouchableOpacity
      onPress={triggerShowHide}
      activeOpacity={1}
      style={{
        ...styles.Controls(isFullscreen),
        opacity: isShowingControls ? 1 : 0,
        ...styles.fullscreen(isFullscreen),
      }}
    >
      <View style={styles.playPauseWrapper}>
        <CTRLButton
          source={require("../../assets/icons/angle-double-left.png")}
          size={25}
          onPress={() => skipTo(-10000)}
        />
        {status.isPlaying ? (
          <CTRLButton
            source={require("../../assets/icons/pause.png")}
            size={30}
            onPress={togglePlayPause}
            style={{
              left: 0,
            }}
          />
        ) : (
          <CTRLButton
            source={require("../../assets/icons/play.png")}
            size={30}
            onPress={togglePlayPause}
            style={{
              left: 2,
            }}
          />
        )}
        <CTRLButton
          source={require("../../assets/icons/angle-double-right.png")}
          size={25}
          onPress={() => skipTo(10000)}
        />
      </View>

      <View style={styles.timeStampWrapper}>
        <Text style={styles.timeStampText}>
          {msToTime(status.positionMillis)}
        </Text>
        <Text style={styles.timeStampText}>
          {msToTime(status.durationMillis)}
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
        onValueChange={(value) => setSliderValue(value)}
        onSlidingComplete={seekTo}
      />
      <View style={styles.bottomCtrls}>
        {status.isMuted ? (
          <CTRLButton
            source={require("../../assets/icons/volume-slash.png")}
            size={25}
            onPress={toggleMute}
          />
        ) : (
          <CTRLButton
            source={require("../../assets/icons/volume.png")}
            size={25}
            onPress={toggleMute}
          />
        )}
        <View
          style={{
            position: "absolute",
            justifyContent: "space-between",
            flexDirection: "row",
            position: "relative",
            width: "20%",
          }}
        >
          <CTRLButton
            source={require("../../assets/icons/settings.png")}
            size={25}
            onPress={toggleShowingSettings}
          />
          {isFullscreen ? (
            <CTRLButton
              source={require("../../assets/icons/down-left-and-up-right-to-center.png")}
              size={25}
              onPress={toggleShowingSettings}
            />
          ) : (
            <CTRLButton
              source={require("../../assets/icons/arrow-up-right-and-arrow-down-left-from-center.png")}
              size={25}
              onPress={toggleShowingSettings}
            />
          )}
          {showSettings && (
            <View style={styles.settings}>
              {VideoSource.map(({ quality }, id) => {
                return (
                  <TouchableOpacity
                    key={id}
                    style={styles.videoQualityWrapper}
                    onPress={() => {
                      setVideoQuality(quality);
                      setCurrentPosition(status.positionMillis);
                    }}
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

const CTRLButton = ({ source, size, onPress, style }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon source={source} size={normalize(size)} color="#fff" />
  </TouchableOpacity>
);

export default Controls;

const styles = StyleSheet.create({
  fullscreen: (isFullscreen) => {
    if (isFullscreen) {
      return {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
      };
      return {};
    }
  },
  Controls: (isFullscreen) => ({
    position: "absolute",
    width: isFullscreen ? window_height : "100%",
    height: isFullscreen ? window_width : "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0,0,0, 0.5)'
  }),
  playPauseWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    bottom:20
  },
  timeStampText: {
    color: "#fff",
    fontSize: normalize(14),
    // fontFamily: 'CooperHewitt'
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
    fontFamily: "CooperHewitt",
  },
});
