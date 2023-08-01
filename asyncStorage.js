import AsyncStorage from "@react-native-async-storage/async-storage"

let ITEM_NAME = 'animex-auth'


export const saveToAsyncStorage = async (data) => {
    let DATA = JSON.stringify(data)
    await AsyncStorage.setItem(ITEM_NAME, DATA)
}

export const loadFromAsyncStorage = async () => {
    let data = await AsyncStorage.getItem(ITEM_NAME)
    const parsed = JSON.parse(data)
    return parsed
}

export const deleteFromAsyncStorage = async () => {
    await AsyncStorage.removeItem(ITEM_NAME)
}