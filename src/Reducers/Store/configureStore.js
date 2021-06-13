import { combineReducers, createStore } from "redux";
import EntriesReducer from "../Entries.reducer";

const configureStore = () => {
  createStore(
    combineReducers({
      entries: EntriesReducer,
    })
  );
};
export default configureStore;
