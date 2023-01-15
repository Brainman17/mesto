export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
  }

_checkInputValidity = (input) => {
  const error = document.querySelector(`#${input.id}-error`);

  if(input.validity.valid) {
    error.textContent = '';
    input.classList.remove(this._config.errorClass, this._config.inputMarginOut);
    error.classList.remove(this._config.inputErrorClass);
  } else {
    error.textContent = input.validationMessage;
    input.classList.add(this._config.errorClass, this._config.inputMarginOut);
    error.classList.add(this._config.inputErrorClass);
  }
}

_toggleButtonVisibility = (inputs, button) => {
  const isFormValid = inputs.every(input => input.validity.valid);

  if(isFormValid) {
    button.classList.remove(this._config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(this._config.inactiveButtonClass);
    button.disabled = true;
  }
}

enableValidation = () => {

  this._inputs = [...this._formElement.querySelectorAll(this._config.inputSelector)];
  this._button = this._formElement.querySelector(this._config.submitButtonSelector);

  this._formElement.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  this._formElement.addEventListener('reset', () => {      setTimeout(() => {
      this._toggleButtonVisibility(this._inputs, this._button);
    }, 0)
  });

  this._inputs.forEach(input => {

    input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonVisibility(this._inputs, this._button);
    });
  });
  }
}







