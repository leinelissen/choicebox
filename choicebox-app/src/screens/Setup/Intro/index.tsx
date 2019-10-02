import React, { Component, ReactNode } from 'react';
import { Button } from 'react-native';

import CenteredScreen from 'components/CenteredScreen';
import { Paragraph, Heading } from 'components/Typography/Overlay';
import { NavigationInjectedProps } from 'react-navigation';


class Intro extends Component<NavigationInjectedProps> {
    handlePress = (): void => {
        this.props.navigation.navigate('Scan');
    }

    public render(): ReactNode {
        return (
            <CenteredScreen>
                <Heading>Nice to meet you!</Heading>
                <Paragraph>Thanks for making your first choice — choosing ChoiceBox! </Paragraph>
                <Paragraph>There&apos;s more where that come from; ChoiceBox is an ecosystem where you make choices about your privacy.</Paragraph>
                <Paragraph>It all starts with the little black box that came shipped with your ChoiceBox package. Let&apos;s open it up and get started.</Paragraph>
                <Paragraph>(this should take ~15 minutes)</Paragraph>
                <Button title="Get Started" onPress={this.handlePress} />
            </CenteredScreen>
        );
    }
}

export default Intro;
