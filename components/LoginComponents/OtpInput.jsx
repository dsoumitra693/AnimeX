import React, { useState, useEffect } from "react"
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { styles } from "./styles"
import { countdown } from '../../utils'

let timerId

const OtpInput = ({ otp, setOtp, handleOtpSubmit, number, handlePhoneSubmit }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    useEffect(() => {
        setIsDisabled(otp.length !== 6)
    }, [otp])

    const [canReqNewOTP, setCanReqNewOTP] = useState(false)
    const [timer, setTimer] = useState(59)
    useEffect(() => {
        countdown(timerId, setCanReqNewOTP, setTimer)
        return () => clearTimeout(timerId)
    }, [])



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
        <View style={styles.msg}>
            <Text style={styles.msgtext}>
                OTP sent to <Text style={styles.msgHighlight}>{number}</Text> via <Text style={styles.msgHighlight}>SMS</Text>
            </Text>
        </View>
        <TouchableOpacity style={styles.authBtn(isDisabled)}
            onPress={() => {
                handleOtpSubmit()
                setIsLoading(true)
                setIsDisabled(true)
            }}
            disabled={isDisabled}>
            {isLoading && <ActivityIndicator style={{ paddingHorizontal: 10 }} color={"#fff"} />}
            <Text style={styles.authBtnTitle}>{isLoading ? "Verifing Otp" : "Verify Otp"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resendBtn(!canReqNewOTP)} onPress={handlePhoneSubmit} disabled={!canReqNewOTP}>
            {canReqNewOTP ? (<Text style={{ ...styles.authBtnTitle, fontSize: 14 }}>
                Request a new OTP
            </Text>) : (<Text style={{ ...styles.authBtnTitle, fontSize: 12, }}
            >Request a new OTP in 00:{timer} seconds</Text>)}
        </TouchableOpacity>
        <View style={styles.footer}>
            <Text style={styles.footertext}>By clicking on login, I accept all the{' '}
                <Text style={styles.footerLink} onPress={() => {
                    WebBrowser.openBrowserAsync('https://anime-x-terms-and-conditions.vercel.app/')
                }}>
                    term and conditions
                </Text>
            </Text>
        </View>
    </>
    )
}

export default OtpInput