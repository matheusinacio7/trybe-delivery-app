import { object, string } from 'yup';

export default object().shape({
  email: string().email().required(),
  password: string().required(),
});
