import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { AuthConfig } from '../constants'
import { normalize } from '../fontsNormalisation'



const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <AuthBtn config={AuthConfig.GOOGLE} />
        </View>
    )
}

export default LoginScreen

const AuthBtn = ({ config }) => {

    return (
        <TouchableOpacity style={styles.authBtn} onPress={() => { }}>
            <Image source={{ uri: config.logo }} style={[StyleSheet.absoluteFill, styles.authBtnLogo]} />
            <Text style={styles.authBtnTitle}>{config.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column"
    },
    authBtn: {
        width: '80%',
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 50 / 2,
        flexDirection: 'row',
        paddingHorizontal: '15%'
    },
    authBtnLogo: {
        width: 40,
        height: 40,
        position: 'relative'
    },
    authBtnTitle: {
        fontFamily: 'CooperHewitt',
        fontSize: normalize(20),
        color: "#fff"
    }
})