/*
<Provider store={store}>
    <App />
</Provider>
에서 store를 만들어줄 것이다.
*/

import { combineReducers } from "redux";
import { tasks } from "./tasks";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import session from "redux-persist/lib/storage/session";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
    key: "root",
    storage: session,
    whitelist: ["tasks"],
};

const combinedReducer = combineReducers({ tasks: tasks.reducer });

const rootReducer = persistReducer(persistConfig, combinedReducer);

// export const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(logger))
// );

export const store = configureStore({
    reducer: rootReducer,
    middleware: [logger],
    devTools: true,
});

export const persistor = persistStore(store as any);

export type RootState = ReturnType<typeof store.getState>;
