import { View, Image, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { getOtp, verifyOtp } from '../auth'
import { AuthContext } from '../context/auth'
import { saveToAsyncStorage } from '../asyncStorage'
import { styles } from '../components/LoginComponents/styles'
import { PhoneInput, OtpInput } from '../components'
import { showToast } from '../utils'

const LoginScreen = () => {
    const [state, setState] = useContext(AuthContext)
    const [number, setNumber] = useState('')
    const [otp, setOtp] = useState('')

    const handleOtpSubmit = async () => {
        let res = await verifyOtp(number, otp)
        if (res.status == 200) {
            const data = JSON.parse(res.request._response).data
            setState({ ...state, user: data.userObj, token: data.token })
            saveToAsyncStorage(data)
        }
        else if (res.status == 400) {
            showToast('There was an error while verifing otp')
        }
    }
    const [isOtpSent, setIsOtpSent] = useState(false)
    const handlePhoneSubmit = async () => {
        let res = await getOtp(number)
        if (res.status == 200) {
            setIsOtpSent(true)
        }
    }

    const changeNumber = () => {
        setIsOtpSent(false)
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://i.pinimg.com/1200x/4b/b8/e9/4bb8e931640dcff50f8e670c86919e1b.jpg' }}
                style={StyleSheet.absoluteFillObject} />
            <View style={styles.authWrapper}>
                {!isOtpSent ? <PhoneInput
                    number={number}
                    setNumber={setNumber}
                    handlePhoneSubmit={handlePhoneSubmit} /> :
                    <OtpInput
                        otp={otp}
                        setOtp={setOtp}
                        handleOtpSubmit={handleOtpSubmit}
                        handlePhoneSubmit={handlePhoneSubmit}
                        number={number}
                        changeNumber={changeNumber} />}
            </View>
        </View>
    )
}

export default LoginScreen
