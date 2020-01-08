import React from 'react';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';

import { getChartDescription } from '../../actions';

import ChartSegmentHeader from './ChartSegmentHeader';

class ChartSegment extends React.Component {
  componentDidMount = () => {
    const {data, name} = this.props;
    this.props.getChartDescription(name, data[1])
  }

  render = () => {
    let {data, name, description} = this.props;
    description = description ? description : ""
    return (
      <div style={{marginBottom:"10px"}}>
        <Header as="h2" attached="top">
          <ChartSegmentHeader data={data} name={name} description={description['description']}/>
        </Header>
        <Segment attached="bottom">
          {description['detail']}
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    description: state.numerology[ownProps.name]
  }
}

export default connect(
  mapStateToProps,
  { getChartDescription }
)(ChartSegment);
