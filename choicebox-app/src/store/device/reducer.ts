import { DeviceState } from './types';

const initialState: DeviceState = {
    isInitialised: false,
    isTourComplete: false,
};

function reducer(state: DeviceState = initialState, action): DeviceState {
    switch (action.type) {
        default:
            return state;
    }
}

export default reducer;
