import React from 'react';

import { Grid } from 'semantic-ui-react';

import ChartRow from './ChartRow';

const ChartOverview = props => {
  const {person} = props;
  const chart = person.chart();
  const colors = [
    "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
    "linear-gradient(45deg, #a18cd1 0%, #fbc2eb 100%)",
    "linear-gradient(45deg, #fbc2eb 0%, #a6c1ee 100%)",
  ]

  return (
    <Grid columns="equal" textAlign="center" style={{
        margin:"0px"
      }}>
      {chart.map((chartItem, index) => {
        return <ChartRow
          key={index}
          name={chartItem['name']}
          data={chartItem['arrays']}
          aggFunc={chartItem['aggregator']}
          showFunc={chartItem['show']}
          color={chartItem['name'] === "Name" ? colors[2] : colors[0]}
          />
      })}
    </Grid>
  )
}

export default ChartOverview;
