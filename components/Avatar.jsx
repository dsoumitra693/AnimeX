import { Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Avatar = ({ source, size, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Image width={size} height={size} source={source} resizeMode='contain'
            style={{ borderRadius: size }} />
    </TouchableOpacity>
)


export default Avatar
