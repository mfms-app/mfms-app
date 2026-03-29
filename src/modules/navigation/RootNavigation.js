import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import StackNavigationData from './stackNavigationData';

const Stack = createStackNavigator();

export default function NavigatorView(props) {
  return (
    <Stack.Navigator>
      {StackNavigationData.map((item, idx) => (
        <Stack.Screen
          key={`stack_item-${idx+1}`}
          name={item.name} 
          component={item.component} 
          options={{
            headerLeft: item.headerLeft ? (headerProps) => item.headerLeft(headerProps) : undefined,
            headerBackground: () => (
              <Image style={styles.headerImage} source={item.headerBackground.source} />
            ),
            headerTitle: item.headerTitle ? item.headerTitle : null,
            headerTitleStyle: item.headerTitleStyle ? item.headerTitleStyle : null,
          }} 
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100 + '%',
    height: Header.height,
  },
});
