import { combineReducers } from 'redux';

import deviceReducer from './device/reducer';
import deploymentReducer from './deployment/reducer';
import setupReducer from './setup/reducer';

const reducer = combineReducers({
    device: deviceReducer,
    deployment: deploymentReducer,
    setup: setupReducer,
});

export type State = ReturnType<typeof reducer>;

export default reducer;
