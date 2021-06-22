import axios from "axios";
import { call, fork, put, take } from "redux-saga/effects";
import entriesTypes from "../Reducers/Action/Entries.action";

export function* getAllEntries() {
  yield take(entriesTypes.GET_ENTRIES);
  console.log("I need to get the entries now");
  const result = yield call(axios, "http://localhost:3000/Entries");
  console.log("result", result);
  yield put({ type: entriesTypes.POPULATE_ENTRIES, payload: result.data });
}

export function* getEntryDetails(id) {
  const { data } = yield call(axios, `http://localhost:3000/value/${id}`);
  console.log("data local", data);
  console.log(`got the id ${id}`);
  yield put({
    type: entriesTypes.POPULATE_ENTRY_DETAILS,
    payload: { id, entry: data },
  });
}

export function* getAllEntriesDetails() {
  const { payload } = yield take(entriesTypes.POPULATE_ENTRIES);
  console.log("payload", payload);
  for (let i = 0; i < payload.length; i++) {
    const entry = payload[i];
    yield fork(getEntryDetails, entry.id);
  }
}
