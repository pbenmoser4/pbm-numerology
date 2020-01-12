import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
// import { Form, Header } from 'semantic-ui-react';
import {
  Box,
  Button,
  Form,
  FormField,
  FormFields,
  Select,
  TextInput
} from 'grommet';

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
    // <Form.Select
    //   label={field.label}
    //   name={field.input.name}
    //   onChange={(e, { value }) => field.input.onChange(value)}
    //   options={field.options}
    //   placeholder={field.placeholder}
    //   value={field.input.value}
    // />
      <FormField label={field.label} htmlFor="select" {...this.props}>
        <Select
          placeholder={field.placeholder}
          options={field.options}
          value={field.input.value}
          onChange={({ value }) => field.input.onChange(value)}
          name={field.input.name}
          />
      </FormField>
  );

  renderInput = ({ input, label, placeholder, value, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error': ''}`;

    return (
      // <div className={className}>
      //   <label>{label}</label>
      //   <input {...input} placeholder={placeholder} autoComplete='off' />
      //   {this.renderError(meta)}
      // </div>
        <FormField
          label={label}
          error={meta.error && meta.touched ? meta.error : null}
          htmlFor="text-input"
          value={value}
          {...this.props}
          >
          <TextInput placeholder={placeholder} />
        </FormField>
    )
  }

  onSubmit = formValues => {
    console.log(formValues);
    // this.props.onSubmit(formValues);
  }

  render = () => {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
        <Field
          component={this.renderInput}
          label="First Name"
          name="firstName"
          placeholder="Enter First Name"
          />
      </Form>
    )
  }

  // render() {
  //   return (
  //     <Fragment>
  //       <h1>New Reading</h1>
  //       <Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
  //         <Box direction="row" justify="between">
  //           <Field
  //             component={this.renderInput}
  //             label="First Name"
  //             name="firstName"
  //             placeholder="Enter First Name"
  //             />
  //           <Field
  //             component={this.renderInput}
  //             label="Middle Name"
  //             name="middleName"
  //             placeholder="Enter Middle Name"
  //             />
  //           <Field
  //             component={this.renderInput}
  //             label="Last Name"
  //             name="lastName"
  //             placeholder="Enter Last Name"
  //             />
  //         </Box>
  //         <Box direction="row">
  //           <Field
  //             component={this.renderSelect}
  //             label="Suffix"
  //             name="suffix"
  //             placeholder="Enter Suffix"
  //             options={[
  //               "",
  //               "I",
  //               "II",
  //               "III",
  //               "IV",
  //               "V",
  //               "VI",
  //               "VII",
  //               "VIII",
  //             ]}
  //           />
  //         </Box>
  //         <Box direction="row">
  //           <Field
  //             component={this.renderSelect}
  //             label="Month"
  //             name="birthMonth"
  //             placeholder="Birth Month"
  //             options={[
  //               "January",
  //               "February",
  //               "March",
  //               "April",
  //               "May",
  //               "June",
  //               "July",
  //               "August",
  //               "September",
  //               "October",
  //               "November",
  //               "December",
  //             ]}
  //           />
  //           <Field
  //             component={this.renderInput}
  //             label="Birth Day"
  //             name="birthDay"
  //             placeholder="Birth Day"
  //             />
  //           <Field
  //             component={this.renderInput}
  //             label="Birth Year"
  //             name="birthYear"
  //             placeholder="Birth Year"
  //             />
  //         </Box>
  //         <Box direction="row" gap="small">
  //           <Button type="reset" label="Reset" />
  //           <Button type="submit" label="Read Name" primary={true} />
  //         </Box>
  //       </Form>
  //     </Fragment>
  //   )
  // }
}



const validate = formValues => {
  console.log('validate', JSON.stringify(formValues, null, 2));
  // const errors = {};
  // if (!formValues.firstName) {
  //   errors.firstName = "Please enter a first name";
  // }
  // if (!formValues.middleName) {
  //   errors.middleName = "Please enter a middle name";
  // }
  // if (!formValues.lastName) {
  //   errors.lastName = "Please enter a last name";
  // }
  // if (!formValues.birthDay) {
  //   errors.birthDay = "Enter a day between 1-31";
  // }
  // if (isNaN(parseInt(formValues.birthDay))) {
  //   errors.birthDay = "Enter an integer"
  // }
  // if (!isNaN(parseInt(formValues.birthDay)) && parseInt(formValues.birthDay) >  31) {
  //   errors.birthDay = "Enter a day between 1-31";
  // }
  // if (!formValues.birthYear) {
  //   errors.birthYear = "Enter a birth year";
  // }
  // if (isNaN(parseInt(formValues.birthYear))) {
  //   errors.birthYear = "Enter an integer"
  // }
  // if (formValues.birthYear && formValues.birthMonth && formValues.birthDay) {
  //   let year = parseInt(formValues.birthYear);
  //   let month = parseInt(formValues.birthMonth);
  //   let day = parseInt(formValues.birthDay);
  //   if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
  //     const date = new Date(year, month, day);
  //     if (day !== date.getDate()) {
  //       errors.birthDay = "Enter valid day for month"
  //     }
  //   }
  // }
  // return errors;
}

export default reduxForm({
  form: "readingInput",
  validate
})(NewReading);
