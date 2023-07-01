import { Image } from 'react-native'
import React from 'react'

const Avatar = ({ source, size }) => (
    <Image width={size}height={size} source={source} resizeMode='contain' 
    style={{borderRadius: size}}/>
)


export default Avatar
