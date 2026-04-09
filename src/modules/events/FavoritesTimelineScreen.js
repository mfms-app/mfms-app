import React from 'react';
import { connect } from 'react-redux';
import { BaseTimelineScreen } from './TimelineScreen';
import { toggleFavorite } from '../favorites/FavoritesState';

function FavoritesTimelineScreen({ schedule, favoriteEventIds, toggleFavorite }) {
  const filtered = React.useMemo(
    () => (schedule || []).filter((e) => favoriteEventIds.includes(e.id)),
    [schedule, favoriteEventIds],
  );

  return (
    <BaseTimelineScreen schedule={filtered} favoriteEventIds={favoriteEventIds} toggleFavorite={toggleFavorite} />
  );
}

export default connect(
  (state) => ({
    schedule: state.schedule.schedule,
    favoriteEventIds: state.favorites.favoriteEventIds,
  }),
  { toggleFavorite },
)(FavoritesTimelineScreen);

