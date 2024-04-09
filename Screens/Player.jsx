import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect, } from 'react'
import { MoviePlayer, VideoDetails } from '../components'
import { getMovieInfo, getStreamUrls } from '../apiCall'

const Player = ({ route }) => {
  //get video details 
  const [videoDetails, setVideoDetails] = useState({})

  useEffect(() => {
    (async function () {
      let movieInfo = await getMovieInfo(route.params.movieId)
      console.log("Movieinfo", movieInfo)
      setVideoDetails(movieInfo)
      setEpisode(movieInfo.episodes[0])
    })()

  }, [])


  const [videoQuality, setVideoQuality] = useState('default')
  const [episode, setEpisode] = useState({})
  const [VideoUrl, setVideoUrl] = useState('')
  const [VideoSource, setVideoSource] = useState({})
  const [justFinished, setJustFinished] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(0)


  // video url
  useEffect(() => {
    (async function () {
      let videoId = episode?.id ? episode?.id : videoDetails?.id
      console.log(videoId)
      let _videoSources = await getStreamUrls(videoId, videoDetails?.id)
      if (_videoSources !== undefined) {
        let { sources } = _videoSources
        setVideoSource(sources)
      }
    })()
  }, [videoDetails, episode])

  useEffect(() => {
    const filterByQuality = (sources) => {
      if (!(Object.keys(sources)?.length === 0 && sources.constructor === Object)) {
        let videoUrl = sources?.find(source => source.quality == videoQuality).url
        return videoUrl
      }
      return ''
    }
    let url = filterByQuality(VideoSource)
    setVideoUrl(url)
  }, [videoQuality, VideoSource])


  const nextEpisode = (currentEpisode) => {
    if (videoDetails.totalEpisodes != currentEpisode.number) {
      let _nextEpi = videoDetails.episodes.find(video => video.number == currentEpisode.number + 1)
      setEpisode(_nextEpi)
    }
  }

  useEffect(() => {
    if (justFinished) nextEpisode(episode)
  }, [justFinished])



  return (
    <View style={styles.container}>
      {!!videoDetails && <>
        <MoviePlayer
          VideoUrl={VideoUrl}
          setVideoQuality={setVideoQuality}
          videoQuality={videoQuality}
          setJustFinished={setJustFinished}
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition} 
          VideoSource={VideoSource}/>
        <VideoDetails
          videoDetails={videoDetails}
          setEpisode={setEpisode}
          currentEpisode={episode}
          movieId={route.params.movieId}
          thumbnail={route.params.thumbnail} />
      </>}
    </View>
  )
}

export default Player

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#222',
  }
})