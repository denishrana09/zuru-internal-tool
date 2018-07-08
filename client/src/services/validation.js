
export const validateEmail = (value) => {
  const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  return regexEmail.test(value);
};


export const validatePhone = (value) => {
  const regexPhone = /^\d{10}$/;
  return regexPhone.test(value);
};
