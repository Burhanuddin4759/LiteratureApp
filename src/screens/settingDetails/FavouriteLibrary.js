import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExternalStylesheet from '../../enums/ExternalStylesheet'
import Header from '../../components/custom/Header'
import { useSelector } from 'react-redux'
import { COLOR } from '../../enums/Styleguides'
import TextLable from '../../components/reusable/TextLable'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KEYS } from '../../utils/keys'

const FavouriteLibrary = ({navigation}) => {

  const reduxThemeData = useSelector((state) => state.reducer)

  const [emptyData, setEmptyData] = useState(false)
  const [favData, setFavData] = useState([])
  const [user_id, setUserId] = useState('')
  const [token, setToken] = useState('')


  useEffect(() => {
    getUserIdandToken()
  }, [])

  useEffect(() => {
    if (user_id && token) {
      getFavouriteData()
    }
  }, [user_id, token])

  const getUserIdandToken = async () => {
    const userId = await AsyncStorage.getItem('@UserId')
    const token = await AsyncStorage.getItem(KEYS.AUTH_TOKEN)
    const jsonParseID = JSON.parse(userId)
    // console.log('Token===>', token)
    // console.log('userID===>', jsonParseID)
    if (userId == null && token == null) {
      setEmptyData(true)
    } else {
      setUserId(jsonParseID)
      setToken(token)
    }
  }

  const getFavouriteData = async () => {
    // console.log(token)
    try {
      const response = await fetch('https://dailydoseofwisdom.net/api/list-of-fav-horizons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: user_id
        }),
      })
      const json = await response.json()
      console.log(json)
      setFavData(json.data)
    } catch (error) {
      console.log('Error while fetching', error)
    }
  }

  const RenderView = ({ item }) => {
    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity style={styles.itemContainer}>
          <TextLable
            title={item.name}
            style={styles.itemTitle}
          />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={ExternalStylesheet.container}>
      <View style={[styles.innerContainer, {
        backgroundColor: reduxThemeData ? COLOR.DARK_BLUE : COLOR.WHITE
      }]}>
        <Header
          title={'Favourites'}
          onPress={()=>navigation.goBack()}
        />
        {
          emptyData
            ?
            <View style={styles.emptyDataView}>
              <TextLable
                title={'No data found'}
                style={{ color: reduxThemeData ? COLOR.GREY : null }}
              />
            </View>
            :
            <View style={styles.resultsContainer}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={favData}
                renderItem={RenderView}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
        }
      </View>
    </View>
  )
}

export default FavouriteLibrary

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    padding: 15
  },
  emptyDataView: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultsContainer: {
    marginTop: 10,
    flex: 1,
  },
  itemWrapper: {
    flex: 1,
    margin: 10,
  },
  itemContainer: {
    backgroundColor: COLOR.WHITE,
    height: 120,
    elevation: 4,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    color: COLOR.ORANGE,
    textAlign: 'center',
  }
})