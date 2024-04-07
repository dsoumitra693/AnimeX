import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { AuthContext } from '../context/auth'
import AvatarSection from '../components/ProfileComponents/AvatarSection'
import { normalize } from '../fontsNormalisation'
import { Feather } from '@expo/vector-icons';
import { EditModal, VideosList } from '../components'

let size = normalize(18)
const Profile = () => {
    let [state, setState] = useContext(AuthContext)
    let [onCompleted, setOnCompleted] = useState(() => () => { })
    const [modalVisible, setModalVisible] = useState(false)
    const updateLocalUser = useCallback((props) => {
        setState((prevData) => ({ ...prevData, user: { ...prevData.user, ...props } }));
    }, [setState]);

    const editName = (value) => {
        updateLocalUser({ name: value })
    }
    const editEmail = (value) => {
        updateLocalUser({ email: value.toLowerCase() })
    }


    return (<>
        <EditModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onCompleted={onCompleted}
        />
        <ImageBackground source={{ uri: 'https://i.pinimg.com/1200x/4b/b8/e9/4bb8e931640dcff50f8e670c86919e1b.jpg' }}
            style={styles.container} resizeMode='cover'>
            <View style={styles.darkBG} />
            <ScrollView contentContainerStyle={styles.profileSection}>
                <AvatarSection />
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.name} >{state.user.name || "Add your name"} </Text>
                    <Feather name={'edit-2'}
                        size={size}
                        color={'grey'} onPress={() => {
                            setModalVisible(true)
                            setOnCompleted(() => (args) => editName(args))
                        }} />
                </View>
                <View style={styles.userDeatils}>
                    <View style={styles.detailsSection}>
                        <View style={styles.details}>
                            <Feather name={'phone'}
                                size={size}
                                color={'grey'} />
                            <Text style={styles.text}>{state.user.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.detailsSection}>
                        <View style={styles.details}>
                            <Feather name={'mail'}
                                size={size}
                                color={'grey'} />
                            <Text style={styles.text}>{state.user.email || 'Add new email'}</Text>
                        </View>
                        <Feather name={'edit-2'}
                            size={size}
                            color={'grey'} onPress={() => {
                                setModalVisible(true)
                                setOnCompleted(() => (args) => editEmail(args))
                            }} />
                    </View>
                    <View style={styles.detailsSection}>
                        <View style={styles.details}>
                            <Feather name={'video'}
                                size={size}
                                color={'grey'} />
                            <Text style={styles.text}>{'change plan'}</Text>
                        </View>
                        <Feather name={'chevron-right'}
                            size={size}
                            color={'grey'} onPress={() => { }} />
                    </View>
                </View>
                <VideosList heading={'Watch list'} data={state?.user?.watchList} />
                {/* <VideosList heading={'Anime you liked'} data={state?.user?.favouriteAnime} /> */}
                <View style={styles.footer}>
                    <Text style={{ color: '#fff' }}>Copyright ©<Text style={{ color: '#FE9F01' }}>AnimeX</Text> 2023 All Rights Reserved</Text>
                </View>
            </ScrollView>
        </ImageBackground>
    </>
    )
}



export default Profile


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        height: '100%'
    },
    darkBG: {
        backgroundColor: '#000',
        height: '100%',
        width: '100%',
        opacity: 0.8,
        position: 'absolute'
    },
    profileSection: {
        alignItems: 'center',
        width: '100%',
        top: 100,
        paddingBottom: 150
    },
    name: {
        margin: 5,
        fontSize: normalize(20),
        color: '#fff'
    },
    userDeatils: {
        width: '80%',
        marginTop: 20,
    },
    detailsSection: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between'
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        width: '80%'
    },
    text: {
        fontSize: size,
        color: '#fff'
    },
    footer: {
        position: 'absolute',
        bottom: normalize(100),
    }
})