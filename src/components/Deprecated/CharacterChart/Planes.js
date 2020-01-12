import React from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';

const Planes = props => {
  const {planes} = props;

  // {
  //   "physical": {
  //     "value": 8,
  //     "description": "mental"
  //   },
  //   "mental": {
  //     "value": 4,
  //     "description": "physical"
  //   },
  //   "emotional": {
  //     "value": 4,
  //     "description": "physical"
  //   },
  //   "intuitive": {
  //     "value": 5,
  //     "description": "physical"
  //   }
  // }
  const renderGrid = (plane, value, description) => {
    return (
      <Grid columns={3} textAlign="center">
        <Grid.Column>{plane}</Grid.Column>
        <Grid.Column>{value}</Grid.Column>
        <Grid.Column>{description}</Grid.Column>
      </Grid>
    )
  }

  const renderSegment = (planeDict, attached) => {
    const {name, value, description} = planeDict;
    if (attached === 'bottom') {
      return (
        <Segment attached='bottom'>
          {renderGrid(name, value, description)}
        </Segment>
      )
    } else {
      return (
        <Segment attached>
          {renderGrid(name, value, description)}
        </Segment>
      )
    }
  }

  return (
    <div>
      <Header as='h5' attached='top'>Planes of Expression</Header>
      {planes.map((planeDict, index, array) => {
        const bottom = index === array.length - 1 ? 'bottom' : null;
        return renderSegment(planeDict, bottom);
      })}
    </div>
  )
}

export default Planes;
