import { StyleSheet } from "react-native";
import { normalize } from '../fontsNormalisation'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#444',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column"
    },
    authWrapper: {
        width: '90%',
        height: 260,
        position: 'absolute',
        backgroundColor: '#222222',
        bottom: 0,
        borderTopLeftRadius: 250 / 20,
        borderTopRightRadius: 250 / 20,
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: 30,
    },
    inputWrapper: {
        width: '80%',
        height: 50,
        backgroundColor: '#444444',
        overflow: 'hidden',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    inputField: {
        width: '100%',
        height: '100%',
        fontSize: normalize(18),
        fontFamily: 'CooperHewitt',
        color: "#ffffff"
    },
    authBtn: (isDisabled) => ({
        width: '80%',
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
        fontFamily: 'CooperHewitt',
        fontSize: normalize(20),
        color: "#fff"
    },
    footer: {
        padding: 15
    },
    footertext: {
        fontSize: 14,
        fontFamily: 'CooperHewitt',
        color: '#666666'
    },
    footerLink: {
        textDecorationLine: 'underline'
    },
    msg: {
        padding: 7,
        paddingBottom:3,
    },
    msgtext: {
        fontSize: 14,
        fontFamily: 'CooperHewitt'
    },
    msgHighlight: {
        fontFamily: 'CooperHewitt',
        fontWeight: 900
    }, 
    resendBtn: (isDisabled) => ({
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: '15%',
        marginTop: 10,
        opacity: isDisabled ? 0.5 : 1,
    }),
})