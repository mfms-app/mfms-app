import React, { useRef, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  View,
  Linking,
} from 'react-native';

import { colors} from '../../styles';
import AppText from '../../components/Text';
import RNSButton from '../../components/Button';
import ContentGrid from '../../components/ContentGrid.js';
import { useNavigation } from '@react-navigation/native';

const summitDashContent = [
  {
    id: 1,
    image: require('../../../assets/images/summitdash/SCHEDULE.png'),
    link: 'Schedule'
  },
  {
    id: 2,
    image: require('../../../assets/images/summitdash/SPEAKERS.png'),
    link: 'Speakers'
  },
  {
    id: 3,
    image: require('../../../assets/images/summitdash/PANELS.png'),
    link: 'Panels'
  },
  {
    id: 4,
    image: require('../../../assets/images/summitdash/FFS.png'),
    link: 'FFS'
  },
]

const resumeDropLink = 'https://docs.google.com/forms/d/e/1FAIpQLScRTC0E6jIQSaYA5ctiN2ivL3JrTD2m8rT5zcWJTBPz8s2rPQ/viewform?usp=header';
const pastSummitsLink = 'https://www.michiganfashionmediasummit.com/past-summits';

const SummitScreen = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView 
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        >
        {/* Header Section */}
          <AppText style={styles.text} variant='h1'>MFMS 2026</AppText>
          <View style={styles.divider} />
          <AppText style={styles.text} variant='h3'>April 17th</AppText>
          <AppText style={styles.text} variant='h3'>
            Stephen M. Ross School of Business
          </AppText>
          <View style={styles.spacer}>
          <RNSButton
            caption="Tickets"
            bordered
            primary
            style={{ alignSelf: 'center' }}
            onPress={() => navigation.navigate('Tickets')}
        />
        </View>
        <AppText style={styles.text} variant='h2'>Summit Dashboard</AppText>
        <ContentGrid data={summitDashContent}/>
        <AppText style={styles.text} variant='h2'>Additional Resources</AppText>
        <View style={styles.buttonRow}>
          <RNSButton
            caption="Partners"
            bordered
            primary
            onPress={() => navigation.navigate('Partners')}
        />
          <RNSButton
            caption="Resume Drop"
            bordered
            primary
            onPress={() => Linking.openURL(resumeDropLink)}
        />
        </View>
        <View style={styles.buttonRow}>
          <RNSButton
            caption="Past Summits"
            bordered
            primary
            onPress={() => Linking.openURL(pastSummitsLink)}
        />
          <RNSButton
            caption="FAQ"
            bordered
            primary
            onPress={() => navigation.navigate('FAQ')}
        />
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text:{
    textAlign: 'center',
  },
  divider: {
    width: '60%', 
    alignSelf: 'center',
    height: 1, 
    backgroundColor: colors.black,  
    marginTop: 8,
    marginBottom: 20, 
    marginHorizontal: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.select({ ios: 0, android: StatusBar.currentHeight }),
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 40,
    marginTop: 25,
  },
  // Header styles
  section: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    alignItems: 'center',
    zIndex: 1000,
  },
  spacer: {
    marginTop: 20,
    marginBottom: 40,
    gap: 20,
  },
  buttonRow:{
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 10,
  }
});

export default SummitScreen;