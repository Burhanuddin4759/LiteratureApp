import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ExternalStylesheet from '../../enums/ExternalStylesheet';
import { COLOR } from '../../enums/Styleguides';
import CustomInput from '../../components/reusable/CustomInput';
import CustomButton from '../../components/reusable/CustomButton';
import TextLable from '../../components/reusable/TextLable';
import Svg from '../../assets/icons/svg';
import Snackbar from 'react-native-snackbar';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(true)

    const showPassword = () => {
        setShowPass(!showPass)
    }

    const handleLogin = async () => {
        if (email && password) {

            try {
                const response = await fetch('https://dailydoseofwisdom.net/api/login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        player_id: 1
                    })
                })
                const json = await response.json()
                if (json.success == true) {
                    navigation.navigate('Home')
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
            <View style={styles.innerContainer}>
                <View style={styles.imgView}>
                    <Image
                        source={require('../../assets/images/app_icon.png')}
                        style={styles.img}
                    />
                </View>
                <View style={styles.centeredView}>
                    <TextLable
                        title="Login to your account"
                        style={styles.mainText}
                    />
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
                        <View>
                            <TextLable
                                title="Password"
                                style={styles.blackText}
                            />
                            <View style={styles.inputView}>
                                <CustomInput
                                    holder="Enter your password"
                                    style={{ flex: 1 }}
                                    onChangeText={(txt) => setPassword(txt)}
                                    value={password}
                                    secureTextEntry={showPass}
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
                                onPress={()=>navigation.navigate('ForgotPassword')}
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
        color: COLOR.BLACK,
        fontSize: 17
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
