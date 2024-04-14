import { Image, ImageProps, ImageSourcePropType } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Caching } from '@/utils/Caching'

interface CachedImageProps extends ImageProps{
    source:{uri:string}
}


const CachedImage = ({ source, ...props }:CachedImageProps) => {
    const [url, setUrl] = useState<string>()
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