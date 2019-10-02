import React, { Component, ReactNode } from 'react';
import { Text } from 'react-native';

import CenteredScreen from 'components/CenteredScreen';
import styled from 'styled-components/native';

const Paragraph = styled.Text`
    color: #9F9F9F;
    line-height: 24px;
    font-size: 16px;
    text-align: center;
    margin-bottom: 24px;
`;

class Intro extends Component {
    public render(): ReactNode {
        return (
            <CenteredScreen>
                <Paragraph>Thanks for making your first choice — choosing ChoiceBox! </Paragraph>
                <Paragraph>There&apos;s more where that come from; ChoiceBox is an ecosystem where you make choices about your privacy.</Paragraph>
                <Paragraph>It all starts with the little black box that came shipped with your ChoiceBox package. Let&apos;s open it up and get started.</Paragraph>
                <Paragraph>(this should take ~15 minutes)</Paragraph>
            </CenteredScreen>
        );
    }
}

export default Intro;
