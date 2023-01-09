export class FormValidator {
  constructor(selector, formElement) {
    this._formElement = formElement;
    this._selector = selector;
    this._formSelector = selector.formSelector;
    this._inputSelector = selector.inputSelector;
    this._submitButtonSelector = selector.submitButtonSelector;
    this._inactiveButtonClass = selector.inactiveButtonClass;
    this._inputMarginOut =  selector.inputMarginOut;
    this._inputErrorClass = selector.inputErrorClass;
    this._errorClass = selector.errorClass;
    this._error = selector.error;
    this._isFormValid = selector.isFormValid;
    this._forms = selector.forms;
  }

  _checkInputValidity = (input) => {
    const error = document.querySelector(`#${input.id}-error`);

    if(input.validity.valid) {
      error.textContent = '';
      input.classList.remove(this._errorClass, this._inputMarginOut);
      error.classList.remove(this._inputErrorClass);
    } else {
      error.textContent = input.validationMessage;
      input.classList.add(this._errorClass, this._inputMarginOut);
      error.classList.add(this._inputErrorClass);
    }
  }

  _toggleButtonVisibility = (inputs, button) => {
    const isFormValid = inputs.every(input => input.validity.valid);

    if(isFormValid) {
      button.classList.remove(this._submitButtonSelector);
      button.disabled = '';
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = 'disabled';
    }
  }

  enableValidation = (object) => {
    const{ formSelector, inputSelector, submitButtonSelector, ...restObject } = object;
    const forms = [...document.querySelectorAll(formSelector)];

    forms.forEach(form => {
      const inputs = [...form.querySelectorAll(inputSelector)];
      const button = form.querySelector(submitButtonSelector);

      form.addEventListener('submit', (e) => {
        e.preventDefault();
      })
      form.addEventListener('reset', () => {
        setTimeout(() => {
          toggleButtonVisibility(inputs, button, restObject);
        }, 0)
        })
      inputs.forEach(input => {
        input.addEventListener('input', () => {

          checkInputValidity(input, restObject);
          toggleButtonVisibility(inputs, button, restObject);
          })
        })
      })
    }
}



