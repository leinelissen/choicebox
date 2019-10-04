import React, { Component, ReactNode } from 'react';
import { Text } from 'react-native';
import { State } from 'store/reducers';

import TourModal from './Tour';

interface StateProps {
    isTourComplete: boolean;
}

class RequestsScreen extends Component {
    public render(): ReactNode {
        return (
            <>
                <TourModal />
                <Text style={{ color: 'white' }}>Requests!</Text>
            </>
        );
    }
}

const mapStateToProps = (state: State): StateProps => ({
    isTourComplete: state.setup.isTourComplete,
});

export default RequestsScreen;
