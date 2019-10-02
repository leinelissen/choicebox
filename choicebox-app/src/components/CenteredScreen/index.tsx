import React, { Component, ReactNode } from 'react';
import styled from 'styled-components/native';

interface Props {
    children: ReactNode;
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 50px;
    text-align: center;
    font-family: 'IBMPlexSans-Light';
`;

class CenteredScreen extends Component<Props> {
    public render(): ReactNode {
        const { children } = this.props;

        return (
            <Container>
                {children}
            </Container>
        );
    }
}

export default CenteredScreen;
