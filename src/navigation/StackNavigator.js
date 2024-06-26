import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/auth/SplashScreen'
import Signup from '../screens/auth/Signup'
import Login from '../screens/auth/Login'
import Home from '../screens/home/Home'
import SubCategories from '../screens/subCategories/SubCategories'
import Settings from '../screens/setting/Settings'
import HorizonCategories from '../screens/stories/HorizonCategories'
import ForgotPassword from '../screens/auth/ForgotPassword'
import AboutUs from '../screens/settingDetails/AboutUs'
import FavouriteLibrary from '../screens/settingDetails/FavouriteLibrary'
import Suggestion from '../screens/settingDetails/Suggestion'
import EditProfile from '../screens/settingDetails/EditProfile'
import SearchHorizons from '../screens/settingDetails/SearchHorizons'

const StackNavigator = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Splash' component={SplashScreen} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name="SubCategories" component={SubCategories} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name='HorizonCategories' component={HorizonCategories} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='AboutUs' component={AboutUs} />
      <Stack.Screen name='FavouriteLibrary' component={FavouriteLibrary} />
      <Stack.Screen name='SearchHorizons' component={SearchHorizons} />
      <Stack.Screen name='Suggestion' component={Suggestion} />
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})