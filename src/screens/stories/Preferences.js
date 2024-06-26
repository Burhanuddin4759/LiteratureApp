import { Animated, Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import CustomButton from '../../components/reusable/CustomButton'
import { COLOR } from '../../enums/Styleguides'
import ExternalStylesheet from '../../enums/ExternalStylesheet'
import Svg from '../../assets/icons/svg'
import TextLable from '../../components/reusable/TextLable'

const Preferences = (props) => {

    const { subCategories } = props
    // console.log('This is Props', subCategories)

    const flatListRef = useRef(null)

    const renderView = ({ item, index }) => {
        // console.log('item===>', item)
        return (
            <View style={styles.itemContainer}>
                <View style={styles.container}>
                    <View style={styles.itemHeaderView}>
                        <TextLable
                            title={item.name}
                            style={{ color: COLOR.BLACK, fontWeight: '800', fontSize: 15 }}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Svg.RedHeart height={16} width={16} />
                            <TextLable
                                title={item.likes}
                                style={{ fontSize: 11, marginLeft: 2, alignSelf: 'flex-start' }}
                            />
                        </View>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <TextLable
                            title={item.description}
                            style={{ fontSize: 14 }}
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
                            />
                            <CustomButton
                                icon={
                                    item.like == false
                                        ?
                                        <Svg.Heart height={18} width={18} />
                                        :
                                        <Svg.RedHeart height={18} width={18} />
                                }
                                style={{ marginHorizontal: 2 }}
                            />
                            <CustomButton
                                icon={<Svg.Share height={18} width={18} />}
                                style={{ marginHorizontal: 2 }}
                            />
                            <CustomButton
                                icon={<Svg.Clipboard height={18} width={18} />}
                                style={{ marginLeft: 2 }}
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

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start',alignItems:'center' }}>
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
        backgroundColor: '#fff',
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