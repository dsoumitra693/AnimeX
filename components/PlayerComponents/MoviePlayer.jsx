import { ActivityIndicator, StyleSheet, View, } from 'react-native'
import React, { useRef, useState } from 'react'
import { Video, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation'
import Controls from './Controls'

const MoviePlayer = ({ VideoUrl, videoQuality, setVideoQuality, setJustFinished, currentPosition, setCurrentPosition }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({})
  const toggleFullscreen = (evt) => {
    if (evt.fullscreenUpdate == 0 || evt.fullscreenUpdate == 1) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    } else if (evt.fullscreenUpdate == 2 || evt.fullscreenUpdate == 3) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }
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
        usePoster={true}
        useNativeControls={false}
        onFullscreenUpdate={toggleFullscreen}
      />
      <Controls
        status={status}
        videoRef={videoRef}
        videoQuality={videoQuality}
        setVideoQuality={setVideoQuality}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition} />
    </View>
  )
  return <ActivityIndicator/>
}

export default MoviePlayer

const styles = StyleSheet.create({
  playerWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    marginTop: 10,
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})