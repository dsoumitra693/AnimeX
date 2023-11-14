import { apiCall, createHeadersList, getReqOptionsFactoty } from "./apiConfig"

let headersList = createHeadersList()
const baseUrl = 'https://api.consumet.org/anime/gogoanime'
// const baseUrl = 'https://api.consumet.org/anime/gogoanime'

let getReqOptions = getReqOptionsFactoty({ baseUrl, headersList })
const _apiCall = async (reqOptionsConfig, condition = true) => {
    let response = {}
    if (condition) {
        let reqOptions = getReqOptions(reqOptionsConfig)
        response = await apiCall(reqOptions)
        return response
    }
}


export const getStreamUrls = async (episodeId) => {
    const reqOptionsConfig = { url: `watch/${episodeId}`, method: 'GET' }
    let res = await _apiCall(reqOptionsConfig, episodeId)
    return res.data
}

export const searchAnime = async (searchQuery) => {
    const reqOptionsConfig = { url: searchQuery, method: 'GET' }
    let res = await _apiCall(reqOptionsConfig, searchQuery)
    return res.data.results
}

export const getTopAiringAimne = async () => await searchAnime('top-airing')

export const getAnimeInfo = async (animeId) => {
    const reqOptionsConfig = { url: `info/${animeId}`, method: 'GET' }
    let res = await _apiCall(reqOptionsConfig)
    return res.data
}
