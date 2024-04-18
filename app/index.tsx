import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Feed, Header, RecentSlides } from '@/components/home'
import * as ScreenOrientation from 'expo-screen-orientation'
import { Stack } from 'expo-router'

const Main = () => {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: props => <Header />,
          headerTransparent: true

        }} />
      <ScrollView decelerationRate={'fast'}>
        <RecentSlides />
        <Feed />
      </ScrollView>
    </View>
  )
}

export default Main