import { object, string } from 'yup';

const MINIMUM_PASSWORD_LENGTH = 6;

export default object().shape({
  email: string().email().required(),
  password: string().required().min(MINIMUM_PASSWORD_LENGTH),
});
