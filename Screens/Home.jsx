import { ScrollView, View } from 'react-native'
import React from 'react'
import { Feed, RecentSlides } from '../components'


const Home = () => {
  return (
    <View style={{backgroundColor: '#222', height: '100%'}}>
      <ScrollView decelerationRate={'fast'}>
        <RecentSlides />
        <Feed/>
      </ScrollView>
    </View>
  )
}

export default Home