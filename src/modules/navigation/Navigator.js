import * as React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { 
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import NavigatorView from './RootNavigation';

import { colors } from '../../styles';
const iconHome = require('../../../assets/images/home.png');
const logoImage = require('../../../assets/images/secondary_white.png')


const drawerData = [
  {
    name: 'Home',
    icon: iconHome,
    onPress: (navigation) => navigation.navigate('MFMS'),
  },
];

const Drawer = createDrawerNavigator();




function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{ padding: 0 }}>
      {/* Header Section with Logo */}
      <View style={styles.imageContainer}>
        <Image style={styles.drawerImage} source={logoImage} />
      </View>

      {/* Drawer Items */}
      {drawerData.map((item, idx) => (
        <View key={`drawer_item-${idx + 1}`}>
          <DrawerItem
            label={() => (
              <View style={styles.menuLabelFlex}>
                <Image
                  style={item.name === 'Stay In Touch'
                    ? styles.largerIcon 
                    : styles.menuIcon}
                  source={item.icon}
                />
                <Text style={styles.menuTitle}>{item.name}</Text>
              </View>
            )}
            onPress={() => item.onPress(props.navigation)}
            activeBackgroundColor={colors.blue}
            activeTintColor={colors.white}
          />
          {/* Divider */}
          {idx < drawerData.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </DrawerContentScrollView>
  );
}

export default function App() {

  return (

    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: colors.white,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Main" component={NavigatorView} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  menuTitle: {
    marginLeft: 15,
    color: colors.black,
    fontFamily: "NeueHaasDisplayRoman",
    fontWeight: '400',
    fontSize: 15,
  },
  menuLabelFlex: {
    color: colors.black,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  divider: {
    borderBottomColor: colors.black,
    opacity: 0.2,
    borderBottomWidth: 1,
  },
  imageContainer: {
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16
  },
  drawerImage: {
    width: "100%",
    height: 200,
    resizeMode: 'contain',
  },
  menuIcon: {
    width: 31, 
    height: 31, 
    resizeMode: 'contain'
  },
  largerIcon: {
    width: 36,  // Slightly wider to maintain aspect ratio
    height: 36, // Taller as requested
    resizeMode: 'contain'
  },
});

