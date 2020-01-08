import {
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
} from '../actions/types';

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

import { Numerology } from '../numerology';

const ben = new Numerology("Percival Benjamin Moser IV", new Date(1990, 0, 16));
// const maddie = new Numerology("Madeline Harrity Winter", new Date(1990, 4, 22));
// const alison = new Numerology("Alison Suzanne Moser", new Date(1987, 11, 4));
// const olivia = new Numerology("Olivia Clark Winter", new Date(1980, 9, 30));
// const dad = new Numerology("Percival Benjamin Moser III", new Date(1947, 0, 18));
// const mom = new Numerology("Percival Benjamin Moser IV", new Date(1990, 0, 16));

const INITIAL_STATE = {
  person: ben
};

export default (state=INITIAL_STATE, action) => {
  let retDict = {...state};
  switch(action.type) {
    case FIGURE_NAME:
      return {...state, "person": action.payload};
    case GET_DESTINY_DESCRIPTION:
      retDict[DESTINY_TITLE] = action.payload;
      return retDict;
    case GET_BIRTH_DESCRIPTION:
      retDict[BIRTH_FORCE_TITLE] = action.payload;
      return retDict;
    case GET_HEART_DESCRIPTION:
      retDict[HEARTS_DESIRE_TITLE] = action.payload;
      return retDict;
    case GET_PERSONALITY_DESCRIPTION:
      retDict[PERSONALITY_TITLE] = action.payload;
      return retDict;
    case GET_REALITY_DESCRIPTION:
      retDict[REALITY_TITLE] = action.payload;
      return retDict;
    case GET_ESSENCE_DESCRIPTION:
      retDict[TABLE_ESSENCE_TITLE] = action.payload;
      return retDict;
    case GET_PERSONAL_DESCRIPTION:
      retDict[TABLE_PERSONAL_TITLE] = action.payload;
      return retDict;
    case GET_UNIVERSAL_DESCRIPTION:
      retDict[TABLE_UNIVERSAL_TITLE] = action.payload;
      return retDict;
    case GET_PINNACLE_DESCRIPTION:
      retDict[TABLE_PINNACLE_TITLE] = action.payload;
      return retDict;
    case GET_CHALLENGE_DISCRIPTION:
      retDict[TABLE_CHALLENGE_TITLE] = action.payload;
      return retDict;
    default:
      return state;
  }
}
