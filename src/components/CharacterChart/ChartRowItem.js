import React from 'react';

import { Grid } from 'semantic-ui-react';

const ChartRowItem = props => {
  const {arr, aggFunc, show} = props;
  const agg = aggFunc ? aggFunc(arr) : null;
  const first = agg ? '(' + agg[0] + ')' : '';
  const second = agg ? agg[1] : '';

  return (
    <Grid columns={arr.length + 2} style={{paddingLeft:"30px", paddingRight:"30px"}}>
      {[...arr].map((el, i) => {
        return (
          <Grid.Column key={i} style={{padding:"0px"}}>
            {show(el) ? el : ''}
          </Grid.Column>
        )
      })}
      <Grid.Column style={{padding:"0px", fontWeight:"bold"}}>
        {`${first}`}
      </Grid.Column>
      <Grid.Column style={{padding:"0px", fontWeight:"bold"}}>
        {`${second}`}
      </Grid.Column>
    </Grid>
  )
}

export default ChartRowItem;
