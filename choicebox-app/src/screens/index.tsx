import React, { FunctionComponent } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { useSelector } from 'react-redux';
import { State } from 'store/reducers';

import SetupStack from './Setup';

import RequestsScreen from './Requests';
import LogScreen from './Log';
import AIScreen from './AI';
import HelpScreen from './Help';

// Define all top-level screens here
const TabNavigator = createBottomTabNavigator({
    Requests: RequestsScreen,
    Log: LogScreen,
    AI: AIScreen,
    Help: HelpScreen,
});

// Create app container for both the normal app flow, as well as the setup flow
const AppNavigator = createAppContainer(TabNavigator);
const SetupNavigator = createAppContainer(SetupStack);

export default function NavigationSelector(): FunctionComponent {
    // Retrieve the registration status from the store
    const isRegistrationComplete = useSelector(
        (state: State) => state.setup.isRegistrationComplete,
    );

    // Log any re-renders because of performance
    console.log('[NAVIGATION-SELECTOR] isRegistrationComplete: ', isRegistrationComplete);

    // NOTE: TypeScript will throw an error because it cannot recognise this
    // pattern correctly, but it does make sense.
    return isRegistrationComplete
        ? <AppNavigator />
        : <SetupNavigator />;
}
