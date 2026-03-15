import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import TabNavigator from './MainTabNavigator';

import { colors, fonts } from '../../styles';

const headerLeftComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Image
        source={require('../../../assets/images/icons/arrow-back3x.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
    </TouchableOpacity>    
  )
}

const headerBackground = require('../../../assets/images/background.png');

const StackNavigationData = [
  {
    name: 'MFMS',
    component: TabNavigator,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitle: () => (
      <Image
        source={require('../../../assets/images/transparent_blue.png')} 
        style={{
          height: 55, 
          width: 55, 
          resizeMode: 'contain',
        }}
      />
    ),
  },
]

export default StackNavigationData;
