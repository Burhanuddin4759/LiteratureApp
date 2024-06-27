import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import ExternalStylesheet from '../../enums/ExternalStylesheet'

const CustomInput = (props) => {
  const { holder, onChangeText, value, style, multiline, numberOfLines, secureTextEntry, placeholderTextColor } = props
  return (
    <TextInput
      style={[ExternalStylesheet.input, style]}
      placeholder={holder}
      onChangeText={onChangeText}
      value={value}
      multiline={multiline && multiline}
      numberOfLines={numberOfLines && numberOfLines}
      secureTextEntry={secureTextEntry && secureTextEntry}
      placeholderTextColor={placeholderTextColor && placeholderTextColor}
    />
  )
}

export default CustomInput

const styles = StyleSheet.create({})