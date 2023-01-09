export class FormValidator {
  constructor(selector, formElement) {
    this._formElement = formElement;
    this._selector = selector;
    this._formSelector = selector.formSelector;
    this._inputSelector = selector.inputSelector;
    this._submitButtonSelector = selector.submitButtonSelector;
    this._inactiveButtonClass = selector.inactiveButtonClass;
    this._inputMarginOut = selector.inputMarginOut;
    this._inputErrorClass = selector.inputErrorClass;
    this._errorClass = selector.errorClass;
  }

  _checkInputValidity = (input) => {
    const error = this._formElement.querySelector(`#${input.id}-error`);

    if(input.validity.valid) {
      error.textContent = '';
      input.classList.remove(this._errorClass, this._inputMarginOut);
      error.classList.remove(this._inputErrorClass);
    } else {
      error.textContent = input.validationMessage;
      input.classList.add(this._errorClass,  this._inputMarginOut);
      error.classList.add(this._inputErrorClass);
    }
  }

  _toggleButtonVisibility = (inputs, button) => {
    const isFormValid = inputs.every(input => input.validity.valid);

    if(isFormValid) {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = '';
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = 'disabled';
    }
  }

  enableValidation = (config) => {
    const { formSelector, inputSelector, submitButtonSelector, ...restObject } = config;
    const forms = [...document.querySelectorAll(this._formSelector)];

    forms.forEach(form => {
      const inputs = [...form.querySelectorAll(this._inputSelector)];
      const button = form.querySelector(this._submitButtonSelector);

      form.addEventListener('submit', (e) => {
        e.preventDefault();
      })
      form.addEventListener('reset', () => {
        setTimeout(() => {
          _toggleButtonVisibility(inputs, button, restObject);
        }, 0)
        })
      inputs.forEach(input => {
        input.addEventListener('input', () => {

          _checkInputValidity(input, restObject);
          _toggleButtonVisibility(inputs, button, restObject);
          })
        })
      })
    }
}





// const checkInputValidity = (input, object) => {
//   const error = document.querySelector(`#${input.id}-error`);

//   if(input.validity.valid) {
//     error.textContent = '';
//     input.classList.remove(object.errorClass, object.inputMarginOut);
//     error.classList.remove(object.inputErrorClass);
//   } else {
//     error.textContent = input.validationMessage;
//     input.classList.add(object.errorClass, object.inputMarginOut);
//     error.classList.add(object.inputErrorClass);
//   }
// }

// const toggleButtonVisibility = (inputs, button, object) => {
//   const isFormValid = inputs.every(input => input.validity.valid);

//   if(isFormValid) {
//     button.classList.remove(object.inactiveButtonClass);
//     button.disabled = '';
//   } else {
//     button.classList.add(object.inactiveButtonClass);
//     button.disabled = 'disabled';
//   }
// }

// const enableValidation = (object) => {
//   const { formSelector, inputSelector, submitButtonSelector, ...restObject } = object;
//   const forms = [...document.querySelectorAll(formSelector)];

//   forms.forEach(form => {
//     const inputs = [...form.querySelectorAll(inputSelector)];
//     const button = form.querySelector(submitButtonSelector);

//     form.addEventListener('submit', (e) => {
//       e.preventDefault();
//     })
//     form.addEventListener('reset', () => {
//       setTimeout(() => {
//         toggleButtonVisibility(inputs, button, restObject);
//       }, 0)
//       })
//     inputs.forEach(input => {
//       input.addEventListener('input', () => {

//         checkInputValidity(input, restObject);
//         toggleButtonVisibility(inputs, button, restObject);
//         })
//       })
//     })
//   }







