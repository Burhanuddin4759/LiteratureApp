import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExternalStylesheet from '../../enums/ExternalStylesheet'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/custom/Header'
import CustomButton from '../../components/reusable/CustomButton'
import { COLOR } from '../../enums/Styleguides'
import Preferences from './Preferences'
import AddStory from './AddStory'
import Indicator from '../../components/custom/Indicator'

const HorizonCategories = ({ route }) => {

    const { category_id, sub_category_id } = route.params;
    // console.log('route===>', route.params)

    const navigation = useNavigation()

    const [show, setShow] = useState(0)

    const preferences = () => {
        setShow(0)
    }
    const addStory = () => {
        setShow(1)
    }

    useEffect(() => {
        getHorizonCategories()
    }, [route.params])

    const [showIndicator, setShowIndicator] = useState(true)
    const [subCategories, setSubCategories] = useState([])

    const getHorizonCategories = async () => {
        try {
            const response = await fetch('https://dailydoseofwisdom.net/api/get-all-horizons-by-category', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category_id: category_id,
                    sub_category_id: sub_category_id
                })
            })
            const json = await response.json()
            // console.log('Post Response===>', json)
            setSubCategories(json.data)
            setShowIndicator(false)

        } catch (error) {
            console.log(error)
            setShowIndicator(false)
        }
    }

    return (
        <View style={ExternalStylesheet.container}>


            <View style={styles.innerContainer}>
                <Header
                    onPress={() => navigation.navigate('Settings')}
                    title={'Daily Dose of Wisdom'}
                />
                <View style={styles.topBtns}>
                    <CustomButton
                        title={"Personal Preferences"}
                        style={[ExternalStylesheet.btn, { backgroundColor: show == 0 ? COLOR.LIGHT_GREY_2 : null, borderRadius: 15, flex: 1, height: 28, margin: 4 }]}
                        onPress={() => preferences()}
                    />
                    <CustomButton
                        title={"Add Story"}
                        style={[ExternalStylesheet.btn, { backgroundColor: show != 0 ? COLOR.LIGHT_GREY_2 : null, borderRadius: 15, flex: 0.5, height: 28, margin: 4 }]}
                        onPress={() => addStory()}
                    />
                </View>
                {
                    showIndicator ? <Indicator /> :
                        (
                            show === 0
                                ?
                                <Preferences
                                    subCategories={subCategories}
                                />
                                :
                                <AddStory />
                        )
                }
            </View>

        </View>
    )
}

export default HorizonCategories

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLOR.LIGHT_GREY_2
    },
    topBtns: {
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: COLOR.WHITE,
        height: 40,
        borderRadius: 20,
        elevation: 4,
        width: '70%',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})