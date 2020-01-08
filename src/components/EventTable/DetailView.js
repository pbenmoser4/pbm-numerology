import _ from 'lodash';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Header, Segment, Grid, Table } from 'semantic-ui-react';

import { getTableDescription } from '../../actions';

import {
  TABLE_ESSENCE_TITLE,
  TABLE_PERSONAL_TITLE,
  TABLE_UNIVERSAL_TITLE,
  TABLE_PINNACLE_TITLE,
  TABLE_CHALLENGE_TITLE,
  TABLE_AGE_TITLE,
} from '../../variables';

class DetailView extends React.Component {
  componentDidMount = () => {
    this.fetchDescriptions();
  }

  fetchDescriptions = () => {
    const {yearDict} = this.props;
    Object.keys(yearDict).forEach((field, index) => {
      if (Array.isArray(yearDict[field])) {
        this.props.getTableDescription(field, yearDict[field][1]);
      }
    })
  }

  renderBasic = (dict) => {
    const age = dict[TABLE_AGE_TITLE];
    const letters = _.omit(dict, [TABLE_AGE_TITLE]);
    return (
      <Fragment>
        <Header as="h4">{TABLE_AGE_TITLE}: {age}</Header>
        <Table collapsing>
          <Table.Header>
            <Table.Row>
              {Object.keys(letters).map((key, index) => {
                return <Table.HeaderCell key={index}>{key.split(' ')[0]}</Table.HeaderCell>
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              {Object.keys(letters).map((key, index) => {
                return <Table.Cell key={index}>{letters[key]}</Table.Cell>
              })}
            </Table.Row>
          </Table.Body>
        </Table>
      </Fragment>
    );
  }

  renderComplex = (dict) => {
    return (
      Object.keys(dict).map((title, index) => {
        const entry = this.props.numerology[title];
        const description = entry ? entry.description : null;
        const detail = entry ? entry.detail : null;
        return (
          <Segment vertical key={index}>
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <Header as="h4">{title}</Header>
                </Grid.Column>
                <Grid.Column textAlign="right">
                  <span>{description}</span>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <div style={{
                    paddingLeft:"14px",
                    paddingRight:"14px"
                  }}>{detail}</div>
              </Grid.Row>
            </Grid>
          </Segment>
        );
      })
    );
  }

  render() {
    const {yearDict} = this.props;
    const keys = Object.keys(yearDict);
    const complexKeys = [
      TABLE_ESSENCE_TITLE,
      TABLE_PERSONAL_TITLE,
      TABLE_UNIVERSAL_TITLE,
      TABLE_PINNACLE_TITLE,
      TABLE_CHALLENGE_TITLE
    ]
    const basicKeys = _.difference(keys, complexKeys);
    return (
      <Fragment>
        {this.renderBasic(_.omit(yearDict, complexKeys))}
        {this.renderComplex(_.omit(yearDict, basicKeys))}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    numerology: state.numerology
  }
}

export default connect(
  mapStateToProps,
  { getTableDescription }
)(DetailView);
