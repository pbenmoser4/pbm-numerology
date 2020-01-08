import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

const Header = props => {
  const [activeRoute, setActiveRoute] = useState(props.location.pathname);
  useEffect(() => {
    setActiveRoute(props.location.pathname);
  }, [props.location.pathname])

  return (
    <Menu pointing secondary>
      {props.leftSections.map((section, index) => {
        return <Menu.Item
          key={index}
          active={activeRoute === section.route}
          as={Link}
          to={section.route}
          onClick={(e, {to}) => setActiveRoute(to)}>
          {section.name}
        </Menu.Item>
      })}
      {props.rightSections.map((section, index) => {
        return <Menu.Item
          position="right"
          key={index}
          active={activeRoute === section.route}
          as={Link}
          to={section.route}
          onClick={(e, {to}) => setActiveRoute(to)}>
          {section.name}
        </Menu.Item>
      })}
    </Menu>
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
