import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import Avatar from '../Avatar'
import { defaultProfileImg } from '../../constants'
import Icon from 'react-native-vector-icons/Feather'
import * as Picker from 'expo-image-picker';
import { AuthContext } from '../../context/auth'
import { imageTobase64 } from './imageTOBase64'
import { uploadProfileImg } from '../../Api/users'
import { showToast } from '../../utils'

const AvatarSection = () => {
    let [state, setState] = useContext(AuthContext)

    const updateLocalUser = useCallback((props) => {
        setState((prevData) => ({ ...prevData, user: { ...prevData.user, ...props } }));
    }, [setState]);

    const headersList = {
        Accept: '*/*',
        authorization: state.token,
        'Content-Type': 'application/octet-stream',
    };


    const uploader = async (bodyContent) => {
        showToast('Changing your profile image!')
        try {
            let response = await uploadProfileImg({
                headers: headersList,
                data: bodyContent,
            });
            updateLocalUser({ profileImgUrl: response.profileImg });
            showToast('Looks great!')
        } catch (error) {
            showToast('An error occurs')
        }
    }
    const changeProfileImg = async () => {
        let result = await Picker.launchImageLibraryAsync({
            mediaTypes: Picker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            let url = result.assets[0].uri
            let base64Img = await imageTobase64(url)
            const bodyContent = JSON.stringify({
                profileImg: base64Img
            });
            uploader(bodyContent)
        }
    }
    return (
        <TouchableOpacity style={styles.avatarWrapper} onPress={changeProfileImg}>
            <Avatar
                size={80} source={{
                    uri: state.user.profileImgUrl
                        || defaultProfileImg
                }}
            />
            <View style={styles.iconWrapper}>
                <Icon name={'camera'}
                    size={20}
                    color={'grey'}
                    style={styles.editBtn} />
            </View>
        </TouchableOpacity>
    )
}

export default AvatarSection

const styles = StyleSheet.create({
    avatarWrapper: {
        width: 90,
        height: 90,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
    },
    editBtn: {
    },
    iconWrapper: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        backgroundColor: '#111',
        borderRadius: 15,
        bottom: 5,
        right: 5,
    }

})