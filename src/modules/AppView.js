import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../styles';

import Navigator from './navigation/Navigator';
import useAuthState from './profile/useAuthState';
import AuthScreen from './profile/AuthScreen';

export default function AppView() {
  const { user, initializing } = useAuthState();

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.blue} />
      </View>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return <Navigator onNavigationStateChange={() => {}} uriPrefix="/app" />;
}
