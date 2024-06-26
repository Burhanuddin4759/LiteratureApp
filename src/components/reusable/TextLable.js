import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TextLable = (props) => {
    const {title, style} = props
  return (
    <Text style={style}>
        {title}
    </Text>
  )
}

export default TextLable

const styles = StyleSheet.create({})