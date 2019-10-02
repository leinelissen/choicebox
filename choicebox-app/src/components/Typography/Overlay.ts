import styled from 'styled-components/native';
import { theme } from 'styles';

export const Paragraph = styled.Text`
    color: ${theme.colors.grey.light};
    line-height: 24px;
    font-size: 16px;
    text-align: center;
    margin-bottom: 24px;
    font-family: 'IBMPlexSans-Light';
`;

export const Heading = styled.Text`
    color: ${theme.colors.grey.dark};
    line-height: 30px;
    font-size: 20px;
    text-align: center;
    margin-bottom: 24px;
    font-family: 'IBMPlexSans-Regular';
`;
