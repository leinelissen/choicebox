import { combineReducers } from 'redux';

import deviceReducer from './device/reducer';
import deploymentReducer from './deployment/reducer';

const reducer = combineReducers({
    device: deviceReducer,
    deployment: deploymentReducer,
});

export type State = ReturnType<typeof reducer>;

export default reducer;
