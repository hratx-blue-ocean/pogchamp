import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div id="loginContainer">
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
              <label>Email: </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <br />
              <label>Password: </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <br />
              <button type="submit" disabled={isSubmitting}>
                Submit
           </button>
            </form>
          )}
      </Formik>
      <Link to="signup">Don't have an account? Sign up!</Link>
    </div>
  )
}

export default SignIn;