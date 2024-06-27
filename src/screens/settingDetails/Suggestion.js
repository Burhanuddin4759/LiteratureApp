import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ExternalStylesheet from '../../enums/ExternalStylesheet'
import Header from '../../components/custom/Header'
import CustomInput from '../../components/reusable/CustomInput'
import CustomButton from '../../components/reusable/CustomButton'
import { COLOR } from '../../enums/Styleguides'
import HeaderWithBack from '../../components/custom/HeaderWithBack'
import { useSelector } from 'react-redux'

const Suggestion = ({ navigation }) => {

  const [suggestions, setSuggestions] = useState('')

  const reduxThemeData = useSelector((state) => state.reducer)

  return (
    <View style={ExternalStylesheet.container}>
      <View style={[styles.innerContainer, {
        backgroundColor: reduxThemeData
          ?
          COLOR.DARK_BLUE
          :
          COLOR.WHITE
      }]}>
        <HeaderWithBack
          title={'Suggestion'}
          onPress={() => navigation.goBack()}
        />
        <View style={[styles.inputView, {
          backgroundColor: reduxThemeData
            ?
            COLOR.DARK_BLUE
            :
            COLOR.WHITE,
          borderWidth: reduxThemeData
            ? 1 : 0.5,
          borderColor: reduxThemeData
            ? COLOR.ORANGE : null,
          color: reduxThemeData
            ? COLOR.GREY : null
        }]}>
          <CustomInput
            holder={'Write your Suggestions here...'}
            multiline={true}
            style={{
              height: '100%', textAlignVertical: 'top',
              backgroundColor: reduxThemeData
                ?
                COLOR.DARK_BLUE
                :
                COLOR.WHITE,
              color: reduxThemeData
                ? COLOR.GREY : null
            }}
            onChangeText={(txt) => setSuggestions(txt)}
            value={suggestions}
            placeholderTextColor={
              reduxThemeData
                ? COLOR.GREY : null
            }
          />
        </View>
        <View>
          <CustomButton
            title={'Send'}
            style={[ExternalStylesheet.btn, styles.btn]}
            fontstyle={styles.btnText}
          />
        </View>
      </View>
    </View>
  )
}

export default Suggestion

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    padding: 15
  },
  inputView: {
    height: Dimensions.get('screen').width,
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
    marginVertical: '2%'
  },
  btn: {
    backgroundColor: COLOR.ORANGE,
    height: 50,
    marginTop: '4%'
  },
  btnText: {
    color: COLOR.WHITE,
    fontSize: 16
  }
})