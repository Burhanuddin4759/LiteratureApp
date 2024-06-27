import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../reusable/CustomButton'
import Svg from '../../assets/icons/svg'
import TextLable from '../reusable/TextLable'
import { COLOR } from '../../enums/Styleguides'
import { useSelector } from 'react-redux'

const HeaderWithBack = (props) => {

    const { onPress, title } = props

    const reduxThemeData = useSelector((state) => state.reducer)

    return (
        <View style={styles.header}>
            <CustomButton
                icon={reduxThemeData ? <Svg.BackArrowWhite /> : <Svg.BackArrow />}
                onPress={onPress}
                style={{ flex: 1 }}
            />
            <TextLable
                title={title}
                style={[styles.titleStyle, { color: reduxThemeData ? COLOR.WHITE : COLOR.BLACK }]}
            />
            <View style={{ flex: 0.5 }}>
            </View>
        </View>
    )
}

export default HeaderWithBack

const styles = StyleSheet.create({
    header: {
        paddingVertical: 10,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 17,
        flex: 1.5,
    }
})