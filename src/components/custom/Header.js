import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../reusable/CustomButton'
import Svg from '../../assets/icons/svg'
import TextLable from '../reusable/TextLable'
import { COLOR } from '../../enums/Styleguides'

const Header = (props) => {

    const { onPress, title } = props

    return (
        <View style={styles.header}>
            <CustomButton
                icon={<Svg.SettingIcon />}
                onPress={onPress}
            />
            <TextLable
                title={title}
                style={styles.titleStyle}
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
        justifyContent: 'space-between'
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 17,
        color: COLOR.BLACK
    }
})