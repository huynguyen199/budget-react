import React, { useState } from "react";
import ButtonSaveOrCancel from "./ButtonSaveOrCancel";
import { Form } from "semantic-ui-react";
import EntryForm from "./EntryForm";
import { useDispatch } from "react-redux";
import { addEntryRedux } from "../Reducers/Action/Entries.action";
import { v4 as uuidv4 } from "uuid";
import useEntryDetail from "../hooks/useEntryDetail";

function NewEntryForm() {
  const {
    description,
    setDescription,
    value,
    setValue,
    isExpense,
    setIsExpense,
    addEntry,
  } = useEntryDetail();

  return (
    <Form unstackable>
      <EntryForm
        addEntry={addEntry}
        description={description}
        value={value}
        setValue={setValue}
        isExpense={isExpense}
        setDescription={setDescription}
        setIsExpense={setIsExpense}
      />

      <ButtonSaveOrCancel addEntry={addEntry} />
    </Form>
  );
}

export default NewEntryForm;
