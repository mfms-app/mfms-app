import React, { useRef, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  View,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';

import { colors} from '../../styles';
import AppText from '../../components/Text';
import RNSButton from '../../components/Button';
import ContentGrid from '../../components/ContentGrid.js';
import { useNavigation } from '@react-navigation/native';

const stitchLogo = require('../../../assets/images/publications/stitch_logo.png');
const loopLogo = require('../../../assets/images/publications/loop_logo.png');

const stitchContent = [
  {
    id: 1,
    image: require('../../../assets/images/recent/stitch_one.png'),
    link: 'https://www.michiganfashionmediasummit.com/stitch-all/2026/3/10/style-vs-clothes'
  },
  {
    id: 2,
    image: require('../../../assets/images/recent/stitch_two.png'),
    link: 'https://www.michiganfashionmediasummit.com/stitch-all/2025/11/23/brendan-1'
  },
  {
    id: 3,
    image: require('../../../assets/images/recent/stitch_three.png'),
    link: 'https://www.michiganfashionmediasummit.com/stitch-all/2025/11/23/born-to-diet-diet-soda-and-the-making-of-a-fashion-ideal'
  },
  {
    id: 4,
    image: require('../../../assets/images/recent/stitch_four.png'),
    link: 'https://www.michiganfashionmediasummit.com/stitch-all/2025/3/23/making-the-most-of-the-summit'
  },
]

const loopContent = [
  {
    id: 1,
    image: require('../../../assets/images/publications/loop_one.png'),
    link: 'https://www.michiganfashionmediasummit.com/the-loop-post/2025/1/28/template-js53f',
    issue: 'Issue 33'
  },
  {
    id: 2,
    image: require('../../../assets/images/publications/loop_two.png'),
    link: 'https://www.michiganfashionmediasummit.com/the-loop-post/2025/1/28/template-h486f',
    issue: 'Issue 32'
  },
  {
    id: 3,
    image: require('../../../assets/images/publications/loop_three.png'),
    link: 'https://www.michiganfashionmediasummit.com/the-loop-post/2025/1/28/template-nfree',
    issue: 'Issue 31'
  },
  {
    id: 4,
    image: require('../../../assets/images/publications/loop_four.png'),
    link: 'https://www.michiganfashionmediasummit.com/the-loop-post/2025/1/28/template-aceys',
    issue: 'Issue 30'
  },
]
const PublicationsScreen = () => {
    const navigation = useNavigation();
    const handlePress = (url) => {
        Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
    };

  // Logic: First item is the large one, the rest go to the right sidebar
  const featuredItem = loopContent[0];
  const sideItems = loopContent.slice(1);
  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView 
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        >
          <Image source={stitchLogo} style={styles.stitchLogo} />
          <ContentGrid data={stitchContent}/>
          <Image source={loopLogo} style={styles.loopLogo} />
        <View style={styles.gridRow}>
          
          {/* Left Column: Featured Large Item */}
          <TouchableOpacity 
            style={styles.leftColumn} 
            onPress={() => handlePress(featuredItem.link)}
            activeOpacity={0.8}
          >
            <Image source={featuredItem.image} style={styles.largeImage} />
            <AppText variant = "caption" style={styles.label}>{featuredItem.issue}</AppText>
          </TouchableOpacity>

          {/* Right Column: Stacked Sidebar Items */}
          <View style={styles.rightColumn}>
            {sideItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.smallItem}
                onPress={() => handlePress(item.link)}
                activeOpacity={0.8}
              >
                <Image source={item.image} style={styles.smallImage} />
                <AppText variant = "caption" style={styles.label}>{item.issue}</AppText>
              </TouchableOpacity>
            ))}
          </View>

        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

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
  },
  stitchLogo :{
    width: 300,
    height: 250,
    alignSelf: 'center',
  },
  loopLogo :{
    width: 300,
    height: 100,
    alignSelf: 'center',
  }, 
  gridRow: {
    flexDirection: 'row',
    gap: 15, 
    marginHorizontal: 20,
    alignItems: 'stretch'
  },
  leftColumn: {
    flex: 1.8, 
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 10, 
  },
  imageWrapper: {
    flex: 1,
  },
  smallItem: {
    flex: 1,
    overflow: 'hidden',
  },
  largeImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 0.7,
    borderRadius: 4,
  },
  smallImage: {
    width: '100%',
    height: undefined,
    borderRadius: 4,
    flex: 1,
  },
  label: {
    marginTop: 8,
    textAlign: 'center',
    color:colors.darkGray,
  },
});

export default PublicationsScreen;