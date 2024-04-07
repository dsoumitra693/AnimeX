import { apiCall, createHeadersList, getReqOptionsFactoty } from "../apiConfig"
import { backend_url } from "../config"


let headersList = createHeadersList()
let getReqOptions = getReqOptionsFactoty({ 
    baseUrl: `${backend_url}/auth/otp`, 
    headersList 
})

export const getOtp = async (number) => {
    if (number) {
        let reqOptions = getReqOptions({ url: `generate?phone=91${number}`, method: 'GET' })
        let response = await apiCall(reqOptions)
        return response
    }
}

export const verifyOtp = async (number, otp) => {
    if (number) {
        let reqOptions = getReqOptions({ url: `verify?phone=91${number}&otp=${otp}`, method: 'POST' })
        let response = await apiCall(reqOptions)
        return response
    }
}