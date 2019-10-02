import { createGlobalStyle } from 'styled-components/native';
import { theme } from 'styles';

/**
 * These are the global styles that are applied to the application. Any global
 * CSS should preferably be defined in this template.
 */
const styles = createGlobalStyle`
    body, html {
        margin: 0;
        padding: 0;
    }

    body {
        font-size: 12px;
        color: ${theme.colors.black};
    }

    body * {
        box-sizing: border-box;
    }
`;

export default styles;
