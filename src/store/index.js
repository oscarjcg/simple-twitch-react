import { configureStore } from '@reduxjs/toolkit';

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

const store = createAppStore();

export default store;
