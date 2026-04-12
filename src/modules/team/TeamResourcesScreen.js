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
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../styles';
import AppText from '../../components/Text';
import RNSButton from '../../components/Button';

const TEAM_ROSTER_URL =
  'https://docs.google.com/spreadsheets/d/1xdieUfT3d-4QMXSdtDKLUinFl2ZW0Kj82F4sdkopnH8/edit?gid=0#gid=0';
const MFMS_DRIVE_URL =
  'https://drive.google.com/drive/folders/1Y0YAUQwOh9rKhmJQ1XXJ1NOYCOVudqxX?usp=drive_link';
const ALUMNI_DATABASE_URL =
  'https://docs.google.com/spreadsheets/d/1sWsdmCGaNITENpuU5WYFfaHRZDrOk4TJgNFlSYb8omQ/edit?usp=sharing';

function openUrl(url) {
  Linking.openURL(url).catch(() => {
    Alert.alert('Unable to open', 'Could not open the link. Please try again.');
  });
}

export default function TeamResourcesScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <AppText style={styles.text} variant="h1">
          Team Resources
        </AppText>
        <View style={styles.divider} />
        <AppText style={styles.subtitle} variant="body">
          Internal links for MFMS team members.
        </AppText>

        <View style={styles.section}>
          <RNSButton
            caption="Summit"
            bordered
            primary
            style={styles.fullWidthButton}
            onPress={() => navigation.navigate('TeamSummitResources')}
          />
          <RNSButton
            caption="MFMS Team Roster"
            bordered
            primary
            style={styles.fullWidthButton}
            onPress={() => openUrl(TEAM_ROSTER_URL)}
          />
          <RNSButton
            caption="MFMS Drive"
            bordered
            primary
            style={styles.fullWidthButton}
            onPress={() => openUrl(MFMS_DRIVE_URL)}
          />
          <RNSButton
            caption="Alumni Database"
            bordered
            primary
            style={styles.fullWidthButton}
            onPress={() => openUrl(ALUMNI_DATABASE_URL)}
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
  subtitle: {
    textAlign: 'center',
    color: colors.gray,
    marginBottom: 24,
  },
  divider: {
    width: '60%',
    alignSelf: 'center',
    height: 1,
    backgroundColor: colors.black,
    marginTop: 8,
    marginBottom: 16,
  },
  section: {
    gap: 14,
  },
  fullWidthButton: {
    alignSelf: 'stretch',
  },
});
