import { Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import shorthash from "shorthash"
import * as FileSystem from 'expo-file-system'

const CachedImage = ({ source, ...props }) => {
    const [url, setUrl] = useState(null)
    const { uri } = source

    const cached = async () => {
        const name = shorthash.unique(uri)
        const path = `${FileSystem.cacheDirectory}${name}`

        const image = await FileSystem.getInfoAsync(path)
        if (image.exits) {
            setUrl(image.uri)
            return
        }

        const newImage = await FileSystem.downloadAsync(uri, path)
        setUrl(newImage.uri)
    }
    useEffect(() => {
        cached()
        // console.log(`
        //     uri:${uri},
        //     url:${url},
        //     props:${props}
        // `)
    }, [])
    return (
        <Image source={{ uri: url }} {...props} />
    )
}

export default CachedImage