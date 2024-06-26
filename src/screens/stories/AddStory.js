import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextLable from '../../components/reusable/TextLable'
import CustomInput from '../../components/reusable/CustomInput'
import CustomButton from '../../components/reusable/CustomButton'
import ExternalStylesheet from '../../enums/ExternalStylesheet'
import { COLOR } from '../../enums/Styleguides'

const AddStory = (props) => {
    const { onPress } = props

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.innerContainer}>
                <TextLable
                    title={'Add Title'}
                    style={styles.titleFont}
                />
                <CustomInput
                    holder={'Enter here...'}
                    style={styles.titleInput}
                />
                <View style={styles.contentContainer}>
                    <TextLable
                        title={'Add Content'}
                        style={styles.titleFont}
                    />
                    <CustomInput
                        holder={'Enter here...'}
                        style={styles.contentInput}
                        multiline={true}
                        numberOfLines={20}
                    />
                </View>
            </View>
            <View>
                <CustomButton
                    title={'Post story'}
                    style={[ExternalStylesheet.btn, { backgroundColor: COLOR.BLUE, height: 50 }]}
                    fontstyle={{ color: COLOR.WHITE }}
                    onPress={onPress}
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
        backgroundColor: '#fff',
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
        borderWidth: 0.5,
        borderRadius: 12,
        flex: 1,
        textAlignVertical: 'top'
    },
    titleFont: {
        color: COLOR.BLACK,
        marginBottom: 4
    }
})