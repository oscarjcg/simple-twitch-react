import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit';

import categoryReducer from './reducers/category';
import channelReducer from './reducers/channel';
import userInterfaceReducer from './reducers/userInterface';
import commentReducer from './reducers/comment';

export const createAppStore = () => configureStore({
    reducer: {
        category: categoryReducer,
        channel: channelReducer,
        userInterface: userInterfaceReducer,
        comment: commentReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }),
});

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>;

const store = createAppStore();

export default store;
