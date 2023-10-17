import { apiCall, createHeadersList, getReqOptionsFactoty } from "./apiConfig"

let headersList = createHeadersList()
let getReqOptions = getReqOptionsFactoty({ baseUrl: 'https://consumet-mauve.vercel.app/anime/gogoanime', headersList })

const _apiCall = async (reqOptionsConfig, condition = true) => {
    let response = {}
    if (condition) {
        let reqOptions = getReqOptions(reqOptionsConfig)
        response = await apiCall(reqOptions)
        return response.data
    }
}


export const getStreamUrls = async (episodeId) => {
    const reqOptionsConfig = { url: `watch/${episodeId}`, method: 'GET' }
    let res = await _apiCall(reqOptionsConfig, episodeId)
    return res
}

export const searchAnime = async (searchQuery) => {
    const reqOptionsConfig = { url: searchQuery, method: 'GET' }
    let res = await _apiCall(reqOptionsConfig, searchQuery)
    console.log(res)
    return res.results
}

export const getTopAiringAimne = async () => await searchAnime('top-airing')

export const getAnimeInfo = async (animeId) => {
    const reqOptionsConfig = { url: `info/${animeId}`, method: 'GET' }
    let res = await _apiCall(reqOptionsConfig)
    return res.data
}
