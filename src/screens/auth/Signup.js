import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ExternalStylesheet from '../../enums/ExternalStylesheet';
import { COLOR } from '../../enums/Styleguides';
import CustomInput from '../../components/reusable/CustomInput';
import CustomButton from '../../components/reusable/CustomButton';
import TextLable from '../../components/reusable/TextLable';
import Svg from '../../assets/icons/svg';
import Snackbar from 'react-native-snackbar';

const Signup = ({ navigation }) => {

    const [fullname, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPass, setShowPass] = useState(true)

    const register = async () => {
        if (fullname && email && password && confirmPassword && password === confirmPassword) {
            try {
                const response = await fetch('https://dailydoseofwisdom.net/api/register', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        full_name: fullname,
                        email: email,
                        password: password,
                        con_password: confirmPassword
                    })
                })
                const json = await response.json()
                // console.log('json===>', json)
                if (json.success === true) {
                    Snackbar.show({
                        text: 'User registered successfully',
                        duration: Snackbar.LENGTH_SHORT,
                        action: {
                            text: 'undo',
                            textColor: COLOR.ORANGE,
                            onPress: () => Snackbar.dismiss()
                        }
                    })
                }
                else {
                    Snackbar.show({
                        text:"Please check your data",
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
                text: 'All fields must be filled and passwords must match',
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: 'undo',
                    textColor: COLOR.ORANGE,
                    onPress: () => Snackbar.dismiss()
                }
            })
        }
    }

    const showPassword = () => {
        setShowPass(!showPass)
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
                        title="Register"
                        style={styles.mainText}
                    />
                    <View>
                        <View style={styles.inputMainView}>
                            <TextLable
                                title="Name"
                                style={styles.blackText}
                            />
                            <View style={styles.inputView}>
                                <CustomInput
                                    holder="Enter your full name"
                                    style={{ flex: 1 }}
                                    onChangeText={(txt) => setFullName(txt)}
                                    value={fullname}
                                />
                            </View>
                        </View>
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
                        <View style={styles.inputMainView}>
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
                            <TextLable
                                title={'Password must have at least one lowercase, one uppercase, one symbol & one numeric character'}
                                style={{ fontSize: 10, textAlign: 'justify', color: COLOR.ORANGE }}
                            />
                        </View>
                        <View style={styles.inputMainView}>
                            <TextLable
                                title="Confirm Password"
                                style={styles.blackText}
                            />
                            <View style={styles.inputView}>
                                <CustomInput
                                    holder="Enter your password"
                                    style={{ flex: 1 }}
                                    onChangeText={(txt) => setConfirmPassword(txt)}
                                    value={confirmPassword}
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
                        <View style={styles.signInButtonView}>
                            <CustomButton
                                title="Register"
                                style={[ExternalStylesheet.btn, styles.signInButton]}
                                fontstyle={styles.signInButtonText}
                                onPress={() => register()}
                            />
                            <View style={styles.registerView}>
                                <TextLable
                                    title="Already have an account?"
                                />
                                <CustomButton
                                    title="Sign In"
                                    fontstyle={styles.registerText}
                                    onPress={() => navigation.goBack()}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Signup;

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
        marginVertical: 5,
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
