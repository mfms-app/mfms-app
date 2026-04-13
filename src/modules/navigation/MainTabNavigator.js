import * as React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../styles';
import useAuthState from '../profile/useAuthState';

import tabNavigationData from './tabNavigationData';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { user, initializing } = useAuthState();

  if (initializing) {
    return (
      <View style={styles.authLoading}>
        <ActivityIndicator color={colors.blue} size="large" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      tabBarOptions={{ style: styles.tabBarContainer }}
      initialRouteName={'Home'}
    >
      {tabNavigationData.map((item, idx) => (
        <Tab.Screen 
          key={`tab_item${idx+1}`}
          name={item.name}
          component={item.component}
          listeners={
            item.name === 'Profile'
              ? ({ navigation }) => ({
                  blur: () => {
                    const state = navigation.getState();
                    const profileRoute = state.routes.find((r) => r.name === 'Profile');
                    const nested = profileRoute?.state;
                    if (nested != null && nested.index > 0) {
                      navigation.navigate('Profile', { screen: 'ProfileMain' });
                    }
                  },
                })
              : undefined
          }
          options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarItemContainer}>
              <Image
                resizeMode="contain"
                source={item.icon}
                style={[
                  styles.tabBarIcon,
                  focused && styles.tabBarIconFocused
                ]}
              />
            </View>
          ),
          tabBarButton: (props) => (
            item.externalLink ? (
              <TouchableOpacity
                {...props}
                onPress={() => Linking.openURL(item.externalLink)}
              >
                
              </TouchableOpacity>
            ) : (
              <TouchableOpacity {...props} />
            )
          ),
          tabBarLabel: ({ focused }) => <Text style={{fontSize: 10, color: focused ? colors.blue : colors.white }}>{item.name}</Text>,
        }}
        />        
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  authLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  tabBarContainer: {
    height: Platform.OS === 'ios' ? 90 : 50, 
    backgroundColor:colors.white, 
    borderTopColor: colors.black, 
    borderTopWidth:1
  },
  tabBarItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    bottom: Platform.OS === 'ios' ? -5 : 0,
  },
  tabBarIcon: {
    width: 40,
    height: 45,
  },
  tabBarIconFocused: {
    tintColor: colors.blue,
  },
});
