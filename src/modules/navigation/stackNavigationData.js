import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import TabNavigator from './MainTabNavigator';
import SpeakersScreen from '../speakers/SpeakersView';
import ScheduleViewContainer from '../schedule/ScheduleViewContainer';
import FFSScreen from '../ffs/FfsInfoView';
import TicketsContainer from '../tickets/TicketsViewContainer';
import FAQPage from '../faq/FAQInfoView';
import PartnersScreen from '../partners/PartnersInfoView';
import SpeakerDetails from '../speakers/SpeakerDetails';
import ContactViewScreen from '../contact/ContactView';
import TeamResourcesScreen from '../team/TeamResourcesScreen';
import TeamSummitResourcesScreen from '../team/TeamSummitResourcesScreen';

import { colors, fonts } from '../../styles';

const backArrowIcon = require('../../../assets/images/icons/arrow-back3x.png')

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
        source={backArrowIcon}
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
  {
    name: 'Speakers',
    component: SpeakersScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
  },
    {
    name: 'Schedule',
    component: ScheduleViewContainer,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
  },
  {
    name: 'FFS',
    component: FFSScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
  },
  {
    name: 'Tickets',
    component: TicketsContainer,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
  },
  {
    name: 'Partners',
    component: PartnersScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
  },
  {
    name: 'FAQ',
    component: FAQPage,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
  },
  {
    name: 'SpeakerDetails',
    component: SpeakerDetails,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
  },
  {
    name: 'Contact',
    component: ContactViewScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
  },
  {
    name: 'TeamResources',
    component: TeamResourcesScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitle: 'Team Resources',
  },
  {
    name: 'TeamSummitResources',
    component: TeamSummitResourcesScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitle: 'Summit',
  },

]

export { headerLeftComponent };
export default StackNavigationData;
