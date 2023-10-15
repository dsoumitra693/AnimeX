import * as FileSystem from 'expo-file-system'

export const imageTobase64 = async (url) => {
    let imgData = await FileSystem.readAsStringAsync(url, {
        encoding: 'base64',
    });
    return `data:image/png;base64,${imgData}`
}