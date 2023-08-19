import { apiCall,createHeadersList, getReqOptionsFactoty } from "./apiConfig"

let headersList = createHeadersList()
let getReqOptions = getReqOptionsFactoty({baseUrl: 'https://api.consumet.org/anime/gogoanime', headersList})

export const getStreamUrls = async (episodeId) => {
    if (episodeId) {
        let reqOptions = getReqOptions({ url: `watch/${episodeId}`, method:'GET' })
        let response = await apiCall(reqOptions)
        return response.data
    }
}

export const searchAnime = async (searchQuery) => {
    if (searchQuery) {
        let reqOptions = getReqOptions({ url: searchQuery, method:'GET' })
        let response = await apiCall(reqOptions)
        return response.data.results
    }
}

export const getTopAiringAimne = async () => await searchAnime('top-airing')

export const getAnimeInfo = async (animeId) => {
    let reqOptions = getReqOptions({ url: `info/${animeId}`, method:'GET' })
    let response = await apiCall(reqOptions)
    return response.data
}
