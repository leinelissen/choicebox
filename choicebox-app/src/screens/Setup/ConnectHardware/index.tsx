import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';

import CenteredScreen from 'components/CenteredScreen';
import { Paragraph, Heading } from 'components/Typography/Overlay';
import { State as ApplicationState } from 'store/reducers';
import { Device } from 'store/device/types';

interface StateProps {
    device: Device;
}

class ConnectHardware extends Component<NavigationInjectedProps & StateProps> {
    componentDidMount(): void {
        // TODO: Use this.props.device and Laravel Echo to connect to the
        // deployment's presence channel, so that we can wait for the hardware
        // device to come online.
        console.log(this.props.device);
    }

    public render(): ReactNode {
        return (
            <CenteredScreen>
                <Heading>Finding ChoiceBox...</Heading>
                <Paragraph>Your ChoiceBox has been registered. However, you will need to connect it to power, as well as to your home network using the included cables.</Paragraph>
                <Paragraph>We&apos;ll try and find it in the meantime and let you know as soon.</Paragraph>
            </CenteredScreen>
        );
    }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
    device: state.device.device,
});

export default connect(mapStateToProps)(ConnectHardware);
