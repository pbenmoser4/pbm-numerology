import React from 'react';

import { Grid } from 'semantic-ui-react';

const ChartRowSummary = props => {
  const {data, aggFunc, name} = props;
  let display = '';

  if (aggFunc) {
    const aggregated = aggFunc(data.map((element, index) => {
      return aggFunc(element)[1]
    }));
    display = '(' + aggregated[0] + ') ' + aggregated[1];
  }

  return (
    <Grid.Column style={{padding:"0px"}} width={2}>
      <span style={{fontWeight:"bold"}}>{display}</span>
      <span>{` ${name}`}</span>
    </Grid.Column>
  )
}

export default ChartRowSummary;
