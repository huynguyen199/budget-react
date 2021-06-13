import React from "react";
import { Modal, Button } from "semantic-ui-react";
import NewEntryForm from "./NewEntryForm";

function ModalEdit({
  isOpen,
  setIsOpen,
  addEntry,
  description,
  value,
  setValue,
  isExpense,
  setDescription,
  setIsExpense,
}) {
  return (
    <Modal open={isOpen}>
      <Modal.Header>Edit entry</Modal.Header>
      <Modal.Content>
        <NewEntryForm
          addEntry={addEntry}
          description={description}
          value={value}
          setValue={setValue}
          isExpense={isExpense}
          setDescription={setDescription}
          setIsExpense={setIsExpense}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
        <Button onClick={() => setIsOpen(false)} primary>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ModalEdit;
