import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "semantic-ui-react";
import useEntryDetail from "../hooks/useEntryDetail";
import {
  closeEditModal,
  openEditModal,
} from "../Reducers/Action/Modal.actions";
import EntryForm from "./EntryForm";
function ModalEdit({ isOpen, description, value, isExpense, id }) {
  const dispatch = useDispatch();
  const entryUpdate = useEntryDetail(description, value, isExpense);

  return (
    <Modal open={isOpen}>
      <Modal.Header>Edit entry</Modal.Header>
      <Modal.Content>
        <EntryForm
          description={entryUpdate.description}
          value={entryUpdate.value}
          isExpense={entryUpdate.isExpense}
          setDescription={entryUpdate.setDescription}
          setValue={entryUpdate.setValue}
          setIsExpense={entryUpdate.setIsExpense}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => dispatch(closeEditModal(false))}>Close</Button>
        <Button onClick={() => entryUpdate.updateEntry(id)} primary>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ModalEdit;
