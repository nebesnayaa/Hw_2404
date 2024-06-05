import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required")
});

const Login: React.FC = () => {
  const initialValues: LoginFormValues = { email: '', password: '' };
  const [loginError, setLoginError] = useState<string>('');
  const navigate = useNavigate();

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          fetch(`http://localhost:3000/users?email=${encodeURIComponent(values.email)}`)
            .then(response => response.json())
            .then(users => {
              const user = users.find((user: { email: string, password: string }) => user.email === values.email && user.password === values.password);
              if (user) {
                localStorage.setItem('loggedIn', 'true');
                navigate('/primary');
              } else {
                setLoginError('No user found with provided credentials');
              }
              setSubmitting(false);
            })
            .catch(error => {
              setLoginError('Error checking credentials: ' + error.message);
              setSubmitting(false);
            }
          );
        }}
    >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </div>
            {loginError && <div className="error">{loginError}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;