import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import appReducer from './appReducer';
import numerologyReducer from './numerologyReducer';

export default combineReducers({
  form: formReducer,
  app: appReducer,
  numerology: numerologyReducer
});
