import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppText from '../../components/Text';
import { colors } from '../../styles';

const profileKey = (uid) => `profile:${uid}`;

export default function EditProfileScreen({ user, onDone }) {
  const [busy, setBusy] = React.useState(false);
  const [profile, setProfile] = React.useState({
    displayName: '',
    company: '',
    roleTitle: '',
    bio: '',
    phone: '',
  });

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      setBusy(true);
      try {
        const raw = await AsyncStorage.getItem(profileKey(user.uid));
        if (!mounted) return;
        if (raw) setProfile((p) => ({ ...p, ...JSON.parse(raw) }));
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setBusy(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [user.uid]);

  const save = async () => {
    setBusy(true);
    try {
      await AsyncStorage.setItem(profileKey(user.uid), JSON.stringify(profile));
      onDone?.();
    } catch (e) {
      Alert.alert('Save failed', e?.message || 'Something went wrong.');
    } finally {
      setBusy(false);
    }
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
          <View style={styles.header}>
            <AppText variant="h1" style={styles.title}>
              Edit Profile
            </AppText>
            <View style={styles.divider} />
          </View>

          <View style={styles.card}>
            <Field
              label="Name"
              value={profile.displayName}
              onChangeText={(t) => setProfile((p) => ({ ...p, displayName: t }))}
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

            <TouchableOpacity style={styles.secondaryButton} onPress={onDone} disabled={busy}>
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

