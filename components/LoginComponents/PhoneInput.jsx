import React, { useState, useEffect } from "react"
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { styles } from "./styles"

const PhoneInput = ({ number, setNumber, handlePhoneSubmit }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        setIsDisabled(number?.length !== 10)
    }, [number])
    return (<>
        <View style={{ ...styles.inputWrapper }}>
            <TextInput style={styles.inputField}
                keyboardType='numeric'
                placeholder='enter your phone number'
                placeholderTextColor={"#aaaaaa"}
                keyboardAppearance='dark'
                maxLength={10}
                value={number}
                onChangeText={(text) => setNumber(text)}
                focusable={true} />
        </View>
        <TouchableOpacity style={styles.authBtn(isDisabled)}
            onPress={() => {
                handlePhoneSubmit()
                setIsLoading(true)
                setIsDisabled(true)
            }} disabled={isDisabled}>
            {isLoading &&
                <ActivityIndicator style={{ paddingHorizontal: 10 }} color={"#fff"} />}
            <Text style={styles.authBtnTitle}>{isLoading ? "Sending OTP" : "Get OTP"}</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
            <Text style={styles.footertext}>By clicking on login, I accept all the{' '}
                <Text style={styles.footerLink}
                    onPress={() => {
                        WebBrowser.openBrowserAsync('https://anime-x-terms-and-conditions.vercel.app/')
                    }}>
                    term and conditions
                </Text>
            </Text>
        </View>
    </>)
}

export default PhoneInput