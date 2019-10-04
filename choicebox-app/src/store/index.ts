import {
    createStore,
    applyMiddleware,
    AnyAction,
    Action,
} from 'redux';
import thunk, { ThunkMiddleware, ThunkAction } from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import rootReducer, { State } from './reducers';

// NOTE: This should be commented as soon as persisting the Redux store is feasible.
// AsyncStorage.clear();

/**
 * The middleware that is to be assigned to Redux
 */
const middleware = [
    thunk as ThunkMiddleware<State, AnyAction>,
];

/**
 * Since we persist the Redux state to AsyncStorage, we'll need to wrap the root
 * reducer that is returned from the merger of all individual reducers in some
 * magic function.
 */
const persistedReducer = persistReducer({
    key: 'REDUX_STORE',
    storage: AsyncStorage,
}, rootReducer);

/**
 * Initialise the Redux store
 */
export const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware),
);

/**
 * Initialise the persistor as well
 */
export const persistor = persistStore(store);

/**
 * The result of a thunk that is executed
 */
export type ThunkResult<ReturnType, ActionType = {}> =
    ThunkAction<ReturnType, State, undefined, AnyAction | Action<ActionType>>;


export type ApplicationState = State;
