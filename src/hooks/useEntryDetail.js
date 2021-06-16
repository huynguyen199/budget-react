import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addEntryRedux,
  updateEntryRedux,
} from "../Reducers/Action/Entries.action";
import { v4 as uuidv4 } from "uuid";
import { closeEditModal } from "../Reducers/Action/Modal.actions";

function useEntryDetail(desc = "", val = "", isExp = true) {
  const [description, setDescription] = useState(desc);
  const [value, setValue] = useState(val);
  const [isExpense, setIsExpense] = useState(isExp);
  const dispatch = useDispatch();

  useEffect(() => {
    setDescription(desc);
    setValue(val);
    setIsExpense(isExp);
  }, [desc, val, isExp]);

  function updateEntry(id) {
    dispatch(
      updateEntryRedux(id, {
        id,
        description,
        value,
        isExpense,
      })
    );
    dispatch(closeEditModal(false));
    resetEntry();
  }

  function resetEntry() {
    setDescription("");
    setValue("");
    setIsExpense(true);
  }

  function addEntry() {
    dispatch(
      addEntryRedux({
        id: uuidv4(),
        description,
        value,
        isExpense,
      })
    );
    resetEntry();
  }

  return {
    description,
    setDescription,
    value,
    setValue,
    isExpense,
    setIsExpense,
    addEntry,
    updateEntry,
  };
}

export default useEntryDetail;
