import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';

import CenteredScreen from 'components/CenteredScreen';
import { Paragraph, Heading } from 'components/Typography/Overlay';
import { registerMobileDevice } from 'store/device/actions';
import { State as ApplicationState } from 'store/reducers';
import { Device } from 'store/device/types';

interface Props extends NavigationInjectedProps {
    // The hardware_key that should be injected by the previous screen. We need
    // this in order to register the mobile device.
    key: string;
    registerMobileDevice: typeof registerMobileDevice;
}

interface StateProps {
    device: Device;
}

class Register extends Component<Props & StateProps> {
    componentDidMount(): void {
        // Get key from navigation parameters
        const key = this.props.navigation.getParam('key');

        // Then use the key for registering the device
        this.props.registerMobileDevice(key);
    }

    componentDidUpdate(): void {
        // Listen for any changes in the device prop from the store. If this
        // changes, this means that the request was successful, and the device
        // has been registered.
        if (this.props.device) {
            this.props.navigation.navigate('ConnectHardware');
        }
    }

    public render(): ReactNode {
        const key = this.props.navigation.getParam('key');

        return (
            <CenteredScreen>
                <Heading>Registering...</Heading>
                <Paragraph>Please wait a second while we link this app to your ChoiceBox. </Paragraph>
                <Paragraph style={{ opacity: 0.2 }}>{`Key: "${key}"`}</Paragraph>
            </CenteredScreen>
        );
    }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
    device: state.device.device,
});

const mapDispatchToProps = {
    registerMobileDevice,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
