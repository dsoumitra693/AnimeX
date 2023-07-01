import { StyleSheet, FlatList, View } from 'react-native'
import React from 'react'
import FeedSection from './FeedSection'
import { FEED_GENRES } from '../../constants'

const Feed = () => {
  return (
    <View style={styles.container}>
      {FEED_GENRES.map((genre , id)=> <FeedSection genre={genre} key={id}/>)}
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    minHeight: 300,
    paddingBottom: 50,
  }
})