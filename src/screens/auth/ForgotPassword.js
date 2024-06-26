import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ExternalStylesheet from '../../enums/ExternalStylesheet';
import { COLOR } from '../../enums/Styleguides';
import CustomInput from '../../components/reusable/CustomInput';
import CustomButton from '../../components/reusable/CustomButton';
import TextLable from '../../components/reusable/TextLable';
import Svg from '../../assets/icons/svg';
import Snackbar from 'react-native-snackbar';

const ForgotPassword = ({ navigation }) => {

    const [email, setEmail] = useState('')

    const handleCancel = () => {
        navigation.goBack()
    }

    return (
        <View style={ExternalStylesheet.container}>
            <View style={styles.innerContainer}>
                <View style={styles.imgView}>
                    <Image
                        source={require('../../assets/images/app_icon.png')}
                        style={styles.img}
                    />
                </View>
                <View style={styles.centeredView}>
                    <TextLable
                        title="Forget Password"
                        style={styles.mainText}
                    />
                    <View style={styles.descTextView}>
                        <TextLable
                            title={'Please fill email and we will send you a link to get back into your account'}
                        />
                    </View>
                    <View>
                        <View style={styles.inputMainView}>
                            <TextLable
                                title="Email"
                                style={styles.blackText}
                            />
                            <View style={styles.inputView}>
                                <CustomInput
                                    holder="Enter your email"
                                    style={{ flex: 1 }}
                                    onChangeText={(txt) => setEmail(txt)}
                                    value={email}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.signInButtonView}>
                    <CustomButton
                        title="Sign In"
                        style={[ExternalStylesheet.btn, styles.signInButton]}
                        fontstyle={styles.signInButtonText}
                        // onPress={() => handleLogin()}
                    />
                    <CustomButton
                        title="Cancel"
                        style={[ExternalStylesheet.btn,{marginVertical:10}]}
                        onPress={()=>handleCancel()}
                    />
                </View>
            </View>
        </View>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        padding: 15,
    },
    imgView: {
        flex: 0.5,
        justifyContent: 'center'
    },
    img: {
        resizeMode: 'center',
        height: '45%',
        alignSelf: 'center',
    },
    centeredView: {
        flex: 1,
    },
    mainText: {
        fontWeight: 'bold',
        color: COLOR.BLACK,
        fontSize: 17
    },
    descTextView: {
        backgroundColor: COLOR.LIGHT_GREY,
        padding: 12,
        marginVertical: 10,
        borderRadius: 12
    },
    blackText: {
        color: COLOR.BLACK,
    },
    inputMainView: {
        marginVertical: 10,
    },
    inputView: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    signInButtonView: {
        marginTop: 25,
    },
    signInButton: {
        height: 50,
        backgroundColor: COLOR.ORANGE,
    },
    signInButtonText: {
        color: COLOR.LIGHT_GREY,
        fontWeight: '600',
    },
});
