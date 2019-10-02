import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import RequestsScreen from './Requests';
import LogScreen from './Log';
import AIScreen from './AI';
import HelpScreen from './Help';

const TabNavigator = createBottomTabNavigator({
    Requests: RequestsScreen,
    Log: LogScreen,
    AI: AIScreen,
    Help: HelpScreen,
});

export default createAppContainer(TabNavigator);
