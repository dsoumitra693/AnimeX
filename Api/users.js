import { apiCall, createHeadersList, getReqOptionsFactoty } from "../apiConfig"

let headersList = createHeadersList()
let getReqOptions = getReqOptionsFactoty({
    baseUrl: 'https://anime-x-backend.vercel.app/user',
    headersList
})

const universalApiCaller = async ({ url, method, ...props }) => {
    let _reqOptions = getReqOptions({ url, method })
    let response = await apiCall({ ..._reqOptions, ...props })
    return response.data != undefined ? response.data : response
}

export const getUserDetails = async (reqOptions) =>
    await universalApiCaller({ url: '', method: 'GET', ...reqOptions });

export const updateUserDetails = async (reqOptions) =>
    await universalApiCaller({ url: 'update', method: 'PUT', ...reqOptions });



export const getFavAnime = async (reqOptions) =>
    await universalApiCaller({ url: 'fav-anime', method: 'GET', ...reqOptions });

export const updateFavAnime = async (reqOptions) =>
    await universalApiCaller({ url: 'fav-anime', method: 'PUT', ...reqOptions });

export const deleteFavAnime = async (reqOptions) =>
    await universalApiCaller({ url: 'fav-anime', method: 'DELETE', ...reqOptions });



export const getWatchList = async (reqOptions) =>
    await universalApiCaller({ url: 'watch-list', method: 'GET', ...reqOptions });

export const updateWatchList = async (reqOptions) =>
    await universalApiCaller({ url: 'watch-list', method: 'PUT', ...reqOptions });

export const deleteWatchList = async (reqOptions) =>
    await universalApiCaller({ url: 'watch-list', method: 'DELETE', ...reqOptions });

export const uploadProfileImg = async (reqOptions) =>
    await universalApiCaller({ url: 'upload/profile-img', method: 'POST', ...reqOptions })