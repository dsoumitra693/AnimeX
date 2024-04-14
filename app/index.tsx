import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { RecentSlides } from '@/components/home'
import Feed from '@/components/home/Feed'

const Main = () => {
  return (
    <View style={{flex:1, backgroundColor:'#000'}}>
      <ScrollView decelerationRate={'fast'}>
        <RecentSlides />
        <Feed/>
      </ScrollView>
    </View>
  )
}

export default Main