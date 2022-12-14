import validator from 'validator';

const minLength = async (value: string, minLength: number) => {
  return !validator.isLength(value, { min: minLength });
};

const allowedCharacters = async (value: string, regex: string) => {
  return !validator.matches(value, new RegExp(regex, 'g'));
};

const requireCheckedIn = async (values: boolean[]) => {
  const test = values.indexOf(true);
  return test === -1;
};

const isPositiveInteger = async (value: string) => {
  return !validator.isInt(value, { min: 0 });
};

const setTogether = async (
  errorMin: string,
  errorMax: string,
  valueMin: any,
  valueMax: any
) => {
  return { [errorMin]: !valueMin, [errorMax]: !valueMax };
};

const minBiggerEqualMax = async (
  valueMin: number,
  valueMax: number,
  equalAlso: boolean
) => {
  return equalAlso ? valueMin >= valueMax : valueMin > valueMax;
};

const validation = {
  minLength,
  allowedCharacters,
  requireCheckedIn,
  isPositiveInteger,
  setTogether,
  minBiggerEqualMax
};
export default validation;
