import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExternalStylesheet from '../../enums/ExternalStylesheet'
import CustomButton from '../../components/reusable/CustomButton'
import { COLOR } from '../../enums/Styleguides'

const SplashScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../../assets/images/SplashScreen/Splash.png')}
            style={{ height: '100%', width: '100%' }}
        >
            <View style={styles.container}>
                <Image
                    source={require('../../assets/images/app_icon.png')}
                    style={styles.img} />
            </View>
            <View style={{ padding: 15 }}>
                <CustomButton
                    title={'Log In'}
                    style={[ExternalStylesheet.btn, { height: 50, backgroundColor: COLOR.ORANGE, }]}
                    fontstyle={{ color: COLOR.LIGHT_GREY, fontWeight: '800' }}
                    onPress={() => navigation.navigate('Login')}
                />
                <CustomButton
                    title={'Continue as guest'}
                    style={styles.guestBtn}
                    fontstyle={styles.guestText}
                    onPress={()=>navigation.navigate('Home')}
                />
            </View>
            <Text style={{}}></Text>
        </ImageBackground >
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    img: {
        resizeMode: 'center',
        height: '20%',
        alignSelf:'center'
    },
    guestBtn: {
        marginVertical: 8
    },
    guestText: {
        fontWeight: '600',
        color: COLOR.BLUE,
        textAlign: 'center'
    }
})