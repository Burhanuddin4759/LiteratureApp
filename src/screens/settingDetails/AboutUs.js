import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExternalStylesheet from '../../enums/ExternalStylesheet'
import HeaderWithBack from '../../components/custom/HeaderWithBack'
import TextLable from '../../components/reusable/TextLable'
import { En } from '../../locales/En'
import { useSelector } from 'react-redux'
import { COLOR } from '../../enums/Styleguides'

const AboutUs = ({ navigation }) => {

  const reduxThemeData = useSelector((state) => state.reducer)

  return (
    <View style={ExternalStylesheet.container}>
      <View style={[styles.innerContainer, {
        backgroundColor: reduxThemeData ? COLOR.DARK_BLUE : COLOR.WHITE
      }]}>
        <HeaderWithBack
          title={'About us'}
          onPress={() => navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <TextLable
              title={En.About_Us}
              style={{ color: reduxThemeData ? COLOR.GREY : null }}
            />
            <TextLable
              title={'Developed by: Burhan ud din'}
              style={{ color: COLOR.ORANGE, fontWeight: '600', textAlign: 'center' }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default AboutUs

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    padding: 15
  }
})