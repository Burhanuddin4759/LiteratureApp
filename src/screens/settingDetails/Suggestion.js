import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExternalStylesheet from '../../enums/ExternalStylesheet'
import Header from '../../components/custom/Header'
import CustomInput from '../../components/reusable/CustomInput'
import CustomButton from '../../components/reusable/CustomButton'
import { COLOR } from '../../enums/Styleguides'
import HeaderWithBack from '../../components/custom/HeaderWithBack'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KEYS } from '../../utils/keys'
import { useNavigation } from '@react-navigation/native'
import Snackbar from 'react-native-snackbar'

const Suggestion = ({ route }) => {

  const { user } = route.params;
  // console.log(user)

  const navigation = useNavigation()

  const [suggestions, setSuggestions] = useState('')
  const [user_id, setUserId] = useState('')
  const [token, setToken] = useState('')

  const reduxThemeData = useSelector((state) => state.reducer)


  const getUserIdandToken = async () => {
    const user_id = await AsyncStorage.getItem('@UserId')
    const token = await AsyncStorage.getItem(KEYS.AUTH_TOKEN)
    const jsonParseID = JSON.parse(user_id)
    setToken(token)
    setUserId(jsonParseID)
  }

  useEffect(() => {
    getUserIdandToken()
  }, [user_id, token])

  const sendSuggestion = async () => {
    try {
      if (suggestions) {
        const response = await fetch("https://dailydoseofwisdom.net/api/create-suggestion", {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            user_id: user_id,
            full_name: user.full_name,
            email: user.email,
            suggestion: suggestions
          })
        }
        )
        const jsonRes = await response.json()
        if (jsonRes.success == true) {
          console.log('json=>posting', jsonRes)
          setSuggestions('')
        }
      } else {
        Snackbar.show({
          text: 'Enter Suggestion..'
        })
      }
    } catch (error) {
      console.log('Error while sending suggestion===>', error)
    }
  }

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
            onPress={() => sendSuggestion()}
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