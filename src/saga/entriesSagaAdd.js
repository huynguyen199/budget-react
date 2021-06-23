import axios from "axios";
import { call, put, take, takeLatest } from "redux-saga/effects";
import entriesTypes from "../Reducers/Action/Entries.action";

export function* addEntrySaga() {
  yield takeLatest(entriesTypes.ADD_ENTRY, addEntryToDb);
}
function* addEntryToDb({ payload }) {
  console.log("add entry", payload);
  yield call(addEntry, payload);
  yield call(addEntryDetails, payload);
  yield put({ type: entriesTypes.REMOVE_ENTRY_RESULT, payload });
}

async function addEntry({ id, description }) {
  await axios.post("http://localhost:3000/Entries", {
    id,
    description,
  });
}
async function addEntryDetails({ id, isExpense, value }) {
  console.log("details", id, isExpense, value);
  await axios.post("http://localhost:3000/value", {
    id,
    value: Number(value),
    isExpense,
  });
}
