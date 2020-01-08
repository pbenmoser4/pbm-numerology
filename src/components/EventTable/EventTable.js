import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import TableView from './TableView';

const EventTable = props => {
  return (
    <Fragment>
      <Header as='h1'>Table of Events</Header>
      <TableView table={props.table} />
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    table: state.numerology.person.tableOfEvents()
  }
}

export default connect(
  mapStateToProps, {}
)(EventTable);
