import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExternalStylesheet from '../../enums/ExternalStylesheet'
import Svg from '../../assets/icons/svg'
import TextLable from '../../components/reusable/TextLable'
import { COLOR } from '../../enums/Styleguides'
import CustomButton from '../../components/reusable/CustomButton'
import Header from '../../components/custom/Header'
import Indicator from '../../components/custom/Indicator'

const Home = ({ navigation }) => {

    const [data, setData] = useState([])
    const [showIndicator, setShowIndicator] = useState(true)

    const getData = async () => {
        const fetchData = await fetch('https://dailydoseofwisdom.net/api/get-all-categories', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const json = await fetchData.json()
        setData(json.data)
        setShowIndicator(false)
    }

    useEffect(() => {
        getData()
    }, [])

    const renderView = ({ item }) => {
        // console.log('item====>', item)
        return (
            <TouchableOpacity style={styles.item}
                onPress={() => navigation.navigate('SubCategories', { item_id: item.id })}
            >
                <Image
                    source={{ uri: item.image }}
                    style={{ height: '75%', width: '100%' }}
                />
                <TextLable
                    title={item.name}
                    style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.BLACK }}
                />
                <TextLable
                    title={`${item.subCategories.length} items`}
                    style={{ color: COLOR.LIGHT_GREY }}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={ExternalStylesheet.container}>
            {
                showIndicator
                    ?
                    <Indicator />
                    :
                    <View style={styles.innerContainer}>
                        <Header
                            onPress={() => navigation.navigate('Settings')}
                            title={'Daily Dose of Wisdom'}
                        />
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={data}
                            renderItem={renderView}
                            numColumns={2}
                        />
                    </View>
            }
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        paddingHorizontal: 20
    },
    item: {
        backgroundColor: '#fff',
        elevation: 4,
        flex: 1,
        height: Dimensions.get('screen').width / 2.25,
        margin: 5,
        alignItems: 'center',
        borderRadius: 12
    }
})