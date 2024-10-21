import { createStore } from 'redux'
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import usernameId from "./reducers/usernameId";
//import userAdminReducer from "./reducers/usersAdminReducer";
import logged from "./reducers/logged";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = persistCombineReducers(persistConfig, {
    usernameId,
    logged
  });
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer);
let persistor = persistStore(store);
 
export { store, persistor }