import {GET_APP_DATA} from '../actions/types';

import Chart from '../components/Chart/Chart';
import NewReading from '../components/NewReading/NewReading';
import EventTable from '../components/EventTable/EventTable';

const INITIAL_STATE = {
  leftSections: [
    {
      "name": "New Reading",
      "route": "/",
      "description": "Get a new reading",
      "component": NewReading
    },
    {
      "name": "Chart",
      "route": "/chart",
      "description": "Chart information",
      "component": Chart
    },
    {
      "name": "Event Table",
      "route": "/table",
      "description": "Table of Events",
      "component": EventTable
    },
  ],
  rightSections: [
    {
      "name": "Overview",
      "route": "/overview",
      "description": "Overview of Numerology",
      "component": null
    },
  ]
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_APP_DATA:
      return state;
    default:
      return state;
  }
}
