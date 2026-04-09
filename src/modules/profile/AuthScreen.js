import React from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppText from '../../components/Text';
import { colors } from '../../styles';
import { firebaseAuth } from '../../services/firebase';

export default function AuthScreen() {
  const [mode, setMode] = React.useState('login'); // login | signup | forgot
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  const isSignup = mode === 'signup';
  const isForgot = mode === 'forgot';

  const submit = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return Alert.alert('Email required', 'Please enter an email.');
    if (!isForgot && password.length < 6) {
      return Alert.alert('Password too short', 'Password must be at least 6 characters.');
    }

    setBusy(true);
    try {
      if (isForgot) {
        await firebaseAuth.sendPasswordResetEmail(trimmedEmail);
        Alert.alert('Check your email', 'Password reset email sent.');
        setMode('login');
        setPassword('');
      } else if (isSignup) {
        await firebaseAuth.createUserWithEmailAndPassword(trimmedEmail, password);
      } else {
        await firebaseAuth.signInWithEmailAndPassword(trimmedEmail, password);
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
        <View style={styles.header}>
          <AppText variant="h1" style={styles.title}>
            {isForgot ? 'Reset Password' : isSignup ? 'Create Account' : 'Log In'}
          </AppText>
          <View style={styles.divider} />
        </View>

        <View style={styles.card}>
          <AppText variant="caption" style={styles.label}>
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
              <AppText variant="caption" style={styles.label}>
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

          <TouchableOpacity
            style={[styles.primaryButton, busy && styles.primaryButtonDisabled]}
            onPress={submit}
            disabled={busy}
          >
            {busy ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <AppText variant="h3" style={styles.primaryButtonText}>
                {isForgot ? 'Send reset email' : isSignup ? 'Sign up' : 'Log in'}
              </AppText>
            )}
          </TouchableOpacity>

          <View style={styles.linksRow}>
            {mode !== 'login' ? (
              <TouchableOpacity onPress={() => setMode('login')} disabled={busy}>
                <AppText variant="caption" style={styles.link}>
                  Back to login
                </AppText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setMode('forgot')} disabled={busy}>
                <AppText variant="caption" style={styles.link}>
                  Forgot password?
                </AppText>
              </TouchableOpacity>
            )}

            {mode === 'login' ? (
              <TouchableOpacity onPress={() => setMode('signup')} disabled={busy}>
                <AppText variant="caption" style={styles.link}>
                  Create account
                </AppText>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
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
  },
  primaryButton: {
    backgroundColor: colors.blue,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: colors.white,
    textAlign: 'center',
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

