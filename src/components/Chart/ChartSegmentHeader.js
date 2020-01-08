import React from 'react';
import { Label, Grid } from 'semantic-ui-react';

import { DESTINY_TITLE, BIRTH_FORCE_TITLE, HEARTS_DESIRE_TITLE,
  PERSONALITY_TITLE, REALITY_TITLE} from '../../variables';

const descriptions = {};
descriptions[DESTINY_TITLE] = "What you were born to do";
descriptions[BIRTH_FORCE_TITLE] = "Your natural abilities";
descriptions[HEARTS_DESIRE_TITLE] = "Your secret wishes";
descriptions[PERSONALITY_TITLE] = "How others see you";
descriptions[REALITY_TITLE] = "Your final attainment";

const ChartSegmentHeader = props => {
  const {data, name, description} = props;

  return (
    <Grid columns="equal">
      <Grid.Row>
        <Grid.Column>
          <div>
            <span style={{paddingRight:"20px"}}>
              {name}
            </span>
            <Label circular color={'black'} size={'large'}>{data[1]}</Label>
            <span style={{
                color:"lightgrey",
                paddingLeft:"20px",
                fontWeight:"normal",
              }}>{`( ${data[0]} )`}</span>
          </div>
          <span style={{
              fontWeight:"normal",
              fontSize:"0.6em",
              color:"grey"
            }}>
            {descriptions[name]}
          </span>
          </Grid.Column>
        <Grid.Column textAlign="right" width={5}>
          <span style={{
              color:"grey",
              fontWeight:"normal",
              fontStyle:"italic",
              fontSize:"0.7em"
            }}>
            {description}
          </span>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default ChartSegmentHeader;
