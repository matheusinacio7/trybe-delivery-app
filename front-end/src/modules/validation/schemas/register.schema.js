import { object, string } from 'yup';

const MINIMUM_PASSWORD_LENGTH = 6;
const MINIMUM_FULL_NAME_LENGTH = 12;

export default object().shape({
  name: string().required().min(MINIMUM_FULL_NAME_LENGTH),
  email: string().email().required(),
  password: string().required().min(MINIMUM_PASSWORD_LENGTH),
});
