import { combineReducers, createStore } from "redux";
import EntriesReducer from "../Entries.reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import modalsReducer from "../Modal.reducer";

const configureStore = () => {
  return createStore(
    combineReducers({
      entries: EntriesReducer,
      modals: modalsReducer,
    }),
    composeWithDevTools()
  );
};

export default configureStore;
