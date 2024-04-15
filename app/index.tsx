import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { RecentSlides } from '@/components/home'
import Feed from '@/components/home/Feed'
import * as ScreenOrientation from 'expo-screen-orientation'

const Main = () => {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView decelerationRate={'fast'}>
        <RecentSlides />
        <Feed />
      </ScrollView>
    </View>
  )
}

export default Main