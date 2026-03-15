import HomeScreen from '../home/HomeViewContainer';
import ScheduleScreen from '../schedule/ScheduleViewContainer';
import AboutScreen from '../about/AboutViewContainer';
import SpeakersScreen from '../speakers/SpeakersViewContainer';
import TicketsScreen from '../tickets/TicketsViewContainer';
import SpeakerDetails from '../speakers/SpeakerDetails'

const iconHome = require('../../../assets/images/home.png');
const iconMFMS = require('../../../assets/images/transparent_black.png');
const iconSummit = require('../../../assets/images/summit.png');
const iconProfile = require('../../../assets/images/profile.png');
const iconPublications = require('../../../assets/images/publications.png');

const tabNavigationData = [
  {
    name: 'MFMS',
    component: AboutScreen,
    icon: iconMFMS,
  },
  {
    name: 'Summit',
    component: AboutScreen,
    icon: iconSummit,
  },
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Publications',
    component: AboutScreen,
    icon: iconPublications,
  },
  {
    name: 'Profile',
    component: AboutScreen,
    icon: iconProfile,
  },
];

export default tabNavigationData;