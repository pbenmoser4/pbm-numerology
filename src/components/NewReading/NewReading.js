import React from 'react';
import { connect } from 'react-redux';

import { figureName } from '../../actions';

import NewReadingForm from './NewReadingForm';

const NewReading = props => {
  const {figureName} = props;

  const onSubmit = formValues => {
    const {
      firstName,
      middleName,
      lastName,
      suffix,
      birthMonth,
      birthYear,
      birthDay
    } = formValues;
    const name = [
      firstName ? firstName.trim() : "",
      middleName ? middleName.trim() : "",
      lastName ? lastName.trim(): "",
      suffix ? suffix : ""
    ].join(' ').trim();
    const birthday = new Date(parseInt(birthYear), parseInt(birthMonth), parseInt(birthDay));

    figureName(name, birthday);
  }

  return (
    <NewReadingForm onSubmit={onSubmit}/>
  )
}

export default connect(
  null,
  { figureName }
)(NewReading);
