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
import RNSButton from '../../components/Button';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail 
} from '@react-native-firebase/auth';

export default function AuthScreen() {
  const [mode, setMode] = React.useState('login'); // login | signup | forgot
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  const isSignup = mode === 'signup';
  const isForgot = mode === 'forgot';
  const authInstance = getAuth();

  const submit = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return Alert.alert('Email required', 'Please enter an email.');
    if (!isForgot && password.length < 6) {
      return Alert.alert('Password too short', 'Password must be at least 6 characters.');
    }

    setBusy(true);
    try {
      if (isForgot) {
        // 3. Update to Modular Syntax: function(instance, data)
        await sendPasswordResetEmail(authInstance, trimmedEmail);
        Alert.alert('Check your email', 'Password reset email sent.');
        setMode('login');
        setPassword('');
      } else if (isSignup) {
        await createUserWithEmailAndPassword(authInstance, trimmedEmail, password);
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
        <View style={styles.header}>
          <AppText variant="h1" style={styles.title}>
            {isForgot ? 'Reset Password' : isSignup ? 'Create Account' : 'Log In'}
          </AppText>
          <View style={styles.divider} />
        </View>

        <View style={styles.card}>
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
          <RNSButton
            caption={isForgot ? 'Send reset email' : isSignup ? 'Sign up' : 'Log in'}
            bordered
            primary
            large
            onPress={submit}
            style={styles.primaryButton}
          /> 

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
    padding: 16,
    backgroundColor: colors.white,
    padding: 20,
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
  primaryButton: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 10,
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

