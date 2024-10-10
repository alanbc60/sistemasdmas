import { createStore } from 'redux'
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import usernameId from "./reducers/usernameId";

import logged from "./reducers/loggedUser";

//* Funcion: crea un store de Redux con persistencia usando redux-persist, que permite mantener el estado del store en 
// el almacenamiento local del navegador (por ejemplo, localStorage).


/* 
  *** Configuración de persistencia para Redux usando redux-persist. ****
  
  Esta configuración permite persistir el estado del store en el almacenamiento local 
  (localStorage por defecto) para que los datos se mantengan entre recargas de página.
  
  key: Identificador bajo el cual se almacenará el estado persistido en el almacenamiento local.
  storage: Almacenamiento local para persistir el estado del store. Por defecto es localStorage.
*/

const persistConfig = {
  key: 'root',
  storage,
}

/*
  Combina los reducers en un solo reducer que se utiliza para crear el store de Redux.
  persistCombineReducers contiene los reducers que quieres combinar
  usernameId: Reducer que maneja el estado relacionado con el nombre de usuario.
  logged: Reducer que maneja el estado de si el usuario está logueado.
*/

const rootReducer = persistCombineReducers(persistConfig, {
    usernameId,
    logged
});
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer);
let persistor = persistStore(store);
export { store, persistor }