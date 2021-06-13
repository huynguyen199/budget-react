import React from "react";
import ButtonSaveOrCancel from "./ButtonSaveOrCancel";
import { Form } from "semantic-ui-react";
import EntryForm from "./EntryForm";

function NewEntryForm({
  addEntry,
  description,
  value,
  setValue,
  isExpense,
  setDescription,
  setIsExpense,
}) {
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
