export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
  }

  _checkInputValidity = (input) => {
    const error = this._formElement.querySelector(`#${input.id}-error`);

    if(input.validity.valid) {
      error.textContent = '';
      input.classList.remove(this._config.errorClass, this._config.inputMarginOut);
      error.classList.remove(this._config.inputErrorClass);
    } else {
      error.textContent = input.validationMessage;
      input.classList.add(this._config.errorClass,  this._config.inputMarginOut);
      error.classList.add(this._config.inputErrorClass);
    }
  }

  _toggleButtonVisibility = (inputs, button) => {
    const isFormValid = inputs.every(input => input.validity.valid);

    if(isFormValid) {
      button.classList.remove(this._config.inactiveButtonClass);
      button.disabled = '';
    } else {
      button.classList.add(this._config.inactiveButtonClass);
      button.disabled = 'disabled';
    }
  }

  enableValidation = (config) => {
    const { formSelector, inputSelector, submitButtonSelector, ...restObject } = config || {};
    const forms = [...this._formElement.querySelectorAll(this._config.formSelector)];

    forms.forEach(form => {
      const inputs = [...form.querySelectorAll(this._config.inputSelector)];
      const button = form.querySelector(this._config.submitButtonSelector);

      form.addEventListener('submit', (e) => {
        e.preventDefault();
      })
      form.addEventListener('reset', () => {
        setTimeout(() => {
          this._toggleButtonVisibility(inputs, button, restObject);
        }, 0)
        })
      inputs.forEach(input => {
        input.addEventListener('input', () => {

          this._checkInputValidity(input, restObject);
          this._toggleButtonVisibility(inputs, button, restObject);
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







