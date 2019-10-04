import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import IntroScreen from './Intro';
import ScanScreen from './Scan';
import RegisterScreen from './Register';
import ConnectHardwareScreen from './ConnectHardware';
import CompletedScreen from './Completed';

const SetupStack = createStackNavigator({
    Intro: IntroScreen,
    Scan: ScanScreen,
    Register: RegisterScreen,
    ConnectHardware: ConnectHardwareScreen,
    Completed: CompletedScreen,
}, {
    headerMode: 'none',
});

export default createAppContainer(SetupStack);
