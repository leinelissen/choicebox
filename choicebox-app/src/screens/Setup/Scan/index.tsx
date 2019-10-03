import React, { Component, ReactNode } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import styled from 'styled-components/native';
import { Button, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { askAsync as AskPermissionsAsync, CAMERA } from 'expo-permissions';

import CenteredScreen from 'components/CenteredScreen';
import { Paragraph, Heading } from 'components/Typography/Overlay';

interface State {
    // Whether there is permission for using the camera
    hasCameraPermission?: boolean;
    hasScanned: boolean;
}

const QRImage = styled.Image`
    width: 125;
    height: 125;
    margin-bottom: 25;
`;

class Scan extends Component<NavigationInjectedProps, State> {
    state = {
        hasCameraPermission: null,
        hasScanned: false,
    }

    /**
     * Handle a successful code scan from the BarCodeScanner. Check if the
     * QR-code satisfies our requirements, and if it does, pass it on to the
     * next scren.
     */
    handleBarCodeScanned = ({ data }): void => {
        const { hasScanned } = this.state;
        const [identifier, key] = data.split(',');

        // Reject any additional callbacks whenever something has been
        // successfully scanned.
        if (hasScanned) {
            return;
        }

        if (identifier !== 'choicebox') {
            console.log(`[SCANNER] Rejecing QR-code, missing identifier. ("${data}")`);
            return;
        }

        console.log(`[SCANNER] Accepted QR-code. ("${data}")`);
        this.props.navigation.navigate('Register', { key });
        this.setState({ hasScanned: true });
    }

    /**
     * Handle a button press and ask for permissions. If permission is given,
     * set a new state so that the BarCodeScanner is activated.
     */
    handlePress = (): void => {
        console.log('[SCANNER] Asking for camera permissions...');
        AskPermissionsAsync(CAMERA)
            .then(({ status }) => {
                console.log(`[SCANNER] Received permissions: "${status}"`);
                this.setState({ hasCameraPermission: status === 'granted' });
            });
    }

    public render(): ReactNode {
        const { hasCameraPermission } = this.state;

        // In case the permissions have been given, render the BarCodeScanner
        if (hasCameraPermission === true) {
            return (
                <CenteredScreen>
                    <BarCodeScanner
                        onBarCodeScanned={this.handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    />
                </CenteredScreen>
            );
        // In case no permissions were given, we'll throw an error which we'll
        // resolve later.
        } else if (hasCameraPermission !== null) {
            throw new Error('No permission given for camera.');
        }

        // If it's set to null, render the dialog
        return (
            <CenteredScreen>
                <Heading>The ChoiceBox, err.. Box?</Heading>
                <Paragraph>This box will physically store all data that moves through your home, whether it&apos;s your computer, phone, tablet, TV, smart home camera, fridge, you name it.</Paragraph>
                <Paragraph>None of this data will ever leave it without your consent, not even to ChoiceBox&apos; servers.</Paragraph>
                <Paragraph>In order to set it up, you will need to scan the QR-code that is located on its back. It looks something like this:</Paragraph>
                <QRImage source={require('./assets/qr-code.png')} />
                <Button title="Scan QR Code" onPress={this.handlePress} />
            </CenteredScreen>
        );
    }
}

export default Scan;
