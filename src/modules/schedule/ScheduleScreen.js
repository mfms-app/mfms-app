import React,  { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { colors, fonts } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppText from '../../components/Text';
import { useNavigation } from '@react-navigation/native';

import {speakers as speakerData} from '../speakers/SpeakerData';
import border from 'victory-native/lib/components/victory-primitives/border';

export default function ScheduleScreen({ schedule, selectedSessions, loadSchedule }) {
  const [expandedSession, setExpandedSession] = useState(null);

  React.useEffect(() => {
    loadSchedule();
  }, []);
  const toggleDropdown = (sessionId) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };
  const navigation = useNavigation();
  const renderFormattedSpeakers = (speakersArray) => {

  const fullSpeakerObject = (speakerName) => {
    return speakerData.find(
      (s) => s.name.toLowerCase() === speakerName.toLowerCase()
    );
  }

  const handlePress = (speakerName) => {
      const speaker = fullSpeakerObject(speakerName);
      if (speaker) {
        // This will now use the 'navigation' defined at the top level
        navigation.navigate('SpeakerDetails', { speaker: speaker }); 
      } else {
        console.warn(`No data found for speaker: ${speakerName}`);
      }
    };

  return (
    <View style={styles.speakersContainer}>
      {speakersArray.map((speaker, index) => (
        <TouchableOpacity 
          key={index} 
          style={fullSpeakerObject(speaker.name) ? styles.speakerItem: styles.noLinkSpeakerItem}
          // Pass the name to the handler to perform the lookup
          onPress={() => handlePress(speaker.name)}
          activeOpacity={0.7}
        >
          <View style={styles.speakerTextContainer}>
            <AppText variant='h3'>{speaker.name}</AppText>
            {speaker.title && (
              <AppText variant='caption'>{speaker.title}</AppText>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

  const renderSession = (session) => (
    <View
      key={session.id}
      style={[styles.sessionCard, selectedSessions.includes(session.id) && styles.selectedCard]}
    >
      {/* Make the entire card act as a button only if there are speakers */}
      <TouchableOpacity 
        activeOpacity={session.speakers && session.speakers !== '' ? 0.7 : 1}
        onPress={() => {
          if (session.speakers && session.speakers !== '') {
            toggleDropdown(session.id);
          }
        }}
      >
        <View style={styles.sessionHeader}>
          <View style={styles.sessionTextContainer}>
            <AppText variant='bodyBlue'>{session.startTime} - {session.endTime}</AppText>
            <AppText variant='h2'>{session.title}</AppText>
            <AppText variant='body'>{session.location}</AppText>
          </View>
          
          {/* Only show dropdown icon if speakers exist */}
          {session.speakers && session.speakers !== '' && (
            <View style={styles.iconContainer}>
              <Icon 
                name={expandedSession === session.id ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color={colors.black}
              />
            </View>
          )}
        </View>
        
        {/* Speakers section with italics for titles */}
        {expandedSession === session.id && session.speakers && (
          renderFormattedSpeakers(session.speakers)
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>  
      <ScrollView>
        <AppText variant='h1' style={styles.header}>Schedule</AppText>
        <View style={styles.divider} />        
        {schedule.map(renderSession)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 25,
  },
  header:{
    textAlign: 'center',
    marginHorizontal: 20,
  },
  divider: {
    width: '50%', 
    alignSelf: 'center',
    height: 1, 
    backgroundColor: colors.black,  
    marginTop: 8,
    marginBottom: 20, 
    marginHorizontal: 20,
  },
  sessionCard: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 16,
    shadowColor: colors.darkGray,
    shadowOffset: { 
      width: 0,   // Centered horizontally
      height: 0   // Centered vertically
    },
    shadowOpacity: 0.3,  // Slightly increased opacity
    shadowRadius: 4,     // Increased blur radius
    elevation: 6,        
    // Add these properties to ensure shadow on all sides
    shadowSpread: 10,     // Spread the shadow slightly
    borderWidth: 0.1,    // Extremely thin border can help define edges
    borderColor: colors.darkGray + '20', 
  },
  selectedCard: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  time: {
    fontFamily: "NeueHaasDisplayRoman",
    color: colors.blue,
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 19.5,
    fontWeight: 'bold',
    color: colors.black
  },
  speakers: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 16.5,
    color: colors.black,
  },
  speakersContainer: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.gray + '30',
    alignItems: 'flex-start', // Change to flex-start to align to the left
  },
  speakerTextContainer: {
    alignItems: 'flex-start', // Change to flex-start to align to the left
  },
  speakerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    // Shadow for iOS
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    width: '100%',
  },
  noLinkSpeakerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    marginVertical: 5,
  },
  speakerName: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 17,
    fontWeight: '500',
    color: colors.black,
    textAlign: 'left', // Change to left alignment
  },
  speakerTitle: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 17,
    fontStyle: 'italic',
    color: colors.gray,
    marginTop: 2,
    textAlign: 'left', // Change to left alignment
  },
  location: {
    marginTop: 7,
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 16,
    color: colors.darkGray,
    textTransform: "capitalize"
  },
  button: {
    backgroundColor: colors.white,  
    borderColor: colors.gray,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: '20%',
    borderWidth: 1.5,
  },
  buttonPressed: {
    backgroundColor: colors.black, 
    borderColor: colors.white, 
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: '20%',
    borderWidth: 1.5,
  },
  buttonText: {
    color: colors.black, 
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontFamily: "NeueHaasDisplayRoman",
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This pushes the icon to the right
    alignItems: 'flex-start', // Align items to the top
  },
  sessionTextContainer: {
    flex: 1, // Take up available space
    paddingRight: 16, // Add some space between text and icon
  },
  iconContainer: {
    paddingTop: 2, // Align icon vertically with the time text
    paddingLeft: 8,
  },
}); 