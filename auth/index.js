import { apiCall, createHeadersList, getReqOptionsFactoty } from "../apiConfig"

let headersList = createHeadersList()
let getReqOptions = getReqOptionsFactoty({ baseUrl: 'https://animex-server.onrender.com', headersList })

export const getOtp = async (number) => {
    if (number) {
        let reqOptions = getReqOptions({ url: `auth/otp/generate?phone=91${number}`, method:'POST' })
        let response = await apiCall(reqOptions)
        return response
    }
}

export const verifyOtp = async (number, otp) => {
    if (number) {
        let reqOptions = getReqOptions({ url: `auth/otp/verify?phone=91${number}&otp=${otp}`, method:'POST' })
        let response = await apiCall(reqOptions)
        return response
    }
}