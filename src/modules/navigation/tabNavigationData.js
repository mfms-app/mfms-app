import HomeScreen from '../home/HomeViewContainer';
import SummitScreen from '../summit/SummitView';
import AboutScreen from '../about/AboutViewContainer';
import PublicationsScreen from '../publications/PublicationsView';

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
    component: SummitScreen,
    icon: iconSummit,
  },
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Publications',
    component: PublicationsScreen,
    icon: iconPublications,
  },
  {
    name: 'Profile',
    component: AboutScreen,
    icon: iconProfile,
  },
];

export default tabNavigationData;