export interface SetupState {
    isRegistrationComplete: boolean;
    isTourComplete: boolean;
};

export enum SetupActions {
    registrationIsComplete = 'SETUP_REGISTRATION_IS_COMPLETE',
    tourIsComplete = 'SETUP_TOUR_IS_COMPLETE',
};

export interface SetupAction {
    type: SetupActions;
}
