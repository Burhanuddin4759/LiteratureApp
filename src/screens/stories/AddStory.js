import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextLable from '../../components/reusable/TextLable'
import CustomInput from '../../components/reusable/CustomInput'
import CustomButton from '../../components/reusable/CustomButton'
import ExternalStylesheet from '../../enums/ExternalStylesheet'
import { COLOR } from '../../enums/Styleguides'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KEYS } from '../../utils/keys'
import Snackbar from 'react-native-snackbar'

const AddStory = (props) => {

    const { category_id, sub_category_id } = props

    const reduxThemeData = useSelector((state) => state.reducer)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [guestMode, SetGuestMode] = useState(false)

    const [user_id, setUserId] = useState('')
    const [token, setToken] = useState('')

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
    }

    const postStory = async () => {
        if (guestMode == true) {
            Snackbar.show({
                text: 'First Signup'
            })
        } else {
            try {
                if (title && content) {
                    const response = await fetch('https://dailydoseofwisdom.net/api/create-horizon', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            user_id: user_id,
                            category_id: category_id,
                            sub_category_id: sub_category_id,
                            name: title,
                            description: content
                        })
                    })
                    const jsonRes = await response.json()
                    if (jsonRes.success == true) {
                        Snackbar.show({
                            text: 'Post added succesfully'
                        })
                        setContent(''), setTitle('')
                    }
                }
                else {
                    Snackbar.show({
                        text: 'Please fill data'
                    })
                }

            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.innerContainer, {
                backgroundColor: reduxThemeData
                    ?
                    COLOR.DARK_BLUE_2
                    :
                    COLOR.WHITE
            }]}>
                <TextLable
                    title={'Add Title'}
                    style={[styles.titleFont, {
                        color: reduxThemeData
                            ?
                            COLOR.GREY
                            :
                            COLOR.BLACK,
                        fontWeight: 'bold'
                    }]}
                />
                <CustomInput
                    holder={'Enter here...'}
                    style={[styles.titleInput, {
                        backgroundColor: reduxThemeData
                            ?
                            COLOR.DARK_BLUE_2
                            :
                            COLOR.WHITE,
                        borderWidth: reduxThemeData
                            ? 1 : 0.5,
                        borderColor: reduxThemeData
                            ? COLOR.ORANGE : null,
                        color: reduxThemeData
                            ? COLOR.GREY : null
                    }]}
                    placeholderTextColor={
                        reduxThemeData
                            ? COLOR.GREY : null
                    }
                    onChangeText={(txt) => setTitle(txt)}
                    value={title}
                />
                <View style={styles.contentContainer}>
                    <TextLable
                        title={'Add Content'}
                        style={[styles.titleFont, {
                            color: reduxThemeData
                                ?
                                COLOR.GREY
                                :
                                COLOR.BLACK,
                            fontWeight: 'bold'
                        }]}
                    />
                    <CustomInput
                        holder={'Enter here...'}
                        style={[styles.contentInput, {
                            backgroundColor: reduxThemeData
                                ?
                                COLOR.DARK_BLUE_2
                                :
                                COLOR.WHITE,
                            borderWidth: reduxThemeData
                                ? 1 : 0.5,
                            borderColor: reduxThemeData
                                ? COLOR.ORANGE : null,
                            color: reduxThemeData
                                ? COLOR.GREY : null
                        }]}
                        multiline={true}
                        numberOfLines={20}
                        placeholderTextColor={
                            reduxThemeData
                                ? COLOR.GREY : null
                        }
                        onChangeText={(txt) => setContent(txt)}
                        value={content}
                    />
                </View>
            </View>
            <View>
                <CustomButton
                    title={'Post story'}
                    style={[ExternalStylesheet.btn, { backgroundColor: COLOR.BLUE, height: 50 }]}
                    fontstyle={{ color: COLOR.WHITE }}
                    onPress={postStory}
                />
            </View>
        </View>
    )
}

export default AddStory

const styles = StyleSheet.create({
    innerContainer: {
        flex: 0.7,
        padding: 15,
        marginVertical: 12,
        borderRadius: 12,
        elevation: 4, height: Dimensions.get('screen').width
    },
    titleInput: {
        borderWidth: 0.5,
        borderRadius: 12
    },
    contentContainer: {
        flex: 1,
        marginTop: 10
    },
    contentInput: {
        // borderWidth: 0.5,
        borderRadius: 12,
        flex: 1,
        textAlignVertical: 'top'
    },
    titleFont: {
        // color: COLOR.BLACK,
        marginBottom: 4
    }
})