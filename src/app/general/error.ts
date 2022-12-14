import { toast } from 'react-toastify';

export const errorHandler = (error: any): string => {
  let message = '';
  switch (error.response.data.statusCode) {
    case 500:
      //show error on console
      console.log(
        // prettier-ignore
        (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString()
      );
      message = 'Internal Server Error';
      break;
    default:
      message =
        // prettier-ignore
        (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString();
  }
  toast.error(message);
  return message;
};
