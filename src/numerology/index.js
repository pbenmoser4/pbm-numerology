import { NumerologyHelper } from './helper';

import {
  DESTINY_TITLE,
  BIRTH_FORCE_TITLE,
  HEARTS_DESIRE_TITLE,
  PERSONALITY_TITLE,
  REALITY_TITLE,
  TABLE_YEAR_TITLE,
  TABLE_AGE_TITLE,
  TABLE_FIRSTNAME_TITLE,
  TABLE_MIDDLENAME_TITLE,
  TABLE_LASTNAME_TITLE,
  TABLE_ESSENCE_TITLE,
  TABLE_PERSONAL_TITLE,
  TABLE_UNIVERSAL_TITLE,
  TABLE_PINNACLE_TITLE,
  TABLE_CHALLENGE_TITLE,
} from '../variables';

export class Numerology {
  constructor(name, birthday) {
    this.fullName = name;
    this.birthday = birthday;

    this.helper = new NumerologyHelper();

    const split = this.helper.splitName(name);
    this.firstName = split.first;
    this.middleName = split.middle;
    this.lastName = split.last;
    this.suffix = split.suffix;

    this.nameArray = [split.first, split.middle, split.last];
  }

  destiny = () => {
    return this.helper.figureStrings(this.nameArray);
  }

  birthForce = () => {
    const arrays = [
      this.helper.numToNumArray(this.birthday.getFullYear()),
      this.helper.numToNumArray(this.birthday.getMonth() + 1),
      this.helper.numToNumArray(this.birthday.getDate())
    ]
    return this.helper.reduceNumArrays(arrays);
  }

  heartsDesire = () => {
    return this.helper.figureStrings(this.nameArray.map(namePart => {
      return this.helper.vowelsFromString(namePart);
    }));
  }

  personality = () => {
    return this.helper.figureStrings(this.nameArray.map(namePart => {
      return this.helper.consonantsFromString(namePart);
    }))
  }

  reality = () => {
    const destinyFinal = this.destiny()[3][1];
    const birthFinal = this.birthForce()[3][1];
    return this.helper.reduceNumArray([destinyFinal,birthFinal]);
  }

  planesOfExpression = () => {
    const ret = []

    const planesBase = {
      "physical": [4,5],
      "mental": [1,8],
      "emotional": [2,3,6],
      "intuitive": [7,9]
    };

    const planesLookup = [
      "mental", "emotional", "emotional", "physical",
      "physical", "emotional", "intuitive", "mental", "intuitive"
    ];

    Object.keys(planesBase).forEach(key => {
      const arr = planesBase[key];
      const value = this.nameArray.map(namePart => {
        return this.helper.stringToNumArray(namePart).filter(el => arr.includes(el)).length;
      }).reduce((agg, cur) => agg += cur);
      ret.push({
        "name": key,
        "value": value,
        "description": planesLookup[value - 1]
      })
    })

    return ret;
  }

  intensification = () => {
    let ret = [0,0,0,0,0,0,0,0,0];
    this.nameArray.forEach(namePart => {
      this.helper.stringToNumArray(namePart).forEach(num => {
        let val = ret[num - 1];
        ret[num-1] = val + 1;
      })
    })
    return ret;
  }

  pinnaclesAndChallenges = () => {
    const reducedYear = this.helper.reduceNumber(this.birthday.getFullYear())[1];
    const reducedMonth = this.helper.reduceNumber(this.birthday.getMonth() + 1)[1];
    const reducedDay = this.helper.reduceNumber(this.birthday.getDate())[1];

    const firstPinnacle = this.helper.reduceNumber(reducedMonth + reducedDay);
    const secondPinnacle = this.helper.reduceNumber(reducedDay + reducedYear);
    const thirdPinnacle = this.helper.reduceNumber(firstPinnacle[1] + secondPinnacle[1]);
    const fourthPinnacle = this.helper.reduceNumber(reducedMonth + reducedYear);

    const firstChallenge = this.helper.reduceNumber(Math.abs(reducedMonth - reducedDay));
    const secondChallenge = this.helper.reduceNumber(Math.abs(reducedDay - reducedYear));
    const thirdChallenge = this.helper.reduceNumber(Math.abs(firstChallenge[1] - secondChallenge[1]));
    const fourthChallenge = this.helper.reduceNumber(Math.abs(reducedMonth - reducedYear));

    const secondStart = 36 - this.birthForce()[3][1];
    const thirdStart = secondStart + 9;
    const fourthStart = thirdStart + 9;

    return {
      "first": {
        "start": 0,
        "end": secondStart,
        "pinnacle": firstPinnacle,
        "challenge": firstChallenge,
      },
      "second": {
        "start": secondStart + 1,
        "end": thirdStart,
        "pinnacle": secondPinnacle,
        "challenge": secondChallenge,
      },
      "third": {
        "start": thirdStart + 1,
        "end": fourthStart,
        "pinnacle": thirdPinnacle,
        "challenge": thirdChallenge,
      },
      "fourth": {
        "start": fourthStart + 1,
        "end": 1000,
        "pinnacle": fourthPinnacle,
        "challenge": fourthChallenge,
      }
    };
  }

  pncForYear = (year, opt) => {
    const pnc = this.pinnaclesAndChallenges();
    const age = year - this.birthday.getFullYear();

    let found = false;
    let cur = 0;
    const keys = Object.keys(pnc);

    while (!found) {
      let currentPNC = pnc[keys[cur]];
      if (age <= currentPNC["end"]) {
        found = true;
        if (opt ===  "pinnacle") {
          return currentPNC["pinnacle"];
        } else if (opt === "challenge") {
          return currentPNC["challenge"];
        }
      }
      cur += 1;
    }

    return null;
  }

  habitChallenge = () => {
    return this.helper.reduceNumber(this.nameArray.map(el=>el.length).reduce((a,b)=>a+b,0));
  }

  currentYear = (date) => {
    const now = new Date();
    const useDate = date ? date : now;
    const useYear = useDate.getFullYear();
    return this.helper.reduceNumber(useYear);
  }

  currentDate = (date) => {
    const now = new Date();
    const useDate = date ? date : now;
    const useYear = useDate.getFullYear();
    const reducedUseYear = this.helper.reduceNumber(useYear);
    const useMonth = useDate.getMonth() + 1;
    const reducedUseMonth = this.helper.reduceNumber(useMonth);
    const useDay = useDate.getDate();
    const reducedUseDay = this.helper.reduceNumber(useDay);

    return {
      "year": reducedUseYear,
      "month": this.helper.reduceNumArray([reducedUseYear[1], reducedUseMonth[1]]),
      "day": this.helper.reduceNumArray([reducedUseYear[1], reducedUseMonth[1], reducedUseDay[1]]),
    }
  }

  personalDate = (date) => {
    const now = new Date();
    const useDate = date ? date : now;
    const useYear = useDate.getFullYear();
    const useMonth = useDate.getMonth() + 1;
    const reducedUseMonth = this.helper.reduceNumber(useMonth);
    const useDay = useDate.getDate();
    const reducedUseDay = this.helper.reduceNumber(useDay);

    const reducedUseYear = this.helper.reduceNumber(useYear);
    const reducedBirthMonth = this.helper.reduceNumber(this.birthday.getMonth() + 1);
    const reducedBirthDay = this.helper.reduceNumber(this.birthday.getDate());

    const personalYear = this.helper.reduceNumArray([reducedBirthDay[1], reducedBirthMonth[1], reducedUseYear[1]]);
    const personalMonth = this.helper.reduceNumArray([reducedUseMonth[1], personalYear[1]]);
    const personalDay = this.helper.reduceNumArray([reducedUseDay[1], reducedUseMonth[1], personalYear[1]]);

    return {
      "year": personalYear,
      "month": personalMonth,
      "day":  personalDay
    }
  }

  characterChart = () => {
    const retDict = {};
    retDict[DESTINY_TITLE] = this.destiny();
    retDict[BIRTH_FORCE_TITLE] = this.birthForce();
    retDict[HEARTS_DESIRE_TITLE] = this.heartsDesire();
    retDict[PERSONALITY_TITLE] = this.personality();
    retDict[REALITY_TITLE] = this.reality();

    return retDict;
  }

  tableOfEvents = (startDate, endDate) => {
    const useStartDate = startDate ? startDate : this.birthday;
    let useEndDate = endDate ? endDate : new Date(2030, 11, 31);

    const years = Math.floor((useEndDate - useStartDate) / (1000 * 60 * 60 * 24 * 365));
    const firstNameMap = this.helper.namePartDateMap(this.firstName, this.birthday);
    const middleNameMap = this.helper.namePartDateMap(this.middleName, this.birthday);
    const lastNameMap = this.helper.namePartDateMap(this.lastName, this.birthday);

    const chart = [];
    for (let i=0; i < years; i++){
      let year = useStartDate.getFullYear() + i;
      let date = new Date(year, this.birthday.getMonth(), this.birthday.getDate());
      const age = i === 0 ? "Br" : i;
      let firstNameLetter = firstNameMap[year.toString()];
      let middleNameLetter = middleNameMap[year.toString()];
      let lastNameLetter = lastNameMap[year.toString()];
      let essence = this.helper.figureString([
        firstNameLetter,
        middleNameLetter,
        lastNameLetter
      ].join(''));

      const personalDate = this.personalDate(date);
      const currentDate = this.currentDate(date);

      const chartPush = {}
      chartPush[TABLE_YEAR_TITLE] = year;
      chartPush[TABLE_AGE_TITLE] = age;
      chartPush[TABLE_FIRSTNAME_TITLE] = firstNameMap[year.toString()];
      chartPush[TABLE_MIDDLENAME_TITLE] = middleNameMap[year.toString()];
      chartPush[TABLE_LASTNAME_TITLE] = lastNameMap[year.toString()];
      chartPush[TABLE_ESSENCE_TITLE] = year === useStartDate.getFullYear() ? "": essence;
      chartPush[TABLE_PERSONAL_TITLE] = personalDate['year'];
      chartPush[TABLE_UNIVERSAL_TITLE] = currentDate['year'];
      chartPush[TABLE_PINNACLE_TITLE] = this.pncForYear(year, "pinnacle");
      chartPush[TABLE_CHALLENGE_TITLE] = this.pncForYear(year, "challenge");
      chart.push(chartPush);
    }
    return chart;
  }
}
