import { applyMiddleware, combineReducers, createStore } from "redux";
import EntriesReducer from "../Entries.reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import modalsReducer from "../Modal.reducer";
import createSagaMiddleware from "redux-saga";
import { count, testSaga } from "../../saga/testSaga";
import { initSagas } from "../../saga";

const sagaMiddleware = createSagaMiddleware();
// sagaMiddleware.run
const middlewares = [sagaMiddleware];

const configureStore = () => {
  const store = createStore(
    combineReducers({
      entries: EntriesReducer,
      modals: modalsReducer,
    }),
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  initSagas(sagaMiddleware);
  return store;
};

export default configureStore;
