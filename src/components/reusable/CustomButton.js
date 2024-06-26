import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = (props) => {
  const { title, onPress, style, fontstyle, icon } = props

  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
    >
      {
        icon
          ?
          icon
          :
          <Text style={fontstyle}>
            {title}
          </Text>
      }
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({})