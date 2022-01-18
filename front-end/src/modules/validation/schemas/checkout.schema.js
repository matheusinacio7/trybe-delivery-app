import { object, string, number } from 'yup';

export default object().shape({
  seller: string().required(),
  address: string().required(),
  number: number().required(),
});
