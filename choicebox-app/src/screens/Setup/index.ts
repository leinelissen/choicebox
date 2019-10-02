import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import IntroScreen from './Intro';

const SetupStack = createStackNavigator({
    Intro: IntroScreen,
}, {
    headerMode: 'none',
});

export default createAppContainer(SetupStack);
