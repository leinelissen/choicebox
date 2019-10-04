import React, { Component, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { loadAsync as LoadFontsAsync } from 'expo-font';

import { store, persistor } from 'store';
import Navigator from 'screens';
import Setup from 'screens/Setup';
import { PersistGate } from 'redux-persist/integration/react';
import Tour from 'screens/Requests/Tour';

interface State {
    areFontsLoaded: boolean;
}

class App extends Component<{}, State> {
    state = {
        // Whether all fonts have been loaded yet
        areFontsLoaded: false,
    };

    componentDidMount(): void {
        // Load the fonts
        LoadFontsAsync({
            // eslint-disable-next-line global-require
            'IBMPlexSans-Light': require('../../../assets/fonts/IBMPlexSans-Light.otf'),
            // eslint-disable-next-line global-require
            'IBMPlexSans-Regular': require('../../../assets/fonts/IBMPlexSans-Regular.otf'),
            // eslint-disable-next-line global-require
            'IBMPlexSans-SemiBold': require('../../../assets/fonts/IBMPlexSans-SemiBold.otf'),
        }).then(() => this.setState({ areFontsLoaded: true }));
    }

    public render(): ReactNode {
        const { areFontsLoaded } = this.state;
        const { setup: { isRegistrationComplete, isTourComplete } } = store.getState();

        if (!areFontsLoaded) {
            return null;
        }

        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Navigator />
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
