import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ExternalStylesheet from '../../enums/ExternalStylesheet'
import HeaderWithBack from '../../components/custom/HeaderWithBack'
import { useSelector } from 'react-redux'
import { COLOR } from '../../enums/Styleguides'
import Svg from '../../assets/icons/svg'
import TextLable from '../../components/reusable/TextLable'
import CustomButton from '../../components/reusable/CustomButton'
import CustomInput from '../../components/reusable/CustomInput'

const EditProfile = ({ navigation }) => {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const reduxThemeData = useSelector((state) => state.reducer)

  return (
    <View style={[ExternalStylesheet.container, {
      backgroundColor: reduxThemeData ? COLOR.DARK_BLUE : COLOR.WHITE
    }]}>
      <View style={[styles.innerContainer, {
        backgroundColor: reduxThemeData ? COLOR.DARK_BLUE : COLOR.WHITE
      }]}>
        <HeaderWithBack
          title={'Personal Info'}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.accountContainer}>
          <CustomButton style={[styles.profileIcon, { backgroundColor: reduxThemeData ? COLOR.ORANGE : COLOR.DARK_BLUE_2 }]}
            icon={
              <Svg.MaleIcon
                height={80}
                width={80}
              />
            }
          />
          <CustomButton
            icon={<Svg.EditIcon height={18} width={18} />}
            style={[ExternalStylesheet.btn, { height: 35, width: 35, backgroundColor: COLOR.GREY, borderRadius: 8, marginHorizontal: -20 }]}
          />
        </View>
        <View style={styles.inputMainView}>
          <TextLable
            title="Name"
            style={{
              color: reduxThemeData
                ? COLOR.GREY
                : COLOR.BLACK
            }}
          />
          <View style={[styles.inputView, {
            backgroundColor: reduxThemeData
              ? COLOR.DARK_BLUE_2
              : COLOR.WHITE,
            borderWidth: reduxThemeData
              ? 0.5 : 0.5,
            borderColor: reduxThemeData
              ? COLOR.ORANGE : null,
            color: reduxThemeData
              ? COLOR.GREY : null
          }]}>
            <CustomInput
              holder="Burhan ud din"
              style={{
                flex: 1,
                backgroundColor: reduxThemeData
                  ? COLOR.DARK_BLUE_2
                  : COLOR.WHITE,
                color: reduxThemeData
                  ? COLOR.GREY : null
              }}
              onChangeText={(txt) => setName(txt)}
              value={name}
              placeholderTextColor={
                reduxThemeData
                  ? COLOR.GREY : null
              }
            />
          </View>
          <TextLable
            title="Current password"
            style={{
              color: reduxThemeData
                ? COLOR.GREY
                : COLOR.BLACK
            }}
          />
          <View style={[styles.inputView, {
            backgroundColor: reduxThemeData
              ? COLOR.DARK_BLUE_2
              : COLOR.WHITE,
            borderWidth: reduxThemeData
              ? 0.5 : 0.5,
            borderColor: reduxThemeData
              ? COLOR.ORANGE : null,
            color: reduxThemeData
              ? COLOR.GREY : null
          }]}>
            <CustomInput
              holder="Enter your password"
              style={{
                flex: 1,
                backgroundColor: reduxThemeData
                  ? COLOR.DARK_BLUE_2
                  : COLOR.WHITE,
                color: reduxThemeData
                  ? COLOR.GREY : null
              }}
              onChangeText={(txt) => setPassword(txt)}
              value={password}
              placeholderTextColor={
                reduxThemeData
                  ? COLOR.GREY : null
              }
            />
          </View>
          <TextLable
            title="New password"
            style={{
              color: reduxThemeData
                ? COLOR.GREY
                : COLOR.BLACK
            }}
          />
          <View style={[styles.inputView, {
            backgroundColor: reduxThemeData
              ? COLOR.DARK_BLUE_2
              : COLOR.WHITE,
            borderWidth: reduxThemeData
              ? 0.5 : 0.5,
            borderColor: reduxThemeData
              ? COLOR.ORANGE : null,
            color: reduxThemeData
              ? COLOR.GREY : null
          }]}>
            <CustomInput
              holder="Enter your password"
              style={{
                flex: 1,
                backgroundColor: reduxThemeData
                  ? COLOR.DARK_BLUE_2
                  : COLOR.WHITE,
                color: reduxThemeData
                  ? COLOR.GREY : null
              }}
              onChangeText={(txt) => setConfirmPassword(txt)}
              value={confirmPassword}
              placeholderTextColor={
                reduxThemeData
                  ? COLOR.GREY : null
              }
            />
          </View>
          <TextLable
            title={'Password must have at least one lowercase, one uppercase, one symbol & one numeric character'}
            style={{ fontSize: 14, textAlign: 'justify', color: COLOR.ORANGE }}
          />
        </View>
      </View>
      <CustomButton
        title={'Update Profile'}
        style={[ExternalStylesheet.btn, { backgroundColor: COLOR.ORANGE, height: 50, margin: 15 }]}
        fontstyle={{ color: '#fff', fontSize: 16 }}
      />
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    padding: 15
  },
  accountContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
    alignItems: 'flex-end'
  },
  profileIcon: {
    height: 120,
    width: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMainView: {
    marginVertical: 5,
  },
  inputView: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
})