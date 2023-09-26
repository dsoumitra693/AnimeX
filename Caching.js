import shorthash from "shorthash"
import * as FileSystem from 'expo-file-system'


export const Caching = async (url) => {
    const name = shorthash.unique(url)
    const path = `${FileSystem.cacheDirectory}${name}`

    const data = await FileSystem.getInfoAsync(path)
    if (data.exists) return data

    const newData = await FileSystem.downloadAsync(url, path)
    return newData
}