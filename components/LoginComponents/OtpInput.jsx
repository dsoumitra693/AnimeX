import React, { useState, useEffect } from "react"
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { styles } from "./styles"
import { countdown } from '../../utils'
import Footer from "./Footer"
import AuthBtn from "./AuthBtn"
import AuthInput from "./AuthInput"

let timerId

const OtpInput = ({
    otp,
    setOtp,
    handleOtpSubmit,
    number,
    handlePhoneSubmit,
    changeNumber,
    isLoading,
}) => {
    const [isDisabled, setIsDisabled] = useState(true)
    useEffect(() => {
        setIsDisabled(otp?.length !== 6 || isLoading)
    }, [otp, isLoading])

    const [canReqNewOTP, setCanReqNewOTP] = useState(false)
    const [timer, setTimer] = useState(59)
    useEffect(() => {
        countdown(timerId, setCanReqNewOTP, setTimer)
        return () => clearTimeout(timerId)
    }, [])



    return (<>
        <AuthInput
            placeholder='Enter OTP here'
            maxLength={6}
            value={otp}
            onChangeText={(text) => setOtp(text)}
        />
        <View style={styles.msg}>
            <Text style={styles.msgtext}>
                OTP sent to <Text style={styles.msgHighlight}>{number}</Text> via <Text style={styles.msgHighlight}>SMS</Text>
            </Text>
            <TouchableOpacity onPress={changeNumber}>
                <Text style={styles.msgTextBtn}>Change</Text>
            </TouchableOpacity>
        </View>
        <AuthBtn
            onPress={() => {
                handleOtpSubmit()
                setIsDisabled(true)
            }}
            title={isLoading ? "Verifing Otp" : "Verify Otp"}
            isDisabled={isDisabled}
            isLoading={isLoading}
        />
        <TouchableOpacity style={styles.resendBtn(!canReqNewOTP)} onPress={handlePhoneSubmit} disabled={!canReqNewOTP}>
            {canReqNewOTP ? (<Text style={{ ...styles.authBtnTitle, fontSize: 14 }}>
                Request a new OTP
            </Text>) : (<Text style={{ ...styles.authBtnTitle, fontSize: 12, }}
            >Request a new OTP in 00:{timer} seconds</Text>)}
        </TouchableOpacity>
        <Footer />
    </>
    )
}

export default OtpInput