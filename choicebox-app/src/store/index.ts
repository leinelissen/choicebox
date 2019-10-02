import {
    createStore,
    applyMiddleware,
    Store,
    AnyAction,
    Action,
} from 'redux';
import thunk, { ThunkMiddleware, ThunkAction } from 'redux-thunk';
import reducer, { State } from './reducers';

/**
 * The middleware that is to be assigned to Redux
 */
const middleware = [
    thunk as ThunkMiddleware<State, AnyAction>,
];

/**
 * Initialise the Redux store
 *
 * @param initialState State
 */
export default function initializeStore(initialState?: State): Store {
    const store = createStore(
        reducer,
        initialState,
        applyMiddleware(...middleware),
    );

    return store;
}

/**
 * The result of a thunk that is executed
 */
export type ThunkResult<ReturnType, ActionType = {}> =
    ThunkAction<ReturnType, State, undefined, AnyAction | Action<ActionType>>;


export type ApplicationState = State;
