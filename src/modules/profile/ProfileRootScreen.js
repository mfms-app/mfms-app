import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from '../../styles';
import useAuthState from './useAuthState';
import AuthScreen from './AuthScreen';
import ProfileStackNavigator from './ProfileStackNavigator';

export default function ProfileRootScreen({ navigation }) {
  const { user, initializing } = useAuthState();
  const prevUserRef = React.useRef(undefined);

  React.useEffect(() => {
    if (initializing) return;
    const prev = prevUserRef.current;
    if (prev === undefined) {
      prevUserRef.current = user;
      return;
    }
    if (!prev && user) {
      navigation.navigate('Home');
    } else if (prev && !user) {
      navigation.navigate('Profile');
    }
    prevUserRef.current = user;
  }, [user, initializing, navigation]);

  if (initializing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <ActivityIndicator color={colors.blue} />
        </View>
      </SafeAreaView>
    );
  }

  return user ? <ProfileStackNavigator user={user} /> : <AuthScreen />;
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

