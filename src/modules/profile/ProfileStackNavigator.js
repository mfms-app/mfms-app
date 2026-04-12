import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { colors } from '../../styles';
import ProfileHomeScreen from './ProfileHomeScreen';
import EditProfileScreen from './EditProfileScreen';
import TimelineScreen from '../events/TimelineScreen';
import FavoritesTimelineScreen from '../events/FavoritesTimelineScreen';

const Stack = createStackNavigator();

function ProfileTimelineRoute() {
  return <TimelineScreen omitInScreenHeader />;
}

function ProfileFavoritesRoute() {
  return <FavoritesTimelineScreen omitInScreenHeader />;
}

export default function ProfileStackNavigator({ user }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: colors.blue,
        headerStyle: { backgroundColor: colors.white },
        headerTitleStyle: { color: colors.black },
      }}
    >
      <Stack.Screen name="ProfileMain" options={{ headerShown: false }}>
        {() => <ProfileHomeScreen user={user} />}
      </Stack.Screen>
      <Stack.Screen
        name="ProfileTimeline"
        component={ProfileTimelineRoute}
        options={{ title: 'My Schedule' }}
      />
      <Stack.Screen
        name="ProfileFavorites"
        component={ProfileFavoritesRoute}
        options={{ title: 'Favorites' }}
      />
      <Stack.Screen name="ProfileEdit" options={{ title: 'Edit profile' }}>
        {({ navigation }) => (
          <EditProfileScreen
            user={user}
            omitInScreenHeader
            onDone={() => navigation.goBack()}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
