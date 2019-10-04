import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';
import Pusher from 'pusher-js/react-native';
import Echo from 'laravel-echo';

import CenteredScreen from 'components/CenteredScreen';
import { Paragraph, Heading } from 'components/Typography/Overlay';
import { State as ApplicationState } from 'store/reducers';
import { BACKEND_HOST, PUSHER_KEY, WS_HOST } from 'utilities/env';

interface StateProps {
    accessToken: string;
    deploymentId: number;
}

class ConnectHardware extends Component<NavigationInjectedProps & StateProps> {
    // This will store the Pusher client
    pusherSocket = null;

    // This will store the Laravel Echo interface to the Pusher client
    echo = null;

    /**
     * Setup the socket connection to the back-end
     */
    componentDidMount(): void {
        const { accessToken, deploymentId } = this.props;

        // Required for debugging the Pusher connection
        // Pusher.log = console.log;

        // Create a socket using the following config
        this.pusherSocket = new Pusher(PUSHER_KEY, {
            wsHost: WS_HOST,
            wsPort: 6001,
            authEndpoint: `${BACKEND_HOST}/broadcasting/auth`,
            auth: {
                headers: {
                    // Set the Authorization header so that the device is
                    // recognised as trying to access the private channel
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        });

        // Register the Echo interface
        this.echo = new Echo({
            broadcaster: 'pusher',
            key: PUSHER_KEY,
            client: this.pusherSocket,
        });

        // Join the deployment channel to see who is online
        this.echo.join(`Deployment.${deploymentId}`)
            .here((members) => members.forEach(this.handleNewPresenceMember));
    }

    /**
     * Clean up after the component is destined for destruction
     */
    componentWillUnmount(): void {
        this.pusherSocket.disconnect();
    }

    /**
     * Handle whenever a new person gets added to the presence channel on the
     * socket connection.
     */
    handleNewPresenceMember = (device): void => {
        if (device.type === 'HARDWARE') {
            this.props.navigation.navigate('Completed');
        }
    }

    public render(): ReactNode {
        return (
            <CenteredScreen>
                <Heading>Finding ChoiceBox...</Heading>
                <Paragraph>Your ChoiceBox has been registered. However, you will need to connect it to power, as well as to your home network using the included cables.</Paragraph>
                <Paragraph>We&apos;ll try and find it in the meantime and let you know as soon as possible.</Paragraph>
            </CenteredScreen>
        );
    }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
    accessToken: state.device.token.access_token,
    deploymentId: state.deployment.id,

});

export default connect(mapStateToProps)(ConnectHardware);
