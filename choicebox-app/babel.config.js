const path = require('path');

module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    extensions: [
                        '.ts',
                        '.tsx',
                        '.android.ts',
                        '.ios.ts',
                        '.web.ts',
                    ],
                    root: ['./src'],
                    alias: {
                        components: path.resolve(__dirname, 'src', 'components'),
                        screens: path.resolve(__dirname, 'src', 'screens'),
                        store: path.resolve(__dirname, 'src', 'store'),
                        lib: path.resolve(__dirname, 'src', 'lib'),
                        styles: path.resolve(__dirname, 'src', 'styles'),
                    },
                },
            ],
        ],
    };
};
