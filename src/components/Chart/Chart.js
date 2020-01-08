import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import { figureName } from '../../actions';

import ChartSegment from './ChartSegment';

const Chart = props => {
  const {person} = props;
  const chart = person.characterChart();

  return (
    <Fragment>
      <Header as="h2">{`${person.fullName}, ${person.birthday.toDateString()}`}</Header>
      {Object.keys(chart).map((key, i, arr) => {
        const data = chart[key];
        const finalData = data.length === 4 ? data[3] : data;

        return <ChartSegment name={key} data={finalData} key={i} />
      })}
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    person: state.numerology.person
  }
}

export default connect(
  mapStateToProps,
  { figureName }
)(Chart);
