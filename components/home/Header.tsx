import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const Header = () => {
    const router = useRouter()
    return (
        <TouchableOpacity style={styles.wrapper} onPress={()=>{
            router.push("/search/")
        }}>
            <View style={styles.left}>
                <FontAwesome name="search" size={30} color={"#fff"} />
            </View>
        </TouchableOpacity>
    )
}

export default Header

const styles = StyleSheet.create({
    wrapper: {
        top: StatusBar.currentHeight as number - 25,
        padding: 20,
        justifyContent: 'center',
    },
    left: {
        width: 50,
        aspectRatio: 1,
        backgroundColor: "rgba(255,255,255,0.5)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.9,
        shadowRadius: 4.65,

        elevation: 9,
    }
})