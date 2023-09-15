import { StyleSheet, View } from 'react-native'
import React from 'react'
import Avatar from '../Avatar'
import { defaultProfileImg } from '../../constants'
import Icon from 'react-native-vector-icons/Feather'

const AvatarSection = () => {
    const changeProfileImg = () => { }
    return (
        <View style={styles.avatarWrapper} onPress={changeProfileImg}>
            <Avatar
                source={{ uri: defaultProfileImg }}
                size={80}
            />
            <View style={styles.iconWrapper}>
                <Icon name={'camera'}
                    size={20}
                    color={'grey'}
                    style={styles.editBtn} />
            </View>
        </View>
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