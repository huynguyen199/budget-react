import axios from "axios";
import { call, put, take } from "redux-saga/effects";
import entriesTypes from "../Reducers/Action/Entries.action";

export function* getAllEntries() {
  yield take(entriesTypes.GET_ENTRIES);
  console.log("I need to get the entries now");
  const result = yield call(axios, "http://localhost:3000/Entries");
  console.log("result", result);
  yield put({ type: entriesTypes.POPULATE_ENTRIES, payload: result.data });
}
