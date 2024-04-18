import { View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { SearchBar, SearchFeed } from '@/components/search'

const Page = () => {
    const [searchText, setSearchText] = useState("")
    return (
        <View style={{ flex: 1, backgroundColor: '#000', paddingTop: StatusBar.currentHeight }}>
            <SearchBar searchText={searchText} setSearchText={setSearchText}/>
            <SearchFeed searchText={searchText}/>
        </View>
    )
}

export default Page
