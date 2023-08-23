import { useState } from 'react';
//не используется, пример кастомного хука валидации
export default function useFormValidation() {
  const newValues = { name: '', about: '', place: '', link: '', avatar: '' };
  const [inputs, setInputs] = useState(newValues);
  const [errors, setErrors] = useState(newValues);
  const [isValid, setIsValid] = useState(true);

  function handleChange(inputName, e) {
    setInputs({ ...inputs, [inputName]: e.target.value });
    setErrors({ ...errors, [inputName]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  }

  function resetAllForm() {
    setInputs(newValues);
    setErrors(newValues);
  }

  function resetSubmitButton() {
    setIsValid(false);
  }

  return { inputs, setInputs, errors, isValid, handleChange, resetAllForm, resetSubmitButton };
}