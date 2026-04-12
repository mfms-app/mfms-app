import React from 'react';
import {
  Alert,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { colors } from '../../styles';
import AppText from '../../components/Text';
import RNSButton from '../../components/Button';

const TWO_WEEKS_OUT_BIBLE_URL =
  'https://docs.google.com/document/d/1mxO-yyTEfu2wvXsspclRMqTYUXeZMW8IsF8bNzLifJk/edit?tab=t.a4x6gqhawdbn';

function openUrl(url) {
  Linking.openURL(url).catch(() => {
    Alert.alert('Unable to open', 'Could not open the link. Please try again.');
  });
}

export default function TeamSummitResourcesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <AppText style={styles.text} variant="h1">
          Summit
        </AppText>
        <View style={styles.divider} />
        <AppText style={styles.text} variant="h3">
          MFMS 2026
        </AppText>
        <AppText style={styles.text} variant="h3">
          April 17th
        </AppText>
        <AppText style={styles.text} variant="h3">
          Stephen M. Ross School of Business
        </AppText>

        <AppText style={styles.body} variant="body">
          Team-only summit prep and run-of-show materials live in the links below.
        </AppText>

        <View style={styles.buttonWrap}>
          <RNSButton
            caption="Two weeks out bible"
            bordered
            primary
            style={styles.fullWidthButton}
            onPress={() => openUrl(TWO_WEEKS_OUT_BIBLE_URL)}
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
    paddingTop: Platform.select({ ios: 0, android: StatusBar.currentHeight }),
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 40,
    marginTop: 25,
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
  body: {
    textAlign: 'center',
    color: colors.gray,
    marginTop: 24,
    marginBottom: 8,
    lineHeight: 22,
  },
  divider: {
    width: '60%',
    alignSelf: 'center',
    height: 1,
    backgroundColor: colors.black,
    marginTop: 8,
    marginBottom: 20,
  },
  buttonWrap: {
    marginTop: 20,
  },
  fullWidthButton: {
    alignSelf: 'stretch',
  },
});
