import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import history from '../../history';

import { withRouter } from 'react-router-dom';
import { Anchor, Box } from 'grommet';

import HeaderBase from './HeaderBase';

const Header = props => {
  const [activeRoute, setActiveRoute] = useState(props.location.pathname);

  useEffect(() => {
    setActiveRoute(props.location.pathname);
  }, [props.location.pathname])

  return (
    <HeaderBase>
      <Box direction="row" gap="medium">
          {props.leftSections.map(section => {
            return (
              <Anchor
                label={section.name}
                color={activeRoute === section.route ? 'brand' : 'dark-3'}
                onClick={() => history.push(section.route)}
                key={section.name}
                />
            )
          })}
      </Box>
      <Box direction="row" gap="medium">
        {props.rightSections.map(section => {
          return (
            <Anchor
              label={section.name}
              color={activeRoute === section.route ? 'brand' : 'dark-3'}
              onClick={() => history.push(section.route)}
              key={section.name}
              />
          )
        })}
      </Box>
    </HeaderBase>
  )
}

const mapStateToProps = state => {
  return {
    leftSections: state.app.leftSections,
    rightSections: state.app.rightSections
  }
}

export default connect(
  mapStateToProps,
  {}
)(withRouter(Header));
