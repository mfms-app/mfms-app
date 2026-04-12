import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from '../../components/Text';
import { colors } from '../../styles';
import { toggleFavorite } from '../favorites/FavoritesState';
import { cancelEventReminder, ensureNotificationsReady, scheduleEventReminder } from '../../services/notifications';

function speakersToDisplayText(speakers) {
  if (speakers == null || speakers === '') return null;
  if (typeof speakers === 'string') {
    const t = speakers.trim();
    return t.length ? t : null;
  }
  if (Array.isArray(speakers)) {
    const lines = speakers
      .map((s) => {
        if (s != null && typeof s === 'object' && 'name' in s) {
          const { name, title } = s;
          if (title) return `${name} — ${title}`;
          return name || '';
        }
        return String(s);
      })
      .filter(Boolean);
    return lines.length ? lines.join('\n') : null;
  }
  return null;
}

export function BaseTimelineScreen({
  schedule,
  favoriteEventIds,
  toggleFavorite,
  omitInScreenHeader = false,
}) {
  const sorted = React.useMemo(() => {
    const copy = [...(schedule || [])];
    copy.sort((a, b) => {
      const at = a.startDateTimeISO ? new Date(a.startDateTimeISO).getTime() : 0;
      const bt = b.startDateTimeISO ? new Date(b.startDateTimeISO).getTime() : 0;
      return at - bt;
    });
    return copy;
  }, [schedule]);

  const onToggleFavorite = async (event) => {
    const isFavorite = favoriteEventIds.includes(event.id);
    toggleFavorite(event.id);

    try {
      await ensureNotificationsReady();
      if (isFavorite) {
        await cancelEventReminder(event.id);
      } else {
        await scheduleEventReminder({
          eventId: event.id,
          title: event.title,
          startDateTimeISO: event.startDateTimeISO,
        });
      }
    } catch (e) {
      // If permissions denied or schedule fails, favorites still work.
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {!omitInScreenHeader ? (
          <View style={styles.header}>
            <AppText variant="h1" style={styles.title}>
              Timeline
            </AppText>
            <View style={styles.divider} />
          </View>
        ) : null}

        {sorted.map((event) => {
          const speakersText = speakersToDisplayText(event.speakers);
          return (
          <View key={event.id} style={styles.card}>
            <View style={styles.row}>
              <AppText variant="caption" style={styles.time}>
                {event.startTime} - {event.endTime}
              </AppText>

              <TouchableOpacity
                onPress={() => onToggleFavorite(event)}
                style={[
                  styles.favoriteButton,
                  favoriteEventIds.includes(event.id) && styles.favoriteButtonActive,
                ]}
              >
                <AppText
                  variant="caption"
                  style={[
                    styles.favoriteText,
                    favoriteEventIds.includes(event.id) && styles.favoriteTextActive,
                  ]}
                >
                  {favoriteEventIds.includes(event.id) ? 'Favorited' : 'Favorite'}
                </AppText>
              </TouchableOpacity>
            </View>
            <AppText variant="h3" style={styles.eventTitle}>
              {event.title}
            </AppText>
            {event.location ? (
              <AppText variant="caption" style={styles.location}>
                {event.location}
              </AppText>
            ) : null}
            {speakersText ? (
              <AppText variant="caption" style={styles.speakers}>
                {speakersText}
              </AppText>
            ) : null}
            {event.description ? (
              <AppText variant="body" style={styles.description}>
                {event.description}
              </AppText>
            ) : null}
          </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

export default connect(
  (state) => ({
    schedule: state.schedule.schedule,
    favoriteEventIds: state.favorites.favoriteEventIds,
  }),
  { toggleFavorite },
)(BaseTimelineScreen);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  container: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  header: { alignItems: 'center' },
  title: { marginTop: 10, textAlign: 'center', color: colors.black },
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
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  time: { color: colors.blue, marginBottom: 6 },
  favoriteButton: {
    borderWidth: 1,
    borderColor: colors.blue,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  favoriteButtonActive: {
    backgroundColor: colors.blue,
  },
  favoriteText: {
    color: colors.blue,
  },
  favoriteTextActive: {
    color: colors.white,
  },
  eventTitle: { color: colors.black },
  location: { color: colors.gray, marginTop: 6 },
  speakers: { color: colors.gray, marginTop: 6 },
  description: { color: colors.black, marginTop: 10 },
});

