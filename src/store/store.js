import { createStore, combineReducers } from "redux";
import { persistStore, persistCombineReducers, persistReducer, REHYDRATE } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage"
import downloadReducer from "./reducers/downloads.reducer";


const persistConfig = {
    key : 'root',
    storage: AsyncStorage,
    whiteList: ['downloadReducer']
}

const rootReducer = combineReducers({
    "downloadReducer": persistReducer({key:'downloadReducer', storage:AsyncStorage}, downloadReducer)
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);