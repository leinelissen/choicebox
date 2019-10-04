import {
    createStore,
    applyMiddleware,
    Store,
    AnyAction,
    Action,
} from 'redux';
import thunk, { ThunkMiddleware, ThunkAction } from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer, { State } from './reducers';
import { AsyncStorage } from 'react-native';

/**
 * The middleware that is to be assigned to Redux
 */
const middleware = [
    thunk as ThunkMiddleware<State, AnyAction>,
];

const persistedReducer = persistReducer({
    key: 'REDUX_STORE',
    storage: AsyncStorage,
}, rootReducer);

/**
 * Initialise the Redux store
 *
 * @param initialState State
 */
export const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware),
);

export const persistor = persistStore(store);

/**
 * The result of a thunk that is executed
 */
export type ThunkResult<ReturnType, ActionType = {}> =
    ThunkAction<ReturnType, State, undefined, AnyAction | Action<ActionType>>;


export type ApplicationState = State;
