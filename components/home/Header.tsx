import React from 'react'
import { Appbar } from 'react-native-paper'

const Header = () => {
  return (
    <Appbar.Header >
    <Appbar.Action icon="magnify" onPress={() => {}} />
    <Appbar.Content title="AnimeX" />
    <Appbar.Action icon="calendar" onPress={() => {}} />
  </Appbar.Header>
  )
}

export default Header