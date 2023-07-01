import { StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { COLORS, FONT, defaultProfileImg } from '../constants'
import Avatar from './Avatar'
import { useNavigation } from '@react-navigation/native'

const Header = ({ route }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {route.name == 'Search' ? (
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Icon name='arrow-left' size={FONT.base} color={COLORS.white} />
        </TouchableOpacity>
      ) :

        (<TouchableOpacity onPress={() => {
          navigation.navigate('Search')
        }}>
          <Icon name='search' size={FONT.base} color={COLORS.white} />
        </TouchableOpacity>
        )}
      <View style={styles.leftContainer}>
        <Icon name='cast' size={FONT.base} color={COLORS.white} />
        <Avatar source={{ uri: defaultProfileImg }} size={25} />
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 30,
    borderColor: '#0000001a',
    borderBottomWidth: 1.5,
    overflow: 'hidden',
    shadowColor: '#0000001a',
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  leftContainer: {
    height: 40,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    elevation: 10
  }
})