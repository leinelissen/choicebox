module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        fetch: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        'indent': [
            'error',
            4,
            {
                "SwitchCase": 1
            }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'react/jsx-filename-extension': [1, { 
            'extensions': ['.js', '.jsx', '.ts', '.tsx'] 
        }],
        'react/jsx-indent': [1, 4],
        'react/prefer-stateless-function': [0],
        'react/state-in-constructor': [1, 'never'],
        'react/destructuring-assignment': [0],
        'react/jsx-indent-props': [1, 4],
        'no-else-return': [2, { allowElseIf: true }],
    },
    'settings': {
        'import/resolver': {
            'babel-module': {}
        }
    }
};
