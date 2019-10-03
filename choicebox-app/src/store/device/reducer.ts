import { DeviceState, DeviceActions } from './types';

/**
 * This is the intial state for this particular reducer. It should follow the
 * blueprint for the state for the reducer as mentioned in types.ts
 */
const initialState: DeviceState = {
    isInitialised: false,
    isTourComplete: false,
};

/**
 * This is the reducer. It gets the state and a new action, and the mutated
 * state is returned to Redux.
 */
function reducer(state: DeviceState = initialState, action): DeviceState {
    switch (action.type) {
        case DeviceActions.setDevice:
            return {
                ...state,
                device: action.payload,
            };
        case DeviceActions.setAccessToken:
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;
