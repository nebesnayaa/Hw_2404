import { useState } from "react";
import axios from "axios";
import { Formik, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import yupAuthSchema from "../../schemas/yupAuthSchema";


function FormAuth() { 
  const [isFormValid, setIsFormValid] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  const navigate = useNavigate();

  const authHandler = async (data:any) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PATH_TO_SERVER}users?login=${data.login}&password=${data.password}`);
      if (!response.data[0]) {
        setLoginError("Неправильний логін або пароль");
        return;
      }
      else {
        navigate("/");
      }
    } 
    catch (err) {
      console.log(err);
    }
  }

  return (
    <Formik 
      initialValues={{
        login:"",
        password:"",
      }}
      validationSchema={yupAuthSchema}
      validationOnInput
      onSubmit={authHandler} 
    >
      {({values, errors, touched, isValid, handleSubmit}) => {
        setIsFormValid(isValid);
        return (
          <form onSubmit={handleSubmit} className="container mt-4 w-50 mt-5">
            <h2 className="text-center mb-4">Авторизація</h2>

            {loginError && <p className="text-danger">{loginError}</p>}

            <div className="form-group mt-3 mb-2">
              <label htmlFor="login" className="field-label">Логін</label>
              <Field
                name="login"
                type="text"
                className={`form-control ${
                  touched.login && errors.login ? "is-invalid" : ""
                } mt-1 field`}
                id="login"
              />
              <ErrorMessage
                name="login"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group mt-3 mb-2">
              <label htmlFor="password" className="field-label">Пароль</label>
              <Field
                name="password"
                type="password"
                className={`form-control ${
                  touched.password && errors.password ? "is-invalid" : ""
                } mt-1 field`}
                id="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <button type="submit" className={`btn btn-primary mt-4 ${!isFormValid && "disabled"}`} disabled={!isFormValid}>
              Авторизуватися
            </button>
          </form>
        );
      }}
    </Formik>
  );
}

export default FormAuth;