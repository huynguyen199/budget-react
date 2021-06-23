import axios from "axios";
import { call, put, take } from "redux-saga/effects";
import EntriesAction from "../Reducers/Action/Entries.action";

export function* deleteEntrySaga() {
  while (true) {
    const { payload, type } = yield take(EntriesAction.REMOVE_ENTRY);
    console.log("type", type);
    yield call(deleteEntries, payload.id);
    yield put({ type: "REMOVE_ENTRY_RESULT", payload: { id: payload.id } });
  }
}

async function deleteEntries(id) {
  axios.delete(`http://localhost:3000/Entries/${id}`);
  axios.delete(`http://localhost:3000/value/${id}`);
  await new Promise((s) => setTimeout(s, 3000));
}
