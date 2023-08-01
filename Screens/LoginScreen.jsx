import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { normalize } from '../fontsNormalisation'
import { getOtp, verifyOtp } from '../auth'
import { AuthContext } from '../context/auth'
import { saveToAsyncStorage } from '../asyncStorage'


const LoginScreen = () => {
    const [_, setState] = useContext(AuthContext)
    const [number, setNumber] = useState('')
    const [otp, setOtp] = useState('')

    const handleOtpSubmit = async () => {
        let res = await verifyOtp(number, otp).catch(err => console.log(err))
        if (res.status == 200) {
            const data = JSON.parse(res.request._response).data
            setState(prev => ({ ...prev, user: data.userObj, token: data.token }))
            saveToAsyncStorage(data)
        }
    }
    const [isOtpSent, setIsOtpSent] = useState(false)
    const handlePhoneSubmit = async () => {
        let res = await getOtp(number)
        if (res.status == 200) {
            setIsOtpSent(true)
        }
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://i.pinimg.com/1200x/4b/b8/e9/4bb8e931640dcff50f8e670c86919e1b.jpg' }}
            style={StyleSheet.absoluteFillObject}/>
            <View style={styles.authWrapper}>
                {!isOtpSent ? <PhoneNumberInput
                    number={number}
                    setNumber={setNumber}
                    handlePhoneSubmit={handlePhoneSubmit} /> :
                    <OtpInput
                        otp={otp}
                        setOtp={setOtp}
                        handleOtpSubmit={handleOtpSubmit}
                    />}
            </View>
        </View>
    )
}

const OtpInput = ({ otp, setOtp, handleOtpSubmit }) => {
    const [isDisabled, setIsDisabled] = useState(true)
    useEffect(() => {
        setIsDisabled(otp.length !== 6)
    }, [otp])
    return (<>
        <View style={styles.inputWrapper}>
            <TextInput style={styles.inputField}
                keyboardType='numeric'
                placeholder='Enter OTP here'
                placeholderTextColor={"#aaaaaa"}
                keyboardAppearance='dark'
                maxLength={6}
                value={otp}
                onChangeText={(text) => setOtp(text)}
            />
        </View>
        <TouchableOpacity style={styles.authBtn(isDisabled)} onPress={handleOtpSubmit} disabled={isDisabled}>
            <Text style={styles.authBtnTitle}>Verify Otp</Text>
        </TouchableOpacity>
    </>
    )
}

const PhoneNumberInput = ({ number, setNumber, handlePhoneSubmit }) => {
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        setIsDisabled(number.length !== 10)
    }, [number])
    return (<>
        <View style={styles.inputWrapper}>
            <TextInput style={styles.inputField}
                keyboardType='numeric'
                placeholder='Enter your phone number here'
                placeholderTextColor={"#aaaaaa"}
                keyboardAppearance='dark'
                maxLength={10}
                value={number}
                onChangeText={(text) => setNumber(text)} />
        </View>
        <TouchableOpacity style={styles.authBtn(isDisabled)} onPress={handlePhoneSubmit} disabled={isDisabled}>
            <Text style={styles.authBtnTitle}>Get OTP</Text>
        </TouchableOpacity>
    </>)
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#444',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column"
    },
    authWrapper: {
        width: '90%',
        height: 250,
        position: 'absolute',
        backgroundColor: '#222222',
        bottom: 0,
        borderTopLeftRadius: 250 / 20,
        borderTopRightRadius: 250 / 20,
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: 30,
    },
    inputWrapper: {
        width: '80%',
        height: 50,
        backgroundColor: '#444444',
        // borderColor: '#fffff',
        // borderWidth: 1,
        overflow: 'hidden',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    inputField: {
        width: '100%',
        height: '100%',
        fontSize: normalize(18),
        fontFamily: 'CooperHewitt',
        color: "#ffffff"
    },
    authBtn: (isDisabled) => ({
        width: '80%',
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FE9F01',
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: '15%',
        marginTop: 30,
        opacity: isDisabled ? 0.5 : 1,
    }),
    authBtnTitle: {
        fontFamily: 'CooperHewitt',
        fontSize: normalize(20),
        color: "#fff"
    }
})