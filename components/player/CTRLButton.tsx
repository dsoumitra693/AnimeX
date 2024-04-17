import { TouchableOpacity, GestureResponderEvent, ViewStyle, StyleProp } from 'react-native'
import React from 'react'
import { normalize } from '@/utils/fontNormalise';
import { FontAwesome6 } from '@expo/vector-icons';

interface CTRLButtonProps {
    iconName: string;
    size: number;
    onPress?: ((event: GestureResponderEvent) => void) | undefined
    style?:StyleProp<ViewStyle>
}

const CTRLButton: React.FC<CTRLButtonProps> = ({ iconName, size, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={style}>
        
        <FontAwesome6 name={iconName}  size={normalize(size)} color="#fff" />
    </TouchableOpacity>
);

export default CTRLButton