import { SetupAction, SetupActions } from './types';

/**
 * Set a flag that the registration is complete
 */
export function registrationIsComplete(): SetupAction {
    return {
        type: SetupActions.registrationIsComplete,
    };
}

/**
 * Set a flag that the tour is complete
 */
export function tourIsComplete(): SetupAction {
    return {
        type: SetupActions.tourIsComplete,
    };
}
