import { Pressable, StyleSheet, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import ModalView from '../Modal'
import { normalize } from '../../fontsNormalisation'

const EditModal = ({ text, onCompleted, ...props }) => {
    const [value, setValue] = useState('')
    return (
        <ModalView {...props}>
            <TextInput
                style={styles.modalText}
                placeholder={text}
                onChangeText={txt => setValue(txt)}
                value={value}
            />
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                    console.info(onCompleted)
                    onCompleted()?.(value)
                    props.setModalVisible(prev => !prev)
                }
                }>
                <Text style={styles.textStyle}>Save</Text>
            </Pressable>
        </ModalView >
    )
}

export default EditModal

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#FE9F01',
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