import { Image, ImageProps, ImageSourcePropType } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Caching } from '@/utils/Caching'
import { DEFAULT_IMAGE } from '@/constants'

interface CachedImageProps extends ImageProps {
    source: { uri: string }
}


const CachedImage = ({ source, ...props }: CachedImageProps) => {
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
        <Image source={{ uri: url || DEFAULT_IMAGE }} {...props} />
    )
}

export default CachedImage