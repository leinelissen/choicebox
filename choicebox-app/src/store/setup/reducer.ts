import { SetupState, SetupActions } from './types';

const initialState: SetupState = {
    isRegistrationComplete: false,
    isTourComplete: false,
};

export default function reducer(state = initialState, action): SetupState {
    switch (action.type) {
        case SetupActions.registrationIsComplete:
            return {
                ...state,
                isRegistrationComplete: true,
            };
        case SetupActions.tourIsComplete:
            return {
                ...state,
                isTourComplete: true,
            };
        default:
            return state;
    }
}
