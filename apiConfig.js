import axios from "axios";

export let createHeadersList = (headersOptions = {})=> ({
    "Accept": "*/*",
    ...headersOptions
})

export let getReqOptionsFactoty = ({ baseUrl, headersList }) =>
    ({ url, method }) =>
    ({
        url: `${baseUrl}/${url}`,
        method,
        headers: headersList,
    })

export const apiCall = async (reqOptions) => {
    console.log(reqOptions)
    try {
        let response = await axios.request(reqOptions);
        return response
    } catch (error) {
        return error
    }
}