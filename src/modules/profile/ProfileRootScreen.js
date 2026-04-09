import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from '../../styles';
import useAuthState from './useAuthState';
import AuthScreen from './AuthScreen';
import ProfileHomeScreen from './ProfileHomeScreen';

export default function ProfileRootScreen() {
  const { user, initializing } = useAuthState();

  if (initializing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <ActivityIndicator color={colors.blue} />
        </View>
      </SafeAreaView>
    );
  }

  return user ? <ProfileHomeScreen user={user} /> : <AuthScreen />;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

