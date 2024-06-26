import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import ExternalStylesheet from '../../enums/ExternalStylesheet';
import Header from '../../components/custom/Header';
import TextLable from '../../components/reusable/TextLable';
import Svg from '../../assets/icons/svg';
import CustomButton from '../../components/reusable/CustomButton';
import { COLOR } from '../../enums/Styleguides';

const Settings = ({ navigation }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

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

  return (
    <View style={ExternalStylesheet.container}>
      <View style={styles.innerContainer}>
        <Header
          title="Settings"
        />

        <TextLable
          title="Account"
          style={styles.sectionTitle}
        />
        <View style={styles.accountContainer}>
          <CustomButton style={styles.profileIcon}
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
              style={styles.accountName}
            />
            <TextLable
              title="verified098@gmail.com"
              style={styles.accountEmail}
            />
            <CustomButton
              title="Profile"
              style={[ExternalStylesheet.btn, styles.profileButton]}
              fontstyle={styles.profileButtonText}
              onPress={()=>navigation.navigate('EditProfile')}
            />
          </View>
        </View>

        <TextLable
          title="General"
          style={styles.sectionTitle}
        />
        <View>
          {
            DATA.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.listItem}
                onPress={() => {
                  item?.screen ? navigation.navigate(item.screen) : null
                }}
              >
                <View style={styles.listItemContent}>
                  {item.icon}
                  <TextLable
                    title={item.title}
                    style={styles.listItemText}
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
    backgroundColor: COLOR.DARK_BLUE_2,
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
