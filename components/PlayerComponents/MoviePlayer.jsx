import { ActivityIndicator, StyleSheet, View, } from 'react-native'
import React, { useRef, useState } from 'react'
import { Video, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation'
import Controls from './Controls'
import { StatusBar } from 'react-native';

const FULLSCREEN_UPDATE_VALUES = {
  START: 0,
  FINISH: 1,
  ENTER: 2,
  EXIT: 3,
};

const MoviePlayer = ({ VideoUrl, VideoSource, videoQuality, setVideoQuality, setJustFinished, currentPosition, setCurrentPosition }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({})

  const toggleFullscreen = (evt) => {
    switch (evt.fullscreenUpdate) {
      case FULLSCREEN_UPDATE_VALUES.START:
      case FULLSCREEN_UPDATE_VALUES.FINISH:
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        break;
      case FULLSCREEN_UPDATE_VALUES.ENTER:
      case FULLSCREEN_UPDATE_VALUES.EXIT:
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        break;
      default:
        // Handle unexpected `evt.fullscreenUpdate` values here
        break;
    }
  }

  const handleVideoError = (error) => {
    console.log('Video error:', error)
    // Handle the video error here
  }

  if (VideoUrl) return (
    <View style={styles.playerWrapper}>
      <Video ref={videoRef}
        style={styles.player}
        source={{ uri: VideoUrl }}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={status => {
          setStatus(status)
          setJustFinished(status.didJustFinish)
        }}
        shouldPlay={true}
        usePoster={true}
        useNativeControls={false}
        onFullscreenUpdate={toggleFullscreen}
        onError={handleVideoError}
      />
      <Controls
        status={status}
        videoRef={videoRef}
        videoQuality={videoQuality}
        setVideoQuality={setVideoQuality}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition} 
        VideoSource={VideoSource}
        />
    </View>
  )
  return <View style={styles.playerWrapper}/>
}

export default MoviePlayer

const styles = StyleSheet.create({
  playerWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    marginTop: StatusBar.currentHeight,
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})