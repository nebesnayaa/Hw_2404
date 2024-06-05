// import Form from "../forms/Form";

// export default function Register() {
//   return (
//     <>
//       <Form />
//     </>
//   );
// }

import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

interface IUser {
  name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Name must contain only letters')
    .required("Name is required"),
  email: Yup.string().email("Invalid email")
    .required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters")
    .required("Password is required")
});

function registerUser(userData: IUser) {
  return fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  });
}

const Register = () => {
  const initialValues: IUser = { name: '', email: '', password: '' };
  const navigate = useNavigate();

  return (
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          registerUser(values)
            .then(() => {
                localStorage.setItem('loggedIn', 'true');
                navigate('/index');
            })
            .catch(error => {
                alert("Registration failed: " + error.message);
                setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" />

            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />

            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;