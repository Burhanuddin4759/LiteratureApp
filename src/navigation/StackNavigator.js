import React, { useEffect, useState } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KEYS } from '../utils/keys'

const StackNavigator = () => {
  const Stack = createNativeStackNavigator()

  const [initialRoute, setInitialRoute] = useState(null)

  useEffect(() => {
    userAlreadyLogin()
  }, [])

  const userAlreadyLogin = async () => {
    try {
      const token = await AsyncStorage.getItem(KEYS.AUTH_TOKEN);
      const userId = await AsyncStorage.getItem('@UserId');
      const parsedUserId = JSON.parse(userId);
      console.log('User already logged in with Token:', token);
      console.log('User already logged in with ID:', parsedUserId);
      if (token && parsedUserId) {
        setInitialRoute('Home')
      }
      else {
        setInitialRoute('Splash')
      }
    } catch (error) {
      console.error('Error fetching user data from AsyncStorage:', error);
    }
  };

  if (initialRoute === null) {
    return null
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
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

