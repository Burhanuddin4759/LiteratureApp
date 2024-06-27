import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ExternalStylesheet from '../../enums/ExternalStylesheet';
import TextLable from '../../components/reusable/TextLable';
import Svg from '../../assets/icons/svg';
import CustomButton from '../../components/reusable/CustomButton';
import { COLOR } from '../../enums/Styleguides';
import HeaderWithBack from '../../components/custom/HeaderWithBack';
import { useDispatch, useSelector } from 'react-redux';
import { change_theme } from '../../redux/Actions';
import DeleteAccount from '../settingDetails/DeleteAccount';

const Settings = ({ navigation }) => {

  const reduxThemeData = useSelector((state) => state.reducer)
  console.log('theme===>', reduxThemeData)

  const [isDarkTheme, setIsDarkTheme] = useState(reduxThemeData);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(change_theme(isDarkTheme))
  }, [isDarkTheme])

  useEffect(() => {
    setIsDarkTheme(reduxThemeData)
  }, [reduxThemeData])

  const TEXTCOLOR = reduxThemeData ? COLOR.WHITE : COLOR.DARK_GREY_2

  const DATA = [
    {
      title: 'About Us',
      icon: <Svg.AboutIcon />,
      screen: 'AboutUs'
    },
    {
      title: 'Delete Account',
      icon: <Svg.DeleteIcon />,
    },
    {
      title: 'Favourite Library',
      icon: <Svg.Bookmark />,
      screen: 'FavouriteLibrary'
    },
    {
      title: 'Suggestion Box',
      icon: <Svg.MessageIcon />,
      screen: 'Suggestion'
    },
    {
      title: 'Search Horizons',
      icon: <Svg.Search />,
      screen: 'SearchHorizons'
    },
    {
      title: 'Change Theme',
      icon: <Svg.ThemeIcon />,
      switchValue: isDarkTheme,
      onSwitchChange: setIsDarkTheme
    },
    {
      title: 'Notifications',
      icon: <Svg.NotificationIcon />,
      switchValue: notificationsEnabled,
      onSwitchChange: setNotificationsEnabled
    },
  ];

  const handleDeleteAccount = () => {
    console.warn('Account Deleted')
    setDeleteModalVisible(false)
  }
  const handleCancelDeleteAccount = () => {
    setDeleteModalVisible(false)
  }

  return (
    <View style={[ExternalStylesheet.container,
    {
      backgroundColor: reduxThemeData
        ?
        COLOR.DARK_BLUE
        :
        COLOR.WHITE
    }]}>
      <View style={styles.innerContainer}>
        <HeaderWithBack
          title={'Settings'}
          onPress={() => navigation.goBack()}
        />

        <TextLable
          title="Account"
          style={[styles.sectionTitle, { color: TEXTCOLOR }]}
        />
        <View style={styles.accountContainer}>
          <CustomButton style={[styles.profileIcon, { backgroundColor: reduxThemeData ? COLOR.ORANGE : COLOR.DARK_BLUE_2 }]}
            icon={
              <Svg.MaleIcon
                height={70}
                width={70}
              />
            }
          />
          <View style={styles.accountDetails}>
            <TextLable
              title="Burhan ud din"
              style={[styles.accountName, { color: TEXTCOLOR }]}
            />
            <TextLable
              title="verified098@gmail.com"
              style={styles.accountEmail}
            />
            <CustomButton
              title="Profile"
              style={[ExternalStylesheet.btn, styles.profileButton]}
              fontstyle={styles.profileButtonText}
              onPress={() => navigation.navigate('EditProfile')}
            />
          </View>
        </View>

        <TextLable
          title="General"
          style={[styles.sectionTitle, { color: TEXTCOLOR }]}
        />
        <View>
          {
            DATA.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.listItem}
                onPress={() => {
                  if (item.title == "Delete Account") {
                    setDeleteModalVisible(true)
                  } else {
                    item?.screen ? navigation.navigate(item.screen) : null
                  }
                }}
              >
                <View style={styles.listItemContent}>
                  {item.icon}
                  <TextLable
                    title={item.title}
                    style={[styles.listItemText, { color: TEXTCOLOR }]}
                  />
                  {
                    (item.title === 'Change Theme' || item.title === 'Notifications') && (
                      <Switch
                        value={item.switchValue}
                        onValueChange={item.onSwitchChange}
                        style={styles.switch}
                        trackColor={{ false: COLOR.GREY, true: COLOR.ORANGE }} // Customize track color
                        thumbColor={item.switchValue ? COLOR.BLUE : '#f4f3f4'} // Customize thumb color
                      />
                    )
                  }
                </View>
              </TouchableOpacity>
            ))
          }
        </View>

        <TextLable
          title="By activating notifications you will receive daily suggestions"
          style={styles.notificationInfo}
        />
        <CustomButton
          icon={<Svg.Logout height={20} width={20} />}
          style={[ExternalStylesheet.btn, styles.logoutButton]}
          fontstyle={styles.logoutButtonText}
        />
      </View>
      <DeleteAccount
        visible={deleteModalVisible}
        onDeletePress={handleDeleteAccount}
        onCancelPress={handleCancelDeleteAccount}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#000',
  },
  accountContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  profileIcon: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountDetails: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'space-evenly',
  },
  accountName: {
    color: COLOR.BLACK,
    fontWeight: '500',
  },
  accountEmail: {
    color: COLOR.GREY,
  },
  profileButton: {
    backgroundColor: COLOR.ORANGE,
    width: '45%',
    height: 25,
    borderRadius: 13,
  },
  profileButtonText: {
    color: COLOR.WHITE,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  switch: {
    flex: 1,
    alignItems: 'flex-end',
  },
  notificationInfo: {
    color: COLOR.ORANGE,
  },
  logoutButton: {
    backgroundColor: COLOR.BLUE,
    width: '35%',
    height: 40,
    marginVertical: 10,
  },
  logoutButtonText: {
    color: COLOR.WHITE,
  },
});
