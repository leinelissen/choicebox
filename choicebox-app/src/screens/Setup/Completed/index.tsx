import React, { Component, ReactNode } from 'react';
import { Button } from 'react-native';

import CenteredScreen from 'components/CenteredScreen';
import { Paragraph, Heading } from 'components/Typography/Overlay';
import { NavigationInjectedProps } from 'react-navigation';

class Completed extends Component<NavigationInjectedProps> {
    handlePress = (): void => {
        // this.props.navigation.navigate('Scan');
    }

    public render(): ReactNode {
        return (
            <CenteredScreen>
                <Heading>Great success!</Heading>
                <Paragraph>Your ChoiceBox will automatically seek out data sources in your home, as long as it is connected to power and your home network.</Paragraph>
                <Paragraph>Remember that you will need to give explicit permission to any outside source that wishes to access this data.</Paragraph>
                <Paragraph>This choice-making happens in the app that you have currently opened. We&apos;ll show you how to do that now.</Paragraph>
                <Button title="Open Up the App" onPress={this.handlePress} />
            </CenteredScreen>
        );
    }
}

export default Completed;
