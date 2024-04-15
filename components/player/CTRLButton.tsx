import { TouchableOpacity, GestureResponderEvent, ViewStyle, StyleProp } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper';
import { normalize } from '@/utils/fontNormalise';

interface CTRLButtonProps {
    iconName: string;
    size: number;
    onPress?: ((event: GestureResponderEvent) => void) | undefined
    style?:StyleProp<ViewStyle>
}

const CTRLButton: React.FC<CTRLButtonProps> = ({ iconName, size, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={style}>
        <Icon source={iconName} size={normalize(size)} color="#fff" />
    </TouchableOpacity>
);

export default CTRLButton