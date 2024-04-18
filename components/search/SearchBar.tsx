import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

interface SearchBarProps {
  searchText: string, setSearchText: (text: string) => void
}

const SearchBar = ({ searchText, setSearchText }: SearchBarProps) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        showSoftInputOnFocus
        placeholder="Search Here..."
        placeholderTextColor={"#888"}
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
        keyboardAppearance="dark"
        returnKeyType="search"
      />
      <TouchableOpacity disabled={searchText == ""} onPress={()=>setSearchText("")}>
        <FontAwesome
          name='remove'
          size={25}
          color={searchText == "" ? "#888" : "#ccc"}
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  wrapper: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 20,
    paddingRight: 10,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#222",
    flexDirection: "row"
  },
  input: {
    width: "90%",
    height: "100%",
    padding: 20,
    fontSize: 18,
    color: "#fff"
  }
})