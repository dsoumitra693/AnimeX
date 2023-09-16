import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import ModalView from '../Modal'
import { normalize } from '../../fontsNormalisation'

const EditModal = ({ onCompleted, ...props }) => {
    const [value, setValue] = useState('')
    const closeModal = () => {
        props.setModalVisible(prev => !prev)
        setValue('')
    }
    return (
        <ModalView {...props}>
            <TextInput
                style={styles.modalText}
                onChangeText={txt => setValue(txt)}
                value={value}
                placeholder='Type Here'
                placeholderTextColor={'#aaa'}
                autoFocus={true}
            />
            <View style={styles.buttonWrapper}>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                        closeModal()
                    }
                    }>
                    <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.buttonSave]}
                    onPress={() => {
                        onCompleted(value)
                        closeModal()
                    }}>
                    <Text style={styles.textStyle}>Save</Text>
                </Pressable>
            </View>
        </ModalView >
    )
}

export default EditModal

const styles = StyleSheet.create({
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10
    },
    buttonSave: {
        backgroundColor: '#FE9F01',
    },
    buttonClose: {
        backgroundColor: '#fff'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: normalize(16),
        fontFamily: 'CooperHewitt'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#fff',
        fontSize: normalize(18),
        fontFamily: 'CooperHewitt'
    },
})