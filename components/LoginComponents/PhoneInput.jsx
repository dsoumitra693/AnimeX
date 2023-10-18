import React, { useState, useEffect } from "react"
import Footer from "./Footer"
import AuthInput from "./AuthInput"
import AuthBtn from './AuthBtn'

const PhoneInput = ({ number, setNumber, handlePhoneSubmit, isLoading }) => {
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        setIsDisabled(number?.length !== 10 && isLoading)
    }, [number, isLoading])
    return (<>
        <AuthInput
            placeholder='enter your phone number'
            maxLength={10}
            value={number}
            onChangeText={(text) => setNumber(text)} />
        <AuthBtn
            onPress={() => {
                handlePhoneSubmit()
                setIsDisabled(true)
            }}
            isDisabled={isDisabled}
            isLoading={isLoading}
            title={isLoading ? 'Sending OTP' : 'Get OTP'}
        />
        <Footer />
    </>)
}

export default PhoneInput