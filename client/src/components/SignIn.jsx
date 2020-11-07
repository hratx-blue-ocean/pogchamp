import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Button, TextField } from '@material-ui/core';

const SignIn = (props) => {

  const [data, setData] = useState({
    "username": "",
    "password": ""
  })

  useEffect(() => {
    console.log(data)
    // axios.post()
  }, Object.values(data))

  const encrypt = (password) => {
    let encrypted = window.btoa(password + "salt");
    return encrypted;
  }

  return (
    <Container id="loginContainer">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          let username = values.email;
          let password = encrypt(values.password);
          setTimeout(() => {
            setData({ username, password });
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                size="small"
                label="Email"
                variant="filled" />
              <br />
              {errors.email && touched.email && errors.email}
              <br />
              <TextField
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                size="small"
                label="Password"
                variant="filled" />
              <br />
              {errors.password && touched.password && errors.password}
              <br />
              <Button type="submit" disabled={isSubmitting} variant="contained" >
                Submit
             </Button>
            </form>
          )}
      </Formik>
      <Link to="signup">Don't have an account? Sign up!</Link>
    </Container>
  )
}

export default SignIn;