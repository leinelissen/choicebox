import React, { Component, ReactNode } from 'react';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';

import initializeStore from 'store';
// import GlobalStyles from 'styles/global';
import Navigator from 'screens';
import Setup from 'screens/Setup';

const store = initializeStore();

interface State {
    isFontLoaded: boolean;
}

class App extends Component<{}, State> {
    state = {
        isFontLoaded: false,
    };

    componentDidMount(): void {
        Font.loadAsync({
            'IBMPlexSans-Light': require('../../../assets/fonts/IBMPlexSans-Light.otf'),
        }).then(() => this.setState({ isFontLoaded: true }));
    }

    public render(): ReactNode {
        const { isFontLoaded } = this.state;
        const { device: { isInitialised } } = store.getState();

        if (!isFontLoaded) {
            return null;
        }

        return (
            <Provider store={store}>
                <>
                    {/* <GlobalStyles /> */}
                    {isInitialised ? <Navigator /> : <Setup />}
                </>
            </Provider>
        );
    }
}

export default App;
