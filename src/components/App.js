import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Router, Route, Switch } from 'react-router-dom';

import Header from './Header';

import history from '../history';

const App = props => {

  return (
    <Router history={history}>
        <Header />
        <Container>
          <Switch>
            {props.sections.map((section, index) => {
              return <Route key={index} path={section.route} exact component={section.component} />
            })}
          </Switch>
        </Container>
    </Router>
  )
}

const mapStateToProps = state => {
  const appState = state.app;
  const sections = [...appState.leftSections, ...appState.rightSections];
  return {
    sections: sections,
  }
}

export default connect(
  mapStateToProps,
  {}
)(App);
