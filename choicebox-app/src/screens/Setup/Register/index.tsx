import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';

import CenteredScreen from 'components/CenteredScreen';
import { Paragraph, Heading } from 'components/Typography/Overlay';
import { registerMobileDevice } from 'store/device/actions';
import { retrieveDeployment } from 'store/deployment/actions';
import { State as ApplicationState } from 'store/reducers';
import { Device, Token } from 'store/device/types';

interface Props extends NavigationInjectedProps {
    // The hardware_key that should be injected by the previous screen. We need
    // this in order to register the mobile device.
    key: string;
    registerMobileDevice: typeof registerMobileDevice;
    retrieveDeployment: typeof retrieveDeployment;
}

interface StateProps {
    device: Device;
    token: Token;
    deploymentId: number;
}

class Register extends Component<Props & StateProps> {
    componentDidMount(): void {
        // Get key from navigation parameters
        const key = this.props.navigation.getParam('key');

        // Then use the key for registering the device
        this.props.registerMobileDevice(key);
    }

    componentDidUpdate(): void {
        const { device, token, deploymentId } = this.props;

        // Listen for any changes in the device prop from the store. If this
        // changes, this means that the request was successful, and the device
        // has been registered.
        if (device && token && !deploymentId) {
            // We must wait for the device and token to be retrieved, before we
            // can do a request for the deployment. As soon as we have received
            // those, we'll retrieve the deployment from the back-end.
            this.props.retrieveDeployment();
        } else if (device && token && deploymentId) {
            // If the deployment is also retrieved, we can navigate to the next
            // screen and have the user connect the box.
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
    token: state.device.token,
    deploymentId: state.deployment.id,
});

const mapDispatchToProps = {
    registerMobileDevice,
    retrieveDeployment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
