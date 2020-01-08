import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Header } from 'semantic-ui-react';

class NewReading extends React.Component {

  renderError = ({error, touched}) => {
    if (touched && error) {
      return (
        <div className="error message" style={{color:'#9f3a38'}}>
          <div>{error}</div>
        </div>
      )
    }
  }

  renderDateError = (dateError) => {
    if (dateError) {
      return (
        <div className="ui error message">
          <div>{dateError}</div>
        </div>
      )
    }
  }

  renderSelect = field => (
    <Form.Select
      label={field.label}
      name={field.input.name}
      onChange={(e, { value }) => field.input.onChange(value)}
      options={field.options}
      placeholder={field.placeholder}
      value={field.input.value}
    />
  );

  renderInput = ({ input, label, placeholder, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error': ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} placeholder={placeholder} autoComplete='off' />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <Fragment>
        <Header as="h1">Create a New Reading</Header>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)} className="error">
          <Form.Group widths="equal">
            <Field
              component={this.renderInput}
              label="First Name"
              name="firstName"
              placeholder="Enter First Name"
              />
            <Field
              component={this.renderInput}
              label="Middle Name"
              name="middleName"
              placeholder="Enter Middle Name"
              />
            <Field
              component={this.renderInput}
              label="Last Name"
              name="lastName"
              placeholder="Enter Last Name"
              />
          </Form.Group>
          <Form.Group width={2}>
            <Field
              component={this.renderSelect}
              label="Suffix"
              name="suffix"
              placeholder="Enter Suffix"
              options={[
                {key:"0", text:"", value:""},
                {key:"1", text:"I", value:"I"},
                {key:"2", text:"II", value:"II"},
                {key:"3", text:"III", value:"III"},
                {key:"4", text:"IV", value:"IV"},
                {key:"5", text:"V", value:"V"},
                {key:"6", text:"VI", value:"VI"},
                {key:"7", text:"VII", value:"VII"},
                {key:"8", text:"VIII", value:"VIII"},
              ]}
            />
          </Form.Group>
          <Form.Group>
            <Field
              component={this.renderSelect}
              label="Month"
              name="birthMonth"
              placeholder="Birth Month"
              options={[
                {key:"1", text:"January", value:0},
                {key:"2", text:"February", value:1},
                {key:"3", text:"March", value:2},
                {key:"4", text:"April", value:3},
                {key:"5", text:"May", value:4},
                {key:"6", text:"June", value:5},
                {key:"7", text:"July", value:6},
                {key:"8", text:"August", value:7},
                {key:"9", text:"September", value:8},
                {key:"10", text:"October", value:9},
                {key:"11", text:"November", value:10},
                {key:"12", text:"December", value:11},
              ]}
            />
            <Field
              component={this.renderInput}
              label="Birth Day"
              name="birthDay"
              placeholder="Birth Day"
              />
            <Field
              component={this.renderInput}
              label="Birth Year"
              name="birthYear"
              placeholder="Birth Year"
              />
          </Form.Group>
          <Form.Group>
            <Form.Button primary>Analyze Name</Form.Button>
            <Form.Button onClick={this.props.reset}>Reset Form</Form.Button>
          </Form.Group>
        </Form>
      </Fragment>
    )
  }
}



const validate = formValues => {
  const errors = {};
  if (!formValues.firstName) {
    errors.firstName = "Please enter a first name";
  }
  if (!formValues.middleName) {
    errors.middleName = "Please enter a middle name";
  }
  if (!formValues.lastName) {
    errors.lastName = "Please enter a last name";
  }
  if (!formValues.birthDay) {
    errors.birthDay = "Enter a day between 1-31";
  }
  if (isNaN(parseInt(formValues.birthDay))) {
    errors.birthDay = "Enter an integer"
  }
  if (!isNaN(parseInt(formValues.birthDay)) && parseInt(formValues.birthDay) >  31) {
    errors.birthDay = "Enter a day between 1-31";
  }
  if (!formValues.birthYear) {
    errors.birthYear = "Enter a birth year";
  }
  if (isNaN(parseInt(formValues.birthYear))) {
    errors.birthYear = "Enter an integer"
  }
  if (formValues.birthYear && formValues.birthMonth && formValues.birthDay) {
    let year = parseInt(formValues.birthYear);
    let month = parseInt(formValues.birthMonth);
    let day = parseInt(formValues.birthDay);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      const date = new Date(year, month, day);
      if (day !== date.getDate()) {
        errors.birthDay = "Enter valid day for month"
      }
    }
  }
  return errors;
}

export default reduxForm({
  form: "readingInput",
  validate
})(NewReading);
