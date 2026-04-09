import notifee, { TriggerType } from '@notifee/react-native';

const CHANNEL_ID = 'favorites';

export async function ensureNotificationsReady() {
  await notifee.requestPermission();

  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Favorites',
    sound: 'default',
  });
}

export async function scheduleEventReminder({ eventId, title, startDateTimeISO }) {
  if (!startDateTimeISO) return null;

  const startMs = new Date(startDateTimeISO).getTime();
  const triggerMs = startMs - 10 * 60 * 1000;
  if (Number.isNaN(triggerMs) || triggerMs <= Date.now()) return null;

  const notificationId = `event:${eventId}`;

  await notifee.createTriggerNotification(
    {
      id: notificationId,
      title: 'Starting soon',
      body: title,
      android: {
        channelId: CHANNEL_ID,
        pressAction: { id: 'default' },
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: triggerMs,
    },
  );

  return notificationId;
}

export async function cancelEventReminder(eventId) {
  const notificationId = `event:${eventId}`;
  await notifee.cancelNotification(notificationId);
}

