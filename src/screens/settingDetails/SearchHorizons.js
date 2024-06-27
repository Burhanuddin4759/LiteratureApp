import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import ExternalStylesheet from '../../enums/ExternalStylesheet';
import Header from '../../components/custom/Header';
import CustomInput from '../../components/reusable/CustomInput';
import { COLOR } from '../../enums/Styleguides';
import TextLable from '../../components/reusable/TextLable';
import CustomButton from '../../components/reusable/CustomButton';
import Svg from '../../assets/icons/svg';
import Indicator from '../../components/custom/Indicator';
import HeaderWithBack from '../../components/custom/HeaderWithBack';
import { useSelector } from 'react-redux';

const SearchHorizons = ({ navigation }) => {
    const [words, setWords] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [showIndicator, setShowIndicator] = useState(false)

    const reduxThemeData = useSelector((state) => state.reducer)

    const getSearchData = async () => {
        setShowIndicator(true)
        try {
            const response = await fetch('https://dailydoseofwisdom.net/api/search-horizon', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ search: words })
            });
            const json = await response.json();
            setSearchData(json.data);
            setShowIndicator(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setShowIndicator(false)
        }
    };

    const RenderView = ({ item }) => {
        return (
            <View style={styles.itemWrapper}>
                <TextLable
                    title={`${item.horizon_category.name}`}
                    style={styles.categoryTitle}
                />
                <TouchableOpacity style={styles.itemContainer}>
                    <TextLable
                        title={item.name}
                        style={styles.itemTitle}
                    />
                    <TextLable
                        title={item.description.length > 50
                            ? `${item.description.substring(0, 50)}...`
                            : item.description}
                        style={styles.itemDescription}
                    />
                </TouchableOpacity>
                <View style={styles.creatorInfo}>
                    <TextLable
                        title={`Creator: ${item.horizon_creator.full_name}`}
                        style={{ color: COLOR.ORANGE, fontWeight: '600' }}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 }}>
                            <Svg.RedHeart />
                            <TextLable
                                title={item.likes}
                                style={{ fontSize: 11 }}
                            />
                        </View>
                        <CustomButton
                            icon={<Svg.Bookmark />}
                        />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={ExternalStylesheet.container}>
            <View style={[styles.innerContainer, {
                backgroundColor: reduxThemeData ? COLOR.DARK_BLUE : COLOR.WHITE
            }]}>
                <HeaderWithBack
                    title={'Daily Dose of Wisdom'}
                    onPress={() => navigation.goBack()}
                />
                <View style={[styles.searchInput, {
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
                }]}>
                    <CustomInput
                        holder={'Search here...'}
                        style={[ExternalStylesheet.input, {
                            flex: 1,
                            backgroundColor: reduxThemeData
                                ?
                                COLOR.DARK_BLUE_2
                                :
                                COLOR.WHITE,
                            color: reduxThemeData
                                ? COLOR.GREY : null
                        }]}
                        onChangeText={(txt) => setWords(txt)}
                        value={words}
                        placeholderTextColor={
                            reduxThemeData
                                ? COLOR.GREY : null
                        }
                    />
                    <CustomButton
                        icon={<Svg.Search />}
                        style={ExternalStylesheet.btn}
                        onPress={() => getSearchData()}
                    />
                </View>
                {
                    showIndicator
                        ?
                        <Indicator />
                        :
                        <View style={styles.resultsContainer}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={searchData}
                                renderItem={RenderView}
                                numColumns={2}
                                keyExtractor={(item) => item.id.toString()}
                            />
                        </View>
                }
            </View>
        </View>
    );
};

export default SearchHorizons;

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        padding: 20,
    },
    searchInput: {
        borderWidth: 0.5,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    resultsContainer: {
        marginTop: 10,
        flex: 1,
    },
    itemWrapper: {
        flex: 1,
        margin: 10,
    },
    categoryTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: COLOR.BLACK,
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
    },
    itemDescription: {
        textAlign: 'center',
    },
    creatorInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
});
