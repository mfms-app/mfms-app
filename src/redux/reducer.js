import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import app from '../modules/AppState';
import schedule from '../modules/schedule/ScheduleState';
import favorites from '../modules/favorites/FavoritesState';

export default combineReducers({
  // ## Generator Reducers
  app,
  schedule,
  favorites,
});
