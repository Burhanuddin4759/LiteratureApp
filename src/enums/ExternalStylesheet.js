import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from './Styleguides'

const ExternalStylesheet = StyleSheet.create({

    container: {
        flex: 1,
        // backgroundColor:COLOR.WHITE
    },
    btn:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12
    },
    input:{
        paddingHorizontal:10,
        backgroundColor:COLOR.WHITE,
        height:49,
    }

})

export default ExternalStylesheet

