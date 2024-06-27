import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../reusable/CustomButton'
import Svg from '../../assets/icons/svg'
import TextLable from '../reusable/TextLable'
import { COLOR } from '../../enums/Styleguides'
import { useSelector } from 'react-redux'

const Header = (props) => {

    const { onPress, title } = props

    const reduxThemeData = useSelector((state) => state.reducer)

    return (
        <View style={styles.header}>
            <CustomButton
                icon={reduxThemeData ? <Svg.WhiteSettingIcon /> : <Svg.SettingIcon />}
                onPress={onPress}
            />
            <TextLable
                title={title}
                style={[styles.titleStyle, { color: reduxThemeData ? COLOR.WHITE : COLOR.BLACK }]}
            />
            <CustomButton
                icon={<Svg.MaleIcon height={26} width={26} />}
            />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        paddingVertical: 10,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 17,
        color: COLOR.BLACK
    }
})