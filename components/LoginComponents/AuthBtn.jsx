import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from './styles'

const AuthBtn = ({ onPress, title, isLoading, isDisabled }) => {
    return (
        <TouchableOpacity style={styles.authBtn(isDisabled)}
            onPress={onPress}
            disabled={isDisabled}>
            {isLoading && <ActivityIndicator style={{ paddingHorizontal: 10 }} color={"#fff"} />}
            <Text style={styles.authBtnTitle}>{title}</Text>
        </TouchableOpacity>
    )
}

export default AuthBtn