
const checkInputValidity = (input, object) => {
  const error = document.querySelector(`#${input.id}-error`);

  if(input.validity.valid) {
    error.textContent = '';
    error.classList.remove(object.errorClass);
    error.classList.remove(object.inputErrorClass);
  } else {
    error.textContent = input.validationMessage;
    error.classList.add(object.errorClass);
    error.classList.add(object.inputErrorClass);
  }
}

const toggleButtonVisibility = (inputs, button, object) => {
  const isFormValid = inputs.every(input => input.validationMessage);

  if(isFormValid) {
    button.classList.remove(object.inactiveButtonClass);
    button.disabled = '';
  } else {
    button.classList.add(object.inactiveButtonClass);
    button.disabled = 'disabled';
  }
}

const enableValidation = (object) => {
  const { formSelector, inputSelector, submitButtonSelector, ...restObject } = object
  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach(form => {
  const inputs = [...form.querySelectorAll(inputSelector)];
  const button = form.querySelector(submitButtonSelector);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    inputs.forEach(input => {
      input.addEventListener('input', () => {

        checkInputValidity(input, restObject);
        toggleButtonVisibility(inputs, button, restObject);
      })
    })
  })
})
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
