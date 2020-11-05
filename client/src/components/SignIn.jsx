import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';

const SignIn = (props) => {

  const [data, setData] = useState({
    "username": "",
    "password": ""
  })

  useEffect(() => {
    console.log(data)
  }, Object.values(data))

  const encrypt = (password) => {
    return password.split('').reverse().join('');
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
           setData({username, password});
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
    </div>
  )
}

export default SignIn;