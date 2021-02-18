import { SET_USER, START_LOADING, FINISH_LOADING, CLEAR_STATE } from './types';

export const initialNearState = {
  user: null,
  isLoading: false,
};

export const nearReducer = (currentState = initialNearState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...currentState,
        user: action.payload.user,
      };

    case START_LOADING:
      return {
        ...currentState,
        isLoading: true,
      };

    case FINISH_LOADING:
      return {
        ...currentState,
        isLoading: false,
      };

    case CLEAR_STATE:
      return initialNearState;

    default:
      throw new Error('Unexpected state...');
  }
};
