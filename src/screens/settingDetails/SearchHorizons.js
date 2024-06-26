import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExternalStylesheet from '../../enums/ExternalStylesheet'
import Header from '../../components/custom/Header'
import CustomInput from '../../components/reusable/CustomInput'
import { COLOR } from '../../enums/Styleguides'
import TextLable from '../../components/reusable/TextLable'
import { useSelector } from 'react-redux'

const SearchHorizons = () => {

    const [words, setWords] = useState('')
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        getSearchData()
    }, [words])


    const getSearchData = async () => {
        try {
            const response = await fetch('https://dailydoseofwisdom.net/api/search-horizon', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    search: words
                })
            })
            const json = await response.json()
            console.log(json)
            setFilteredData(json)
        } catch (error) {
            console.log(error)
        }
    }

    const handleOnChangeTxt = (txt) => {
        setWords(txt)
        // const filtered = reduxData.filter((item) =>
        //     item.description.toLowerCase().includes(txt.toLowerCase()) ||
        //     item.name.toLowerCase().includes(txt.toLowerCase())
        // )
        // setFilteredData(filtered)
    }

    const renderView = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.itemContainer}>
                <TextLable
                    title={item.name}
                    style={{ fontWeight: 'bold', fontSize: 17, color: COLOR.BLACK, textAlign: 'center' }}
                />
                <TextLable
                    title={item.description.length > 50
                        ?
                        `${item.description.substring(0, 50)}...`
                        :
                        item.description
                    }
                    style={{ textAlign: 'center' }}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={ExternalStylesheet.container}>
            <View style={styles.innerContainer}>
                <Header
                    title={'Daily Dose of Wisdom'}
                />

                <View>
                    <CustomInput
                        holder={'Search here...'}
                        style={[ExternalStylesheet.input, { borderWidth: 0.5, borderRadius: 12 }]}
                        onChangeText={(txt) => handleOnChangeTxt(txt)}
                        value={words}
                    />
                </View>
                <View style={{ marginTop: 10, flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={filteredData}
                        renderItem={renderView}
                        numColumns={2}
                    />

                </View>
            </View>
        </View>
    )
}

export default SearchHorizons

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        padding: 20,
    },
    itemContainer: {
        margin: 10,
        backgroundColor: COLOR.WHITE,
        flex: 1,
        height: 120,
        elevation: 4,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 5
    }
})