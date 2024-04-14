import {unique} from "./hashing"
import * as FileSystem from 'expo-file-system'


export const Caching = async (url:string) => {
    const name = unique(url)
    const path = `${FileSystem.cacheDirectory}${name}`

    const data = await FileSystem.getInfoAsync(path)
    if (data.exists) return data

    const newData = await FileSystem.downloadAsync(url, path)
    return newData
}