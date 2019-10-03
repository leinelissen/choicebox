import { DeploymentState, DeploymentActions } from './types';

/**
 * This is the intial state for this particular reducer. It should follow the
 * blueprint for the state for the reducer as mentioned in types.ts
 */
const initialState: DeploymentState = {
    //
};

/**
 * This is the reducer. It gets the state and a new action, and the mutated
 * state is returned to Redux.
 */
function reducer(state: DeploymentState = initialState, action): DeploymentState {
    switch (action.type) {
        case DeploymentActions.set:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;
