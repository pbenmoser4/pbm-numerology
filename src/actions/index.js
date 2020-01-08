import history from '../history';

import {
  GET_APP_DATA,
  FIGURE_NAME,
  GET_DESTINY_DESCRIPTION,
  GET_BIRTH_DESCRIPTION,
  GET_HEART_DESCRIPTION,
  GET_PERSONALITY_DESCRIPTION,
  GET_REALITY_DESCRIPTION,
  GET_ESSENCE_DESCRIPTION,
  GET_PERSONAL_DESCRIPTION,
  GET_UNIVERSAL_DESCRIPTION,
  GET_PINNACLE_DESCRIPTION,
  GET_CHALLENGE_DISCRIPTION,
} from './types';

import {
  DESTINY_TITLE,
  BIRTH_FORCE_TITLE,
  HEARTS_DESIRE_TITLE,
  PERSONALITY_TITLE,
  REALITY_TITLE,
  TABLE_ESSENCE_TITLE,
  TABLE_PERSONAL_TITLE,
  TABLE_UNIVERSAL_TITLE,
  TABLE_PINNACLE_TITLE,
  TABLE_CHALLENGE_TITLE
} from '../variables';

import { NumerologyHelper } from '../numerology/helper';
import { Numerology } from '../numerology';

export const getAppData = () => {
  return {
    type: GET_APP_DATA,
    payload: null
  };
};

export const figureName = (name, birthday) => dispatch => {
  const person = new Numerology(name, birthday);

  dispatch({
    type: FIGURE_NAME,
    payload: person
  });

  history.push('/chart');
};

export const getChartDescription = (title, number) => {
  const helper = new NumerologyHelper();
  switch (title) {
    case DESTINY_TITLE:
      return {
        type: GET_DESTINY_DESCRIPTION,
        payload: helper.getDestinyDescription(number),
      };
    case BIRTH_FORCE_TITLE:
      return {
        type: GET_BIRTH_DESCRIPTION,
        payload: helper.getBirthForceDescription(number),
      };
    case HEARTS_DESIRE_TITLE:
      return {
        type: GET_HEART_DESCRIPTION,
        payload: helper.getHeartsDesireDescription(number)
      };
    case PERSONALITY_TITLE:
      return {
        type: GET_PERSONALITY_DESCRIPTION,
        payload: helper.getPersonalityDescription(number),
      };
    case REALITY_TITLE:
      return {
        type: GET_REALITY_DESCRIPTION,
        payload: helper.getRealityDescription(number),
      };
    default:
      return {
        type: GET_DESTINY_DESCRIPTION,
        payload: null
      };
  }
}

export const getTableDescription = (title, number) => {
  const helper = new NumerologyHelper();
  switch (title) {
    case TABLE_ESSENCE_TITLE:
      return {
        type: GET_ESSENCE_DESCRIPTION,
        payload: helper.getEssenceDescription(number),
      };
    case TABLE_PERSONAL_TITLE:
      return {
        type: GET_PERSONAL_DESCRIPTION,
        payload: helper.getPersonalDescription(number),
      };
    case TABLE_UNIVERSAL_TITLE:
      return {
        type: GET_UNIVERSAL_DESCRIPTION,
        payload: helper.getUniversalDescription(number),
      };
    case TABLE_PINNACLE_TITLE:
      return {
        type: GET_PINNACLE_DESCRIPTION,
        payload: helper.getPinnacleDescription(number),
      };
    case TABLE_CHALLENGE_TITLE:
      return {
        type: GET_CHALLENGE_DISCRIPTION,
        payload: helper.getChallengeDescription(number),
      };
    default:
      return {
        type: null,
        payload: null,
      }
  }
}
