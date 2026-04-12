import React from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../components/Text';
import { colors } from '../../styles';
import { firebaseAuth } from '../../services/firebase';
import defaultProfileAvatar from './defaultProfileAvatar';
import { loadStoredProfile, saveStoredProfile } from './profileStorage';
import { pickProfilePhoto } from './pickProfilePhoto';

const emptyProfile = () => ({
  firstName: '',
  lastName: '',
  photoBase64: '',
  company: '',
  roleTitle: '',
  bio: '',
  phone: '',
});

export default function EditProfileScreen({ user, onDone, omitInScreenHeader = false }) {
  const navigation = useNavigation();
  const [busy, setBusy] = React.useState(false);
  const [profile, setProfile] = React.useState(emptyProfile);

  React.useEffect(() => {
    const load = async () => {
      setBusy(true);
      try {
        const stored = await loadStoredProfile(user.uid);
        setProfile({ ...emptyProfile(), ...stored });
      } catch (e) {
        // ignore
      } finally {
        setBusy(false);
      }
    };
    const unsub = navigation.addListener('focus', load);
    return unsub;
  }, [navigation, user.uid]);

  const save = async () => {
    setBusy(true);
    try {
      await saveStoredProfile(user.uid, profile);
      const u = firebaseAuth.currentUser;
      const fullName = `${profile.firstName.trim()} ${profile.lastName.trim()}`.trim();
      if (u && fullName && typeof u.updateProfile === 'function') {
        try {
          await u.updateProfile({ displayName: fullName });
        } catch (_) {
          // local save already succeeded
        }
      }
      onDone?.();
    } catch (e) {
      Alert.alert('Save failed', e?.message || 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  const onChangePhoto = async () => {
    const uri = await pickProfilePhoto();
    if (uri) setProfile((p) => ({ ...p, photoBase64: uri }));
  };

  const Field = ({ label, value, onChangeText, multiline }) => (
    <View style={styles.field}>
      <AppText variant="caption" style={styles.label}>
        {label}
      </AppText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.gray}
        style={[styles.input, multiline && styles.inputMultiline]}
        multiline={multiline}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {!omitInScreenHeader ? (
            <View style={styles.header}>
              <AppText variant="h1" style={styles.title}>
                Edit Profile
              </AppText>
              <View style={styles.divider} />
            </View>
          ) : null}

          <View style={styles.card}>
            <AppText variant="caption" style={styles.label}>
              Photo
            </AppText>
            <TouchableOpacity
              style={styles.photoPicker}
              onPress={onChangePhoto}
              disabled={busy}
              activeOpacity={0.8}
            >
              <Image
                source={
                  profile.photoBase64
                    ? { uri: profile.photoBase64 }
                    : defaultProfileAvatar
                }
                style={styles.photoPreview}
              />
              {!profile.photoBase64 ? (
                <View style={styles.photoHintOverlay} pointerEvents="none">
                  <AppText variant="caption" style={styles.photoHintText}>
                    Tap to add photo
                  </AppText>
                </View>
              ) : null}
            </TouchableOpacity>

            <Field
              label="First name"
              value={profile.firstName}
              onChangeText={(t) => setProfile((p) => ({ ...p, firstName: t }))}
            />
            <Field
              label="Last name"
              value={profile.lastName}
              onChangeText={(t) => setProfile((p) => ({ ...p, lastName: t }))}
            />
            <Field
              label="Company"
              value={profile.company}
              onChangeText={(t) => setProfile((p) => ({ ...p, company: t }))}
            />
            <Field
              label="Title"
              value={profile.roleTitle}
              onChangeText={(t) => setProfile((p) => ({ ...p, roleTitle: t }))}
            />
            <Field
              label="Phone (optional)"
              value={profile.phone}
              onChangeText={(t) => setProfile((p) => ({ ...p, phone: t }))}
            />
            <Field
              label="Bio"
              value={profile.bio}
              onChangeText={(t) => setProfile((p) => ({ ...p, bio: t }))}
              multiline
            />

            <TouchableOpacity
              style={[styles.primaryButton, busy && styles.primaryButtonDisabled]}
              onPress={save}
              disabled={busy}
            >
              <AppText variant="h3" style={styles.primaryButtonText}>
                Save
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={() => onDone?.()} disabled={busy}>
              <AppText variant="caption" style={styles.secondaryButtonText}>
                Cancel
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
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
  },
  field: {
    marginBottom: 12,
  },
  label: {
    color: colors.blue,
    marginBottom: 6,
  },
  photoPicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: colors.blue,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
  },
  photoHintOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  photoHintText: {
    color: colors.blue,
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    color: colors.black,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: colors.blue,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  primaryButtonDisabled: { opacity: 0.7 },
  primaryButtonText: {
    color: colors.white,
    textAlign: 'center',
  },
  secondaryButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.blue,
    textDecorationLine: 'underline',
  },
});
