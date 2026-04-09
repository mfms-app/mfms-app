// Action Types
const TOGGLE_FAVORITE = 'Favorites/TOGGLE_FAVORITE';

const defaultState = {
  favoriteEventIds: [],
};

export function toggleFavorite(eventId) {
  return {
    type: TOGGLE_FAVORITE,
    eventId,
  };
}

export default function FavoritesReducer(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      const exists = state.favoriteEventIds.includes(action.eventId);
      return {
        ...state,
        favoriteEventIds: exists
          ? state.favoriteEventIds.filter((id) => id !== action.eventId)
          : [...state.favoriteEventIds, action.eventId],
      };
    }
    default:
      return state;
  }
}

