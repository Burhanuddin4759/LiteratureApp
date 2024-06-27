import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../enums/Styleguides'
import TextLable from '../../components/reusable/TextLable'
import CustomButton from '../../components/reusable/CustomButton'
import ExternalStylesheet from '../../enums/ExternalStylesheet'
import { useSelector } from 'react-redux'

const DeleteAccount = (props) => {

    const { visible, onDeletePress, onCancelPress } = props

    const reduxThemeData = useSelector((state) => state.reducer)

    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: 240, width: 280, backgroundColor: reduxThemeData ? COLOR.DARK_BLUE_2 : COLOR.WHITE, alignItems: 'center', justifyContent: 'space-evenly', borderRadius: 16, elevation: 2 }}>
                    <TextLable
                        title={'Are you sure you want to\ndelete this account'}
                        style={{ textAlign: 'center', color: reduxThemeData ? COLOR.LIGHT_GREY : COLOR.BLACK }}
                    />
                    <CustomButton
                        title={'Delete'}
                        style={[ExternalStylesheet.btn, { backgroundColor: COLOR.DARK_BLUE, height: 45, width: '50%' }]}
                        fontstyle={{ color: COLOR.LIGHT_GREY }}
                        onPress={onDeletePress}
                    />
                    <CustomButton
                        title={'Cancel'}
                        style={[ExternalStylesheet.btn, { backgroundColor: COLOR.ORANGE, height: 40, width: '50%', marginTop: -15 }]}
                        fontstyle={{ color: COLOR.LIGHT_GREY }}
                        onPress={onCancelPress}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default DeleteAccount

const styles = StyleSheet.create({})