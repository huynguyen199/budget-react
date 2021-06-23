import axios from "axios";
import { call, fork, put, take } from "redux-saga/effects";
import entriesTypes, {
  populateEntries,
  populateEntryDetails,
} from "../Reducers/Action/Entries.action";

export function* getAllEntries() {
  yield take(entriesTypes.GET_ENTRIES);
  console.log("I need to get the entries now");
  const { data } = yield call(axios, "http://localhost:3000/Entries");
  yield put(populateEntries(data));
}

export function* getEntryDetails(id) {
  const { data } = yield call(axios, `http://localhost:3000/value/${id}`);
  console.log("data local", data);
  console.log(`got the id ${id}`);
  yield put(populateEntryDetails(id, data));
}

export function* getAllEntriesDetails() {
  const { payload } = yield take(entriesTypes.POPULATE_ENTRIES);
  console.log("payload", payload);
  for (let i = 0; i < payload.length; i++) {
    const entry = payload[i];
    yield fork(getEntryDetails, entry.id);
  }
}
