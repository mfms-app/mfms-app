/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { firebase } from '@react-native-firebase/app';

if (!firebase.apps.length) {
  firebase.initializeApp();
}

AppRegistry.registerComponent(appName, () => App);
