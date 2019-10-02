import baseStyled, { ThemedStyledInterface } from 'styled-components';

/**
 * These are the variables that are injected into the Styled Components
 * ThemeProvider. These can then be accessed by using template props, as such:
 * styled.div`${props => props.theme.colors.white}`
 */
export const theme = {
    colors: {
        white: '#ffffff',
        black: '#414141',
        grey: {
            extremelyLight: '#FAFAFA',
            veryLight: '#EFEFEF',
            light: '#9F9F9F',
            dark: '#606060',
            veryDark: '#808080',
        },
        blue: '#0099ff',
        orange: '#ff9900',
    },
    fonts: {
        //
    },
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
