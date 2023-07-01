import axios from "axios";
import { ToastAndroid } from "react-native";

let headersList = {
    "Accept": "*/*",
}

let getReqOptions = ({ url }) => ({
    url: `https://api.consumet.org/anime/gogoanime/${url}`,
    method: "GET",
    headers: headersList,
})

const apiCall = async (reqOptions) => {
    try {
        let response = await axios.request(reqOptions);
        return response
    } catch (error) {
        return error
    }
}

export const getStreamUrls = async (episodeId) => {
    if (episodeId) {
        let reqOptions = getReqOptions({ url: `watch/${episodeId}` })
        let response = await apiCall(reqOptions)
        return response.data
    }
}

export const searchAnime = async (searchQuery) => {
    if (searchQuery) {
        let reqOptions = getReqOptions({ url: searchQuery })
        let response = await apiCall(reqOptions)
        return response.data.results
    }
}

export const getTopAiringAimne = async () => await searchAnime('top-airing')

export const getAnimeInfo = async (animeId) => {
    let reqOptions = getReqOptions({ url: `info/${animeId}` })
    let response = await apiCall(reqOptions)
    return response.data
}
