import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppText from '../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { cancelEventReminder, ensureNotificationsReady, scheduleEventReminder } from '../../services/notifications';

import { speakers as speakerData } from '../speakers/SpeakerData';

export default function ScheduleScreen({
  schedule,
  selectedSessions,
  loadSchedule,
  favoriteEventIds,
  toggleFavorite,
}) {
  const [expandedSession, setExpandedSession] = useState(null);

  React.useEffect(() => {
    loadSchedule();
  }, []);
  const toggleDropdown = (sessionId) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };
  const navigation = useNavigation();

  const onFavoritePress = async (session) => {
    const wasFavorite = favoriteEventIds.includes(session.id);
    toggleFavorite(session.id);
    try {
      await ensureNotificationsReady();
      if (wasFavorite) {
        await cancelEventReminder(session.id);
      } else {
        await scheduleEventReminder({
          eventId: session.id,
          title: session.title,
          startDateTimeISO: session.startDateTimeISO,
        });
      }
    } catch (e) {
      // Favorites still update if notifications fail (same as profile timeline).
    }
  };

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

  const renderSession = (session) => {
    const hasSpeakers = session.speakers && session.speakers !== '';
    const isFavorite = favoriteEventIds.includes(session.id);

    return (
      <View
        key={session.id}
        style={[styles.sessionCard, selectedSessions.includes(session.id) && styles.selectedCard]}
      >
        <View style={styles.sessionHeader}>
          <TouchableOpacity
            style={styles.sessionMainTouchable}
            activeOpacity={hasSpeakers ? 0.7 : 1}
            onPress={() => {
              if (hasSpeakers) toggleDropdown(session.id);
            }}
          >
            <View style={styles.sessionTextContainer}>
              <AppText variant="bodyBlue">
                {session.startTime} - {session.endTime}
              </AppText>
              <AppText variant="h2">{session.title}</AppText>
              <AppText variant="body">{session.location}</AppText>
            </View>
          </TouchableOpacity>

          <View style={styles.sessionHeaderActions}>
            <TouchableOpacity
              onPress={() => onFavoritePress(session)}
              accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Icon
                name={isFavorite ? 'heart' : 'heart-o'}
                size={20}
                color={colors.blue}
              />
            </TouchableOpacity>
            {hasSpeakers ? (
              <TouchableOpacity
                onPress={() => toggleDropdown(session.id)}
                style={styles.chevronButton}
                accessibilityLabel={expandedSession === session.id ? 'Collapse session' : 'Expand session'}
              >
                <Icon
                  name={expandedSession === session.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.black}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {expandedSession === session.id && hasSpeakers ? (
          <View>
            {renderFormattedSpeakers(session.speakers)}
            {session.description && (
              <View style={styles.sessionDescriptionContainer}>
                <AppText variant='body' style={styles.sessionDescription}>
                  {session.description}
                </AppText>
              </View>
            )}
          </View>
        ) : null}
      </View>
    );
  };

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
    flex: 1,
  },
  sessionMainTouchable: {
    flex: 1,
    paddingRight: 8,
  },
  sessionHeaderActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favoriteHeartButton: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.white,
    marginBottom: 6,
  },
  chevronButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  sessionDescriptionContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray + '30',
  },
  sessionDescription: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 15,
    color: colors.darkGray,
    lineHeight: 22,
  },
}); 