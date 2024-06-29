import { Dimensions, FlatList, ScrollView, Share, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CustomButton from '../../components/reusable/CustomButton'
import { COLOR } from '../../enums/Styleguides'
import ExternalStylesheet from '../../enums/ExternalStylesheet'
import Svg from '../../assets/icons/svg'
import TextLable from '../../components/reusable/TextLable'
import { useSelector } from 'react-redux'
import Clipboard from '@react-native-clipboard/clipboard'
import Snackbar from 'react-native-snackbar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KEYS } from '../../utils/keys'

const Preferences = (props) => {

    const { subCategories, againCall } = props
    // console.log('This is Props', subCategories)

    const [user_id, setUserId] = useState('')
    const [token, setToken] = useState('')
    const [guestMode, SetGuestMode] = useState(false)

    useEffect(() => {
        getUserIdandToken()
    }, [user_id, token])

    const getUserIdandToken = async () => {
        const user_id = await AsyncStorage.getItem('@UserId')
        const token = await AsyncStorage.getItem(KEYS.AUTH_TOKEN)
        const jsonParseID = JSON.parse(user_id)
        if (token && jsonParseID) {
            setUserId(jsonParseID)
            setToken(token)
        }
        else {
            SetGuestMode(true)
        }
        // console.log('=-=-=-==-=', token, user_id)
    }

    const flatListRef = useRef(null)
    const reduxThemeData = useSelector((state) => state.reducer)

    const copyClipboard = (description) => {
        Clipboard.setString(description)
        Snackbar.show({
            text: 'Copied'
        })
    }

    const shareItem = useCallback(async (item) => {
        try {
            await Share.share({
                message: `${item.name}\n\n${item.description}`
            })
        } catch (error) {
            console.log('error while sharing', error)
        }
    }, [])

    const handleLike = async (item) => {
        if (guestMode == true) {
            Snackbar.show({
                text: 'First Signup',
            })
        }
        else {
            const horizon_id = item.id
            // console.log('this item is liked===>', item)
            console.log(user_id, item?.id)
            try {
                const response = await fetch('https://dailydoseofwisdom.net/api/like-horizon', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        user_id: user_id,
                        horizon_id: horizon_id
                    })
                })
                const json = await response.json()
                console.log(json)
                console.log('like===>', json)
                againCall()
            } catch (error) {
                console.log('Error while liking', error)
            }
        }
    }

    // const handleFav = async (id) => {
    //     const horizon_id = id
    //     try {
    //         const response = await fetch('https://dailydoseofwisdom.net/api/favorite-horizon', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`
    //             },
    //             body: JSON.stringify({
    //                 user_id: user_id,
    //                 horizon_id: horizon_id
    //             })
    //         })
    //         const json = await response.json()
    //         console.log('Fav===>', json)
    //     } catch (error) {
    //         console.log('Error while Add to Fav', error)
    //     }
    // }

    const renderView = ({ item, index }) => {
        // console.log('This is whole item likes==>', item.like)

        return (
            <View style={styles.itemContainer}>
                <View style={[styles.container, {
                    backgroundColor:
                        reduxThemeData
                            ?
                            COLOR.DARK_BLUE_2
                            :
                            COLOR.WHITE
                }]}>
                    <View style={styles.itemHeaderView}>
                        <TextLable
                            title={item.name}
                            style={[styles.itemTitle, {
                                color: reduxThemeData
                                    ?
                                    COLOR.LIGHT_GREY
                                    :
                                    COLOR.BLACK
                            }]}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Svg.RedHeart />
                            <TextLable
                                title={item.likes}
                                style={[styles.itemLikesQty, {
                                    color: reduxThemeData ?
                                        COLOR.GREY : COLOR.BLACK
                                }]}
                            />
                        </View>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <TextLable
                            title={item.description}
                            style={{
                                fontSize: 14,
                                color: reduxThemeData ? COLOR.GREY : null
                            }}
                        />
                    </ScrollView>
                    <View style={styles.btnRowsView}>
                        <TextLable
                            title={`${index + 1}/${subCategories.length}`}
                            style={{ color: COLOR.LIGHT_GREY, marginHorizontal: 5, textAlign: 'center' }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CustomButton
                                icon={<Svg.UnBookmark height={18} width={18} />}
                                style={{ marginHorizontal: 2, }}
                            // onPress={() => handleFav(item)}
                            />
                            <CustomButton
                                icon={item?.like
                                    ?
                                    <Svg.RedHeart height={18} width={18} />
                                    :
                                    <Svg.Heart height={18} width={18} />
                                }
                                style={{ marginHorizontal: 2 }}
                                onPress={() => handleLike(item)}
                            />
                            <CustomButton
                                icon={<Svg.Share height={18} width={18} />}
                                style={{ marginHorizontal: 2 }}
                                onPress={() => shareItem(item)}
                            />
                            <CustomButton
                                icon={<Svg.Clipboard height={18} width={18} />}
                                style={{ marginLeft: 2 }}
                                onPress={() => copyClipboard(item.description)}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CustomButton
                        title={'Previous'}
                        style={[ExternalStylesheet.btn, styles.btn, { marginRight: 10 }]}
                        fontstyle={{ color: '#fff' }}
                        onPress={() => {
                            if (index > 0) {
                                flatListRef.current.scrollToIndex({ index: index - 1 })
                            }
                        }}
                    />
                    <CustomButton
                        title={'Next'}
                        style={[ExternalStylesheet.btn, styles.btn]}
                        fontstyle={{ color: '#fff' }}
                        onPress={() => {
                            if (index < subCategories.length - 1) {
                                flatListRef.current.scrollToIndex({ index: index + 1 })
                            }
                        }}
                    />
                </View>
            </View>
        )
    }

    // console.log(jsonRes)
    // console.log(JSON.stringify(subCategories[0]))

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={subCategories}
                renderItem={renderView}
                pagingEnabled
                horizontal
                ref={flatListRef}
                scrollEnabled={false}
            />
        </View>
    )
}

export default Preferences

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
        height: Dimensions.get('screen').width * 1.25,
        // backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 4,
        padding: 15
    },
    itemContainer: {
        flex: 1,
        margin: 7,
        width: Dimensions.get('screen').width * 0.87
    },
    itemHeaderView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemTitle: {
        fontWeight: '800',
        fontSize: 15
    },
    itemLikesQty: {
        fontSize: 10,
        marginLeft: 2,
        alignSelf: 'flex-start'
    },
    btnRowsView: {
        flexDirection: 'row',
        marginTop: 2,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    btn: {
        flex: 1,
        backgroundColor: COLOR.BLUE,
        height: 50
    },

})