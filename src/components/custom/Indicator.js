import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../enums/Styleguides'

const Indicator = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                size={'large'}
                color={COLOR.ORANGE}
            />
        </View>
    )
}

export default Indicator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})