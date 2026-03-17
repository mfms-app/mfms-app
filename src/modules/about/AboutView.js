import React, { useRef, useEffect } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  View,
  Animated,
} from 'react-native';
import Video from 'react-native-video'; // Add back the Video import

import { colors} from '../../styles';
import TeamDropdown from './TeamDropdown.js';
import teamData from '../../data/studentplanningteam.js';

const AboutScreen = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const videoRef = useRef(null);

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        })
      ]),
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
        {/* Header Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Who We Are</Text>
          <View style={styles.divider} />
        </View>

        <ScrollView 
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.container, { opacity: contentFade }]}>
          {/* Video Section - Rectangular shape */}
          <View style={styles.videoContainer}>
            <Video
              ref={videoRef}
              source={require('../../../assets/videos/mfms_about_us.mov')}
              style={styles.video}
              resizeMode="cover"
              repeat={true}
              paused={false}
              muted={true}
              playInBackground={false}
              playWhenInactive={true}
              onError={(error) => console.log('Video Error:', error)}
              onLoad={() => console.log('Video loaded successfully')}
              onReadyForDisplay={() => console.log('Video ready for display')}
            />
          </View>

          {/* About Us Content */}
          <Text style={styles.heading}>Our Story</Text>
          <Text style={styles.description}>
            We are a student-led organization established in 2018 to provide opportunities 
            for students aspiring to careers in fashion and media. The MFMS was founded to 
            connect the "leaders and best" to a multitude of career options in these fields. 
            Our objective remains to help shape the future fabric of fashion through greater 
            exposure to the experiences and opportunities available.
          </Text>
          
        
          <Text style={styles.heading}>Our Summit</Text>
          <Text style={styles.description}>
            The Michigan Fashion Media Summit is an annual day-long event in the Ross 
            School of Business that connects students with industry leaders. Our conference 
            comprises keynote conversations, collaborative panel discussions, exclusive 
            networking events, and skill-building workshops. The event concludes with the 
            Fashion Forward Showcase, our initiative to highlight emerging, nationwide 
            student designers.
          </Text>

          <Text style={styles.heading}>Our Mission</Text>
          <Text style={styles.description}>
            To inspire and educate the next generation of industry leaders, while forging 
            valuable connections between the University of Michigan's top talent and 
            premier fashion and media companies.
          </Text>

          <Text style={styles.heading}>Our Team</Text>
          <View style={{ gap: 10 }}>
          <TeamDropdown title="Co-Presidents and COO" team={teamData.coPresidents} />
          <TeamDropdown title="Creative" team={teamData.creative} />
          <TeamDropdown title="Digital" team={teamData.digital} />
          <TeamDropdown title="Marketing" team={teamData.marketing} />
          <TeamDropdown title="Event Planning" team={teamData.eventPlanning} />
          <TeamDropdown title="Social" team={teamData.social} />
          <TeamDropdown title="Partnerships" team={teamData.partnerships} />
          <TeamDropdown title="Finance" team={teamData.finance} />
          <TeamDropdown title="DEI" team={teamData.dei} />
          <TeamDropdown title="Strategic Development" team={teamData.strategicDevelopment} />
          </View>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title:{
    marginTop: 25,
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 36,
    fontWeight: '600', //semi-bold
    textAlign: 'center',
    color: colors.black,
    marginHorizontal: 20,
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
  outlinedTextContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlinedText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    textTransform: 'lowercase',
  },
  outlinedTextShadow: {
    position: 'absolute',
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.blue,
    textAlign: 'center',
    textTransform: 'lowercase',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 22,
    fontFamily: "NeueHaasDisplayRoman",
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.blue,
  },
  description: {
    fontSize: 16,
    fontFamily: "NeueHaasDisplayRoman",
    lineHeight: 22,
    color: colors.gray || '#555',
    marginBottom: 20,
  },
  // Rectangular video styles
  videoContainer: {
    width: '115%',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
    borderRadius: 0,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: 250, // More rectangular aspect ratio
    backgroundColor: '#000',
  },
});

export default AboutScreen;