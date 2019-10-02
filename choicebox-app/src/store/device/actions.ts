// import { DeviceActions } from './types';
import { Platform } from 'react-native';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { askAsync as AskPermissionsAsync, NOTIFICATIONS } from 'expo-permissions';
import { Notifications } from 'expo';
import { BACKEND_HOST } from 'utilities/env';
import { Device, DeviceSetAction, DeviceActions } from './types';

/**
 * Save the result from a registration call in Redux
 */
export function setDevice(payload: Device): DeviceSetAction {
    return {
        type: DeviceActions.setDevice,
        payload,
    };
}

/**
 * Register a mobile device in the back-end
 */
export function registerMobileDevice(hardwareKey: string):
    ThunkAction<void, {}, {}, AnyAction> {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
        // We have to ask permissions for notifications first, since that is a
        // requirement for requesting an Expo Push token, which in turn is an
        // requirement for registering a mobile device.
        AskPermissionsAsync(NOTIFICATIONS)
            .then(({ status }) => {
                // GUARD: Check if the permission request was successful
                if (status !== 'granted') {
                    throw new Error('Request for notifications was declined.');
                }

                // If the request was successful, retrieve the Expo Push Token
                return Notifications.getExpoPushTokenAsync();
            })
            // Now that we have a token, we can construct a request to the
            // back-end with it, so that we can register the device
            .then((expoToken) => {
                // Construct a request to the API for registering the mobile device
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        hardware_key: hardwareKey,
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        expo_token: expoToken,
                        type: Platform.OS.toUpperCase(),
                    }),
                };

                // Execute the request
                return fetch(`${BACKEND_HOST}/api/mobile/register`, options);
            })
            // Parse the response as JSON
            .then((response) => response.json())
            .then((response) => {
                // GUARD: Check if request was successful
                if (response.error) {
                    throw new Error(`Request failed: "${response.message}"`);
                }

                // If the request is successful, set the device in Redux
                dispatch(setDevice(response));
            });
    };
}
