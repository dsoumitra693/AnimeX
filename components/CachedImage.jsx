import { Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Caching } from '../Caching'

const CachedImage = ({ source, ...props }) => {
    const [url, setUrl] = useState(null)
    const { uri } = source

    const cached = async () => {
        let data = await Caching(uri)

        setUrl(data.uri)
    }
    useEffect(() => {
        cached()

    }, [])
    return (
        <Image source={{ uri: url }} {...props} />
    )
}

export default CachedImage