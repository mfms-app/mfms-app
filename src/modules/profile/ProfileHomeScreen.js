import React from 'react';
import {
  Alert,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../components/Text';
import RNSButton from '../../components/Button';
import { colors } from '../../styles';
import { isTeamResourceEmail } from '../../constants/teamResourceEmails';
import { firebaseAuth } from '../../services/firebase';
import notifee from '@notifee/react-native';
import { connect } from 'react-redux';
import defaultProfileAvatar from './defaultProfileAvatar';
import { formatProfileDisplayName, loadStoredProfile, mergeStoredProfile } from './profileStorage';
import { pickProfilePhoto } from './pickProfilePhoto';

const RESUME_DROP_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScRTC0E6jIQSaYA5ctiN2ivL3JrTD2m8rT5zcWJTBPz8s2rPQ/viewform';

function ProfileHomeScreen({ user, schedule, favoriteEventIds }) {
  const navigation = useNavigation();
  const [setNotifStatus] = React.useState(null);
  const [storedProfile, setStoredProfile] = React.useState(null);
  const [avatarBusy, setAvatarBusy] = React.useState(false);

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

  const refreshStoredProfile = React.useCallback(async () => {
    if (!user?.uid) return;
    const p = await loadStoredProfile(user.uid);
    setStoredProfile(p);
  }, [user?.uid]);

  React.useEffect(() => {
    const unsub = navigation.addListener('focus', refreshStoredProfile);
    return unsub;
  }, [navigation, refreshStoredProfile]);

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

  const signOut = async () => {
    try {
      await firebaseAuth.signOut();
    } catch (e) {
      Alert.alert('Sign out failed', e?.message || 'Something went wrong.');
    }
  };

  const openResumeDrop = () => {
    Linking.openURL(RESUME_DROP_FORM_URL).catch(() => {
      Alert.alert('Unable to open', 'Could not open the form. Please try again.');
    });
  };

  const openTeamResources = () => {
    let nav = navigation;
    while (nav) {
      const names = nav.getState?.()?.routeNames;
      if (Array.isArray(names) && names.includes('TeamResources')) {
        nav.navigate('TeamResources');
        return;
      }
      nav = nav.getParent?.();
    }
    navigation.navigate('TeamResources');
  };

  const showTeamResources = isTeamResourceEmail(user?.email);
  const displayName = formatProfileDisplayName(storedProfile, user);
  const photoUri = storedProfile?.photoBase64;

  const onChangeProfilePhoto = async () => {
    if (!user?.uid || avatarBusy) return;
    setAvatarBusy(true);
    try {
      const uri = await pickProfilePhoto();
      if (uri) {
        await mergeStoredProfile(user.uid, { photoBase64: uri });
        await refreshStoredProfile();
      }
    } finally {
      setAvatarBusy(false);
    }
  };

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
          <TouchableOpacity
            style={styles.avatarTouchable}
            onPress={onChangeProfilePhoto}
            disabled={avatarBusy}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Change profile photo"
          >
            <Image
              source={photoUri ? { uri: photoUri } : defaultProfileAvatar}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <AppText variant="h3" style={styles.displayName}>
            {displayName || '—'}
          </AppText>
          <AppText variant="body" style={styles.email}>
            {user?.email || '—'}
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
          <RNSButton
            caption="My Schedule"
            large
            bordered
            primary
            onPress={() => navigation.navigate('ProfileTimeline')}
            style={styles.buttonFullWidth}
          />

          <RNSButton
            caption="Favorites"
            bordered
            large
            primary
            onPress={() => navigation.navigate('ProfileFavorites')}
            style={styles.buttonFullWidth}
          />

          <RNSButton
            caption="Edit profile"
            bordered
            large
            primary
            onPress={() => navigation.navigate('ProfileEdit')}
            style={styles.buttonFullWidth}
          />

          <RNSButton
            caption="Resume Drop"
            bordered
            large
            primary
            onPress={openResumeDrop}
            style={styles.buttonFullWidth}
          />

          {showTeamResources ? (
            <RNSButton
              caption="Team Resources"
              bordered
              large
              primary
              onPress={openTeamResources}
              style={styles.buttonFullWidth}
            />
          ) : null}

          <RNSButton
            large
            bgColor = {colors.blue}
            caption="Sign out"
            onPress={signOut}
            style={styles.buttonFullWidth}
          />
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
    padding: 16,
    backgroundColor: colors.white,
    marginBottom: 14,
  },
  line: {
    color: colors.black,
  },
  avatarTouchable: {
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: colors.black,
    backgroundColor: colors.white,
  },
  avatarHint: {
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 8,
  },
  displayName: {
    color: colors.black,
    textAlign: 'center',
    marginBottom: 4,
  },
  email: {
    color: colors.blue,
    textAlign: 'center',
    marginTop: 2,
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
  buttonFullWidth: {
    width: '100%',
    marginBottom: 10,
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

