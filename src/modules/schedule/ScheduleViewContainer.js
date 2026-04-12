import { connect } from 'react-redux';
import ScheduleScreen from './ScheduleScreen';
import { loadSchedule } from './ScheduleState';
import { toggleFavorite } from '../favorites/FavoritesState';

export default connect(
  state => ({
    schedule: state.schedule.schedule,
    selectedSessions: state.schedule.selectedSessions,
    favoriteEventIds: state.favorites.favoriteEventIds,
  }),
  {
    loadSchedule,
    toggleFavorite,
  },
)(ScheduleScreen); 