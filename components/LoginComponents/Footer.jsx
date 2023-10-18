import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.footertext}>By clicking on login, I accept all the{' '}
                <Text style={styles.footerLink} onPress={() => {
                    WebBrowser.openBrowserAsync('https://anime-x-terms-and-conditions.vercel.app/')
                }}>
                    term and conditions
                </Text>
            </Text>
        </View>
    )
}

export default Footer