import _ from 'lodash';
import React, { Fragment, useState } from 'react';
import { Table, Modal, Button } from 'semantic-ui-react';

import DetailView from './DetailView';

import {
  TABLE_ESSENCE_TITLE,
  TABLE_PERSONAL_TITLE,
  TABLE_UNIVERSAL_TITLE,
  TABLE_PINNACLE_TITLE,
  TABLE_CHALLENGE_TITLE,
  TABLE_YEAR_TITLE,
} from '../../variables';

const TableView = props => {
  const [modalActive, setModalActive] = useState(false);
  const [yearDict, setYearDict] = useState({});

  const {table} = props;
  const firstLine = table[0];
  const fields = [...Object.keys(firstLine)];
  const header = [...fields.map(el=>el.charAt(0).toUpperCase() + el.substring(1))];

  const showModal = (yearDict) => () => {
    setYearDict(yearDict);
    setModalActive(true);
  }

  const closeModal = () => setModalActive(false);

  return (
    <Fragment>
      <Modal dimmer='inverted' open={modalActive} onClose={closeModal}>
        <Modal.Header>Numbers for {yearDict[TABLE_YEAR_TITLE]}</Modal.Header>
        <Modal.Content scrolling>
          <DetailView yearDict={_.omit(yearDict, [TABLE_YEAR_TITLE])} />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Actions>
      </Modal>
      <Table singleLine selectable>
        <Table.Header>
          <Table.Row>
            {header.map((headerString, i) => {
              return <Table.HeaderCell key={i}>{headerString.split(' ')[0]  }</Table.HeaderCell>
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {table.map((year, i) => {
            return (
              <Table.Row key={i} onClick={showModal(year)}>
                {fields.map((field, index) => {
                  let renderVal = year[field];
                  if ([TABLE_ESSENCE_TITLE,
                    TABLE_PERSONAL_TITLE,
                    TABLE_UNIVERSAL_TITLE,
                    TABLE_PINNACLE_TITLE,
                    TABLE_CHALLENGE_TITLE].includes(field)){
                    if (renderVal[1] > -1) {
                      renderVal = `${renderVal[1]} (${renderVal[0]})`;
                    } else {
                      renderVal = "";
                    }
                  }
                  return <Table.Cell key={index}>{renderVal}</Table.Cell>
                })}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Fragment>
  )
}

export default TableView;
