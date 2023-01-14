// export class FormValidator {
//   constructor(config, formElement) {
//     this._formElement = formElement;
//     this._config = config;
//   }

//   _hasInvalidInput = (inputs) => {
//     return inputs.some((inputElement) => {
//       return !inputElement.validity.valid;
//     });
//   };

//   _enableSubmitButton = (button) => {
//     button.classList.remove(this._config.inactiveButtonClass);
//     button.disabled = false;
//   }

//   _disableSubmitButton = (button) => {
//     button.classList.add(this._config.inactiveButtonClass);
//     button.disabled = true;
//   }

//   _toggleButtonVisibility = (inputs, button) => {
//     if (this._hasInvalidInput(inputs)) {
//       this._disableSubmitButton(button)
//     } else {
//       this._enableSubmitButton(button)
//     }
//   }

//   _checkInputValidity = (inputElement) => {
//     if (!inputElement.validity.valid) {
//       this._showInputValidity(inputElement)
//     } else {
//       this._hideInputValidity(inputElement)
//     }
//   }

//   _showInputValidity = (inputElement) => {
//     const error = this._formElement.querySelector(`#${inputElement.id}-error`);

//     inputElement.classList.add(this._config.inputErrorClass, this._config.inputMarginOut);
//     error.classList.add(this._config.errorClass);
//     error.textContent = inputElement.validationMessage;
//   }

//   _hideInputValidity = (input) => {
//     const error = this._formElement.querySelector(`#${input.id}-error`);

//     input.classList.remove(this._config.inputErrorClass, this._config.inputMarginOut);
//     error.textContent = '';
//     error.classList.remove(this._config.errorClass);
//   }

//   enableValidation = () => {
//     const inputs = [...this._formElement.querySelectorAll(this._config.inputSelector)];
//     const button = this._formElement.querySelector(this._config.submitButtonSelector);

//     this._formElement.addEventListener('submit', (e) => {
//       e.preventDefault();
//     });
//     this._formElement.addEventListener('reset', () => {      setTimeout(() => {
//         toggleButtonVisibility(inputs, button);
//       }, 0)
//     });

//     inputs.forEach(input => {

//       input.addEventListener('input', () => {
//           this._checkInputValidity(input);
//           this._toggleButtonVisibility(inputs, button);
//       });
//     });
//   }
// }

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
    button.disabled = '';
  } else {
    button.classList.add(this._config.inactiveButtonClass);
    button.disabled = 'disabled';
  }
}

enableValidation = (object) => {

  const inputs = [...this._formElement.querySelectorAll(this._config.inputSelector)];
  const button = this._formElement.querySelector(this._config.submitButtonSelector);

  this._formElement.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  this._formElement.addEventListener('reset', () => {      setTimeout(() => {
      toggleButtonVisibility(inputs, button);
    }, 0)
  });

  inputs.forEach(input => {

    input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonVisibility(inputs, button);
    });
  });
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




