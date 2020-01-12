import React from 'react';

import { Grid } from 'semantic-ui-react';

import ChartRowItem from './ChartRowItem';
import ChartRowSummary from './ChartRowSummary';

const ChartRow = props => {
  const {data, aggFunc, name, showFunc, color} = props;

  return (
    <Grid.Row style={{backgroundImage:color}}>
      {data.map((arr, index) => {
        // We're looking at one of the first/mid/last name arrays
        return <ChartRowItem arr={arr} aggFunc={aggFunc} show={showFunc} key={index} />
      })}
      <ChartRowSummary data={data} aggFunc={aggFunc} name={name} />
    </Grid.Row>
  )
}

export default ChartRow;
