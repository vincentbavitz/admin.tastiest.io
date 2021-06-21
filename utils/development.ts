// Only log in development mode
export const dlog = (message: any, ...optionalParams: any) => {
  return process.env.NODE_ENV === 'development'
    ? console.log(message, ...optionalParams)
    : null;
};
