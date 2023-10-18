import { View, TextInput } from 'react-native'
import React from 'react'
import { styles } from './styles'

const AuthInput = (props) => {
    return (
        <View style={styles.inputWrapper}>
            <TextInput style={styles.inputField}
                keyboardType='numeric'
                placeholderTextColor={"#aaaaaa"}
                keyboardAppearance='dark'
                focusable={true}
                {...props} />
        </View>
    )
}

export default AuthInput