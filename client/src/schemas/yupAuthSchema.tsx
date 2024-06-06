import * as yup from "yup"

const MIN = 5;
const MAX = 15;
const PASS_VALUE = 8;
const yupAuthSchema = yup.object({
  login: yup
    .string()
    .min(MIN, `Логін менше ${MIN} символів`)
    .max(MAX, `Логін більше ${MAX} символів`)
    .required("Введіть логін"),
  password: yup
    .string()
    .min(PASS_VALUE, `Пароль не може бути менше ${PASS_VALUE} символів`)
    .required("Введіть пароль"),
});

export default yupAuthSchema;