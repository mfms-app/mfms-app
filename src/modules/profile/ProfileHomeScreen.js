import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from '../../components/Text';
import { colors } from '../../styles';
import { firebaseAuth } from '../../services/firebase';
import EditProfileScreen from './EditProfileScreen';
import TimelineScreen from '../events/TimelineScreen';
import FavoritesTimelineScreen from '../events/FavoritesTimelineScreen';
import notifee from '@notifee/react-native';
import { connect } from 'react-redux';

function ProfileHomeScreen({ user, schedule, favoriteEventIds }) {
  const [screen, setScreen] = React.useState('home'); // home | editProfile | timeline
  const [notifStatus, setNotifStatus] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const settings = await notifee.getNotificationSettings();
        if (mounted) setNotifStatus(settings?.authorizationStatus ?? null);
      } catch (e) {
        if (mounted) setNotifStatus(null);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const signOut = async () => {
    try {
      await firebaseAuth.signOut();
    } catch (e) {
      Alert.alert('Sign out failed', e?.message || 'Something went wrong.');
    }
  };

  if (screen === 'editProfile') {
    return <EditProfileScreen user={user} onDone={() => setScreen('home')} />;
  }
  if (screen === 'timeline') {
    return <TimelineScreen />;
  }
  if (screen === 'favorites') {
    return <FavoritesTimelineScreen />;
  }

  const upcomingFavorites = React.useMemo(() => {
    const now = Date.now();
    const next24h = now + 24 * 60 * 60 * 1000;
    return (schedule || [])
      .filter((e) => favoriteEventIds.includes(e.id))
      .filter((e) => e.startDateTimeISO)
      .map((e) => ({ ...e, startMs: new Date(e.startDateTimeISO).getTime() }))
      .filter((e) => !Number.isNaN(e.startMs) && e.startMs >= now && e.startMs <= next24h)
      .sort((a, b) => a.startMs - b.startMs)
      .slice(0, 3);
  }, [schedule, favoriteEventIds]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText variant="h1" style={styles.title}>
            Profile
          </AppText>
          <View style={styles.divider} />
        </View>

        <View style={styles.card}>
          <AppText variant="body" style={styles.line}>
            Signed in as
          </AppText>
          <AppText variant="h3" style={styles.email}>
            {user?.email || '—'}
          </AppText>
          <AppText variant="caption" style={styles.caption}>
            Notifications: {notifStatus === 1 ? 'enabled' : notifStatus === 0 ? 'disabled' : 'unknown'}
          </AppText>
        </View>

        {upcomingFavorites.length ? (
          <View style={styles.card}>
            <AppText variant="h3" style={styles.sectionTitle}>
              Up next (24h)
            </AppText>
            {upcomingFavorites.map((e) => (
              <View key={e.id} style={styles.upNextRow}>
                <AppText variant="caption" style={styles.timeSmall}>
                  {e.startTime}
                </AppText>
                <AppText variant="body" style={styles.upNextTitle}>
                  {e.title}
                </AppText>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.card}>
          <TouchableOpacity onPress={() => setScreen('timeline')} style={styles.secondaryButton}>
            <AppText variant="h3" style={styles.secondaryButtonText}>
              My timeline
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setScreen('favorites')} style={styles.secondaryButton}>
            <AppText variant="h3" style={styles.secondaryButtonText}>
              Favorites
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setScreen('editProfile')} style={styles.secondaryButton}>
            <AppText variant="h3" style={styles.secondaryButtonText}>
              Edit profile
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity onPress={signOut} style={styles.primaryButton}>
            <AppText variant="h3" style={styles.primaryButtonText}>
              Sign out
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    color: colors.black,
  },
  divider: {
    width: '60%',
    alignSelf: 'center',
    height: 1,
    backgroundColor: colors.black,
    marginTop: 8,
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.white,
    marginBottom: 14,
  },
  line: {
    color: colors.black,
  },
  email: {
    color: colors.blue,
    marginTop: 6,
  },
  caption: {
    color: colors.gray,
    marginTop: 6,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderColor: colors.blue,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: colors.blue,
    textAlign: 'center',
  },
  sectionTitle: {
    color: colors.black,
    marginBottom: 10,
  },
  upNextRow: {
    marginBottom: 8,
  },
  timeSmall: {
    color: colors.blue,
    marginBottom: 2,
  },
  upNextTitle: {
    color: colors.black,
  },
  primaryButton: {
    backgroundColor: colors.blue,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    textAlign: 'center',
  },
});

export default connect((state) => ({
  schedule: state.schedule.schedule,
  favoriteEventIds: state.favorites.favoriteEventIds,
}))(ProfileHomeScreen);

