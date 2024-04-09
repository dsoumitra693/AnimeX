import { View, TextInput } from 'react-native'
import { styles } from './styles'

const AuthInput = (props) => {
    return (
        <View style={styles.inputWrapper}>
            <TextInput style={styles.inputField}
                autoFocus
                autoComplete='cc-number'
                keyboardType='numeric'
                placeholderTextColor={"#aaaaaa"}
                keyboardAppearance='dark'
                focusable={true}
                {...props} />
        </View>
    )
}

export default AuthInput