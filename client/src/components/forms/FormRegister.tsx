import { Formik, Field, ErrorMessage } from "formik";
import yupRegisterSchema from "../../schemas/yupRegisterSchema";
import { useState } from "react";
import User from "../../models/User";
function FormRegister() {
  const [isFormValid, setFormValid] = useState(false);
  const user: User = {
    name: "",
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  return (
    <Formik
      initialValues={user}
      validationSchema={yupRegisterSchema}
      validationOnInput
      onSubmit={(values) => {
        //відправлення даних на сервер
        console.log("Data: ", values);
      }}
    >
      {({ values, errors, touched, isValid, handleSubmit }) => {
        setFormValid(isValid);
        return (
          <form onSubmit={handleSubmit} className="container" noValidate>
            <h2 className="text-center mb-4">Реєстрація</h2>

            <div className="form-group">
              <label htmlFor="name">Ім'я</label>
              <Field
                name="name"
                type="text"
                className={`form-control ${
                  touched.name && errors.name ? "is-invalid" : ""
                }`}
                id="name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="login">Логін</label>
              <Field
                name="login"
                type="text"
                className={`form-control ${
                  touched.login && errors.login ? "is-invalid" : ""
                }`}
                id="login"
              />
              <ErrorMessage
                name="login"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="email"
                className={`form-control ${
                  touched.email && errors.email ? "is-invalid" : ""
                }`}
                id="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <Field
                name="password"
                type="password"
                className={`form-control ${
                  touched.password && errors.password ? "is-invalid" : ""
                }`}
                id="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Підтвердження пароля</label>
              <Field
                name="confirmPassword"
                type="password"
                className={`form-control ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "is-invalid"
                    : ""
                }`}
                id="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary mt-4 ${!isFormValid && "disabled"}`}
              disabled={!isFormValid}
            >
              OK
            </button>
          </form>
        );
      }}
    </Formik>
  );
}
export default FormRegister;
