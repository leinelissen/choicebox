import { State } from 'store/reducers';
import { BACKEND_HOST } from 'utilities/env';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { DeploymentState, DeploymentSetAction, DeploymentActions } from './types';

/**
 * Store deployment in Redux
 */
export function setDeployment(payload: DeploymentState): DeploymentSetAction {
    return {
        type: DeploymentActions.set,
        payload,
    };
}

/**
 * Retrieve the deployment from the back-end
 */
export function retrieveDeployment():
ThunkAction<void, {}, {}, AnyAction> {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => State): void => {
        // Retrieve access token from store
        const { access_token } = getState().device.token;

        // Prepare request
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
        };

        // Perform request
        fetch(`${BACKEND_HOST}/api/device/deployment`, options)
            .then((response) => response.json())
            .then((response) => {
                dispatch(setDeployment(response));
                console.log('Retrieved deployment...');
            });
    };
}
