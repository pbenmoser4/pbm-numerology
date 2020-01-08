import React, { Fragment } from 'react';
import { Segment, Container } from 'semantic-ui-react';

import ChartOverview from './ChartOverview';
import Planes from './Planes';

const Chart = props => {
  const {person} = props;
  const planes = person.planesOfExpression();

  return (
    <Container>
      <ChartOverview person={person} />
      <Planes planes={planes}/>
    </Container>
  )
}

export default Chart;
