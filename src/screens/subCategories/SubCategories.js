import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExternalStylesheet from '../../enums/ExternalStylesheet';
import Svg from '../../assets/icons/svg';
import TextLable from '../../components/reusable/TextLable';
import { COLOR } from '../../enums/Styleguides';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/custom/Header';
import { useSelector } from 'react-redux';

const SubCategories = ({ route }) => {
    const { item_id } = route.params;
    const navigation = useNavigation()

    const subCategory = (subCategoryId) => {
        navigation.navigate('HorizonCategories',
            {
                sub_category_id: subCategoryId,
                category_id: item_id
            }
        )
    }

    const reduxThemeData = useSelector((state) => state.reducer)

    const [subCategories, setSubCategories] = useState([])
    // console.log(storiesQty)

    useEffect(() => {
        getSubCategories()
    }, [])

    const getSubCategories = async () => {
        const response = await fetch('https://dailydoseofwisdom.net/api/get-sub-categories', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category_id: item_id
            })
        })
        const json = await response.json()
        // console.log('This is Sub-Json', json)
        setSubCategories(json.data)
    }

    const renderView = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.item, {
                backgroundColor: reduxThemeData
                    ?
                    COLOR.DARK_BLUE_2
                    :
                    COLOR.WHITE,
                borderWidth: reduxThemeData ? 1 : null,
                borderColor: reduxThemeData ? COLOR.GREY : null
            }]}
                onPress={() =>
                    subCategory(item.id)
                }
            >
                <Image
                    source={{ uri: item.image }}
                    style={{ height: '75%', width: '100%' }}
                />
                <TextLable
                    title={item.name}
                    style={{
                        fontSize: 16, fontWeight: 'bold', color:
                            reduxThemeData
                                ?
                                COLOR.WHITE
                                :
                                COLOR.BLACK
                    }}
                />
                <TextLable
                    title={`${item.stories} stories`}
                    style={{ color: COLOR.LIGHT_GREY }}
                />

            </TouchableOpacity>
        )
    }

    return (
        <View style={[ExternalStylesheet.container, {
            backgroundColor: reduxThemeData ? COLOR.DARK_BLUE : COLOR.WHITE
        }]}>
            <View style={styles.innerContainer}>
                <Header
                    onPress={() => navigation.navigate('Settings')}
                    title={"Daily Dose of Wisdom"}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={subCategories}
                    renderItem={renderView}
                    numColumns={2}
                />
            </View>
        </View>
    )
}

export default SubCategories

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        paddingHorizontal: 20
    },
    item: {
        // backgroundColor: '#fff',
        elevation: 4,
        flex: 1,
        height: Dimensions.get('screen').width / 2.25,
        margin: 5,
        alignItems: 'center',
        borderRadius: 12
    }
})