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

  _checkInputValidity = (input, object) => {
    this._error = document.querySelector(`#${input.id}-error`);

    if(input.validity.valid) {
      this._error.textContent = '';
      input.classList.remove(object.errorClass, object.inputMarginOut);
      this._error.classList.remove(object.inputErrorClass);
    } else {
      this._error.textContent = input.validationMessage;
      input.classList.add(object.errorClass, object.inputMarginOut);
      this._error.classList.add(object.inputErrorClass);
    }
  }

  _toggleButtonVisibility = (inputs, button, object) => {
    this._isFormValid = inputs.every(input => input.validity.valid);

    if(this._isFormValid) {
      button.classList.remove(object.inactiveButtonClass);
      button.disabled = '';
    } else {
      button.classList.add(object.inactiveButtonClass);
      button.disabled = 'disabled';
    }
  }

  _enableValidation = (object) => {
    { this._formSelector, this._inputSelector, this._submitButtonSelector, ...restObject } = object;
    const forms = [...document.querySelectorAll(this._formSelector)];

    forms.forEach(form => {
      const inputs = [...form.querySelectorAll(this._inputSelector)];
      const button = form.querySelector(this._submitButtonSelector);

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

    enableValidation({
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_invalid',
      inputMarginOut: 'popup__input_margin_out',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    });
}




