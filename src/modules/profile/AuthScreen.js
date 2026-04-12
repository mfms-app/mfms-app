import React from 'react';
import {
  ActivityIndicator,
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
import AppText from '../../components/Text';
import { colors } from '../../styles';
import RNSButton from '../../components/Button';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from '@react-native-firebase/auth';
import defaultProfileAvatar from './defaultProfileAvatar';
import { mergeStoredProfile } from './profileStorage';
import { pickProfilePhoto } from './pickProfilePhoto';

export default function AuthScreen() {
  const [mode, setMode] = React.useState('login'); // login | signup | forgot
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [photoBase64, setPhotoBase64] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  const isSignup = mode === 'signup';
  const isForgot = mode === 'forgot';
  const authInstance = getAuth();

  React.useEffect(() => {
    if (!isSignup) {
      setFirstName('');
      setLastName('');
      setPhotoBase64('');
    }
  }, [isSignup]);

  const onChoosePhoto = async () => {
    const uri = await pickProfilePhoto();
    if (uri) setPhotoBase64(uri);
  };

  const submit = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return Alert.alert('Email required', 'Please enter an email.');
    if (!isForgot && password.length < 6) {
      return Alert.alert('Password too short', 'Password must be at least 6 characters.');
    }
    if (isSignup) {
      if (!firstName.trim() || !lastName.trim()) {
        return Alert.alert('Name required', 'Please enter your first and last name.');
      }
      if (!photoBase64) {
        return Alert.alert('Photo required', 'Please add a profile photo.');
      }
    }

    setBusy(true);
    try {
      if (isForgot) {
        await sendPasswordResetEmail(authInstance, trimmedEmail);
        Alert.alert('Check your email', 'Password reset email sent.');
        setMode('login');
        setPassword('');
      } else if (isSignup) {
        const cred = await createUserWithEmailAndPassword(authInstance, trimmedEmail, password);
        const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
        try {
          if (cred?.user?.updateProfile) {
            await cred.user.updateProfile({ displayName: fullName });
          }
        } catch (_) {
          // Profile still saved locally if Auth display name update fails
        }
        await mergeStoredProfile(cred.user.uid, {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          photoBase64,
        });
      } else {
        await signInWithEmailAndPassword(authInstance, trimmedEmail, password);
      }
    } catch (e) {
      Alert.alert('Authentication error', e?.message || 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <AppText variant="h1" style={styles.title}>
              {isForgot ? 'Reset Password' : isSignup ? 'Create Account' : 'Log In'}
            </AppText>
            <View style={styles.divider} />
          </View>

          <View style={styles.card}>
            {isSignup ? (
              <>
                <AppText variant="body" style={styles.label}>
                  Photo
                </AppText>
                <TouchableOpacity
                  style={styles.photoPicker}
                  onPress={onChoosePhoto}
                  disabled={busy}
                  activeOpacity={0.8}
                >
                  <Image
                    source={photoBase64 ? { uri: photoBase64 } : defaultProfileAvatar}
                    style={styles.photoPreview}
                  />
                  {!photoBase64 ? (
                    <View style={styles.photoHintOverlay} pointerEvents="none">
                      <AppText variant="caption" style={styles.photoHintText}>
                        Tap to choose your photo
                      </AppText>
                    </View>
                  ) : null}
                </TouchableOpacity>

                <AppText variant="body" style={styles.label}>
                  First name
                </AppText>
                <TextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="First name"
                  placeholderTextColor={colors.gray}
                  autoCapitalize="words"
                  style={styles.input}
                />

                <AppText variant="body" style={styles.label}>
                  Last name
                </AppText>
                <TextInput
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Last name"
                  placeholderTextColor={colors.gray}
                  autoCapitalize="words"
                  style={styles.input}
                />
              </>
            ) : null}

            <AppText variant="body" style={styles.label}>
              Email
            </AppText>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={colors.gray}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              style={styles.input}
            />

            {!isForgot ? (
              <>
                <AppText variant="body" style={styles.label}>
                  Password
                </AppText>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={colors.gray}
                  secureTextEntry
                  style={styles.input}
                />
              </>
            ) : null}

            {busy ? (
              <View style={styles.busyWrap}>
                <ActivityIndicator color={colors.blue} />
              </View>
            ) : (
              <RNSButton
                caption={isForgot ? 'Send reset email' : isSignup ? 'Sign up' : 'Log in'}
                bordered
                primary
                large
                onPress={submit}
                style={styles.primaryButton}
              />
            )}

            <View style={styles.linksRow}>
              {mode !== 'login' ? (
                <TouchableOpacity onPress={() => setMode('login')} disabled={busy}>
                  <AppText variant="body" style={styles.link}>
                    Back to login
                  </AppText>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setMode('forgot')} disabled={busy}>
                  <AppText variant="body" style={styles.link}>
                    Forgot password?
                  </AppText>
                </TouchableOpacity>
              )}

              {mode === 'login' ? (
                <TouchableOpacity onPress={() => setMode('signup')} disabled={busy}>
                  <AppText variant="body" style={styles.link}>
                    Create account
                  </AppText>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContent: {
    paddingBottom: 32,
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
    padding: 16,
    backgroundColor: colors.white,
    paddingHorizontal: 4,
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
    marginBottom: 14,
    fontSize: 17,
  },
  photoPicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: colors.blue,
    overflow: 'hidden',
    marginBottom: 16,
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
  primaryButton: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 10,
  },
  busyWrap: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  linksRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    color: colors.blue,
    textDecorationLine: 'underline',
  },
});
