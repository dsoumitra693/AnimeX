import { View, StyleSheet } from 'react-native'
import { SearchBar, SearchFeed } from '../components'
import React, { useState, useEffect } from 'react'
import { searchMovie } from '../apiCall'

const SearchScreens = () => {
  const [searchText, setSearchText] = useState('')
  const [amines, setAmines] = useState({})

    useEffect(() => {
        (async function () {
            let _amines = await searchMovie(searchText)
            setAmines(_amines)
        })()
    }, [searchText])
  return (
    <View style={styles.container}>
      <SearchBar setSearchText={setSearchText} searchText={searchText}/>
        <SearchFeed
          data={amines}
          searchText={searchText}
        />
    </View>
  )
}

export default SearchScreens
const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: '#222',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column'
  },

})
