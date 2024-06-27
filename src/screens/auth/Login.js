import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ExternalStylesheet from '../../enums/ExternalStylesheet';
import { COLOR } from '../../enums/Styleguides';
import CustomInput from '../../components/reusable/CustomInput';
import CustomButton from '../../components/reusable/CustomButton';
import TextLable from '../../components/reusable/TextLable';
import Svg from '../../assets/icons/svg';
import Snackbar from 'react-native-snackbar';
import { useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS } from '../../utils/keys';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(true)

    const showPassword = () => {
        setShowPass(!showPass)
    }

    const reduxThemeData = useSelector((state) => state.reducer)

    const handleLogin = () => {
        {
            NetInfo.fetch().then(state => {
                if (!state.isConnected) {
                    Snackbar.show({
                        text: 'Internet Disconnected',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                    return;
                }
                loginRequest()
            })
        }
    }

    const loginRequest = async () => {

        if (email && password) {
            try {
                const player_id = 1

                const response = await fetch('https://dailydoseofwisdom.net/api/login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        player_id: player_id
                    })
                })
                const json = await response.json()
                console.log('this is json==>', json)
                if (json.success == true) {
                    navigation.navigate('Home')
                    const jsonPlayerId = JSON.stringify(player_id)
                    await AsyncStorage.setItem('@UserId', jsonPlayerId)
                    await AsyncStorage.setItem(KEYS.AUTH_TOKEN, json.data.token)
                }
                        else {
                    Snackbar.show({
                        text: "Invalid Credentials",
                        duration: Snackbar.LENGTH_SHORT,
                        action: {
                            text: 'undo',
                            textColor: COLOR.ORANGE,
                            onPress: () => Snackbar.dismiss()
                        }
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
        else {
            Snackbar.show({
                text: 'Please enter your credentials',
                action: {
                    text: 'undo',
                    textColor: COLOR.ORANGE,
                    onPress: () => Snackbar.dismiss()
                }
            })
        }
    }

    return (
        <View style={ExternalStylesheet.container}>
            <View style={[styles.innerContainer, {
                backgroundColor: reduxThemeData
                    ?
                    COLOR.DARK_BLUE
                    :
                    COLOR.WHITE
            }]}>
                <View style={styles.imgView}>
                    <Image
                        source={require('../../assets/images/app_icon.png')}
                        style={styles.img}
                    />
                </View>
                <View style={styles.centeredView}>
                    <TextLable
                        title="Login to your account"
                        style={[styles.mainText, {
                            color: reduxThemeData ? COLOR.GREY : COLOR.BLACK
                        }]}
                    />
                    <View>
                        <View style={styles.inputMainView}>
                            <TextLable
                                title="Email"
                                style={{
                                    color: reduxThemeData
                                        ? COLOR.GREY
                                        : COLOR.BLACK
                                }}
                            />
                            <View style={[styles.inputView, {
                                backgroundColor: reduxThemeData
                                    ? COLOR.DARK_BLUE_2
                                    : COLOR.WHITE,
                                borderWidth: reduxThemeData
                                    ? 0.5 : 0.5,
                                borderColor: reduxThemeData
                                    ? COLOR.ORANGE : null,
                                color: reduxThemeData
                                    ? COLOR.GREY : null
                            }]}>
                                <CustomInput
                                    holder="Enter your email"
                                    style={{
                                        flex: 1,
                                        backgroundColor: reduxThemeData
                                            ? COLOR.DARK_BLUE_2
                                            : COLOR.WHITE,
                                        color: reduxThemeData
                                            ? COLOR.GREY : null
                                    }}
                                    onChangeText={(txt) => setEmail(txt)}
                                    value={email}
                                    placeholderTextColor={
                                        reduxThemeData
                                            ? COLOR.GREY : null
                                    }
                                />
                            </View>
                        </View>
                        <View>
                            <TextLable
                                title="Password"
                                style={{
                                    color: reduxThemeData
                                        ? COLOR.GREY
                                        : COLOR.BLACK
                                }}
                            />
                            <View style={[styles.inputView, {
                                backgroundColor: reduxThemeData
                                    ? COLOR.DARK_BLUE_2
                                    : COLOR.WHITE,
                                borderWidth: reduxThemeData
                                    ? 0.5 : 0.5,
                                borderColor: reduxThemeData
                                    ? COLOR.ORANGE : null,
                                color: reduxThemeData
                                    ? COLOR.GREY : null
                            }]}>
                                <CustomInput
                                    holder="Enter your password"
                                    style={{
                                        flex: 1,
                                        backgroundColor: reduxThemeData
                                            ? COLOR.DARK_BLUE_2
                                            : COLOR.WHITE,
                                        color: reduxThemeData
                                            ? COLOR.GREY : null
                                    }}
                                    onChangeText={(txt) => setPassword(txt)}
                                    value={password}
                                    secureTextEntry={showPass}
                                    placeholderTextColor={
                                        reduxThemeData
                                            ? COLOR.GREY : null
                                    }
                                />
                                <CustomButton
                                    icon={
                                        showPass
                                            ?
                                            <Svg.ShowPassIcon />
                                            :
                                            <Svg.HidePassIcon />
                                    }
                                    onPress={() => showPassword()}
                                />
                            </View>
                        </View>
                        <View style={styles.forgotPasswordView}>
                            <CustomButton
                                title="Forgot Password?"
                                style={styles.forgotPasswordButton}
                                fontstyle={styles.forgotPasswordText}
                                onPress={() => navigation.navigate('ForgotPassword')}
                            />
                        </View>
                        <View style={styles.signInButtonView}>
                            <CustomButton
                                title="Sign In"
                                style={[ExternalStylesheet.btn, styles.signInButton]}
                                fontstyle={styles.signInButtonText}
                                onPress={() => handleLogin()}
                            />
                            <View style={styles.registerView}>
                                <TextLable
                                    title="Don't have an account?"
                                    style={{
                                        color: reduxThemeData ? COLOR.GREY : null
                                    }}
                                />
                                <CustomButton
                                    title="Register"
                                    fontstyle={styles.registerText}
                                    onPress={() => navigation.navigate('Signup')}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Login;

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
        fontSize: 17
    },
    inputMainView: {
        marginVertical: 10,
    },
    inputView: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    forgotPasswordView: {
        marginVertical: 5,
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        color: COLOR.BLUE,
        fontWeight: '600',
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
    registerView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 5,
    },
    registerText: {
        color: COLOR.BLUE,
        fontWeight: '600',
        marginHorizontal: 4
    },
});
