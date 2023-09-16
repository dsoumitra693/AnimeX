import { TouchableOpacity } from 'react-native'
import React from 'react'
import CachedImage from './CachedImage'

const Avatar = ({ source, size, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <CachedImage width={size} height={size} source={source} resizeMode='contain'
            style={{ borderRadius: size }} />
    </TouchableOpacity>
)


export default Avatar
