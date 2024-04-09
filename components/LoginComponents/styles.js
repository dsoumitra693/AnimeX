import { StatusBar, StyleSheet } from "react-native";
import { normalize } from "../../fontsNormalisation";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#444',
        alignItems: 'center',
        flexDirection: "column",
        justifyContent:"flex-end"
    },
    authWrapper: {
        width: '90%',
        height: 250,
        position: 'absolute',
        backgroundColor: '#222222',
        position:'relative',
        bottom:0,
        borderTopLeftRadius: 250 / 20,
        borderTopRightRadius: 250 / 20,
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: 30,
    },
    inputWrapper: {
        width: '90%',
        height: 50,
        backgroundColor: '#444444',
        overflow: 'hidden',
        borderRadius: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inputField: {
        width: '100%',
        fontSize: normalize(18),
        color: "#ffffff",
    },
    authBtn: (isDisabled) => ({
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FE9F01',
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: '15%',
        marginTop: 10,
        opacity: isDisabled ? 0.5 : 1,
    }),
    authBtnTitle: {
        fontSize: normalize(20),
        color: "#fff"
    },
    footer: {
        padding: 15
    },
    footertext: {
        fontSize: 14,
        color: '#666666'
    },
    footerLink: {
        textDecorationLine: 'underline'
    },
    msg: {
        paddingVertical: 7,
        paddingBottom: 3,
        justifyContent: 'center',
        flexDirection: 'row',
        color: '#ffffff'
    },
    msgtext: {
        fontSize: 14,
        color: '#ffffff',
    },
    msgHighlight: {
        fontWeight: 900
    },
    msgTextBtn: {
        marginLeft: 10,
        color: '#0271f7'
    },
    resendBtn: (isDisabled) => ({
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: '15%',
        marginTop: 10,
        opacity: isDisabled ? 0.5 : 1,
    }),
    skipSection:{
        backgroundColor: '#444444',
        overflow: 'hidden',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical:8,
        flexDirection: 'row',
        position: 'absolute',
        top:StatusBar.currentHeight,
        right:10
    }
})

