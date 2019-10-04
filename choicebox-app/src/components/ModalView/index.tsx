import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components/native';
import { theme } from 'styles';

const Container = styled.View`
    background-color: transparent;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Modal = styled.View`
    background-color: ${theme.colors.blue};
    color: ${theme.colors.white};
    font-family: 'IBMPlexSans-Light';
    text-align: center;
    padding: 25px;
    border-radius: 10px;
`;

const ModalView: FunctionComponent<{ children: ReactNode }> = ({ children }) => (
    <Container>
        <Modal>
            {children}
        </Modal>
    </Container>
);

export default ModalView;
