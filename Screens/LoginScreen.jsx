import { View, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { getOtp, verifyOtp } from '../auth'
import { AuthContext } from '../context/auth'
import { saveToAsyncStorage } from '../asyncStorage'
import { styles } from '../components/LoginComponents/styles'
import { PhoneInput, OtpInput, CachedImage } from '../components'
import { showToast } from '../utils'

const LoginScreen = () => {
    const [state, setState] = useContext(AuthContext)
    const [number, setNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleOtpSubmit = async () => {
        setIsLoading(true)
        let res = await verifyOtp(number, otp)
        if (res.status == 200) {
            const data = JSON.parse(res.request._response).data
            setState({ ...state, user: data.userObj, token: data.token })
            saveToAsyncStorage(data)
        }
        else {
            showToast('There was an error while verifing otp')
        }
        setIsLoading(false)
    }
    const [isOtpSent, setIsOtpSent] = useState(false)
    const handlePhoneSubmit = async () => {
        setIsLoading(true)
        let res = await getOtp(number)
        if (res.status == 200) {
            setIsOtpSent(true)
        } else {
            showToast('There was an error while sending otp')
        }
        setIsLoading(false)
    }

    const changeNumber = () => {
        setIsOtpSent(false)
    }

    return (
        <View style={styles.container}>
            <CachedImage source={{ uri: 'https://i.pinimg.com/1200x/4b/b8/e9/4bb8e931640dcff50f8e670c86919e1b.jpg' }}
                style={StyleSheet.absoluteFillObject} />
            <View style={styles.authWrapper}>
                {!isOtpSent ? <PhoneInput
                    number={number}
                    setNumber={setNumber}
                    handlePhoneSubmit={handlePhoneSubmit}
                    isLoading={isLoading}
                /> :
                    <OtpInput
                        otp={otp}
                        setOtp={setOtp}
                        handleOtpSubmit={handleOtpSubmit}
                        handlePhoneSubmit={handlePhoneSubmit}
                        number={number}
                        changeNumber={changeNumber}
                        isLoading={isLoading}
                    />}
            </View>
        </View>
    )
}

export default LoginScreen
