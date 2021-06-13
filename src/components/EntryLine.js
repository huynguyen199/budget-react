import React, { Fragment, useState } from "react";
import { Grid, Icon, Segment } from "semantic-ui-react";
import ModalEdit from "./ModalEdit";
function EntryLine({
  id,
  description,
  value,
  isExpense = false,
  deleteEntry,
  isOpen,
  setIsOpen,
  editEntry,
}) {
  return (
    <Fragment>
      <Segment color={isExpense ? "red" : "green"}>
        <Grid columns={3} textAlign="right">
          <Grid.Row>
            <Grid.Column width={10} textAlign="right">
              {description}
            </Grid.Column>
            <Grid.Column width={3}>${value}</Grid.Column>
            <Grid.Column width={3}>
              <Icon name="edit" bordered onClick={() => editEntry(id)} />
              <Icon name="trash" bordered onClick={() => deleteEntry(id)} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Fragment>
  );
}

export default EntryLine;
