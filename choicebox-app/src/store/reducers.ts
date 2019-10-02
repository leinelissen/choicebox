import { combineReducers } from 'redux';

import deviceReducer from './device/reducer';

const reducer = combineReducers({
    device: deviceReducer,
});

export type State = ReturnType<typeof reducer>;

export default reducer;
