import React, { Component, ReactNode } from 'react';
import { Text, Modal } from 'react-native';
import { connect } from 'react-redux';

import { State } from 'store/reducers';
import { tourIsComplete } from 'store/setup/actions';
import ModalView from 'components/ModalView';

interface StateProps {
    isTourComplete: boolean;
}

class TourModal extends Component<StateProps> {
    handleClose = (): void => {

    }

    public render(): ReactNode {
        const { isTourComplete } = this.props;

        return (
            <Modal
                animationType="slide"
                visible={!isTourComplete}
                onRequestClose={this.handleClose}
                transparent
            >
                <ModalView>
                    <Text style={{ color: 'white' }}>TOUR!</Text>
                </ModalView>
            </Modal>
        );
    }
}

const mapStateToProps = (state: State): StateProps => ({
    isTourComplete: state.setup.isTourComplete,
});

const mapDispatchToProps = {
    tourIsComplete,
};

export default connect(mapStateToProps, mapDispatchToProps)(TourModal);
