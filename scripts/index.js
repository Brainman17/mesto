import { Card } from './Card.js';
// import { FormValidator } from 'FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'http://127.0.0.1:5500/images/dombay.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Переменные

const popups = document.querySelectorAll('.popup');
const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupCard= document.querySelector('.popup_card');
const popupAddButtonElement = document.querySelector('.profile__add-button');
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const formElementEdit = document.forms['form-edit'];
const formElementAdd = document.forms['form-add'];
const nameInput = formElementEdit.querySelector('.popup__form-subtitle_value_name');
const jobInput = formElementEdit.querySelector('.popup__form-subtitle_value_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const formInputName = document.querySelector('[name="name-add"]');
const formInputLink = document.querySelector('[name="link-add"]');
const popupCardSubtitle = document.querySelector('.popup__card-subtitle');
const popupCardImage = document.querySelector('.popup__card-img');

// Функции

const renderCard = (item) => {
  cardsContainer.prepend(createElement(item));
};

const handleCardClick = (e) => {
  popupCardImage.src = e.target.src;
  popupCardImage.alt = e.target.alt;
  popupCardSubtitle.textContent = e.target.alt;
  openPopup(popupCard);
}

const handleDeleteButtonClick = (e) => {
  e.target.closest('.card').remove();
}

const handleLikeButtonClick = (e) => {
  e.target.classList.toggle('card__heart-button_active');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

function fillProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  closePopup(popupEdit);
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  closePopup(popupAdd);
  renderCard({ name: formInputName.value,
    link: formInputLink.value});

  evt.target.reset();
}

function createElement(item) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.card__subtitle');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__heart-button');
  const cardImg = card.querySelector('.card__image');

  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardTitle.textContent = item.name;

  deleteButton.addEventListener('click', handleDeleteButtonClick);
  likeButton.addEventListener('click', handleLikeButtonClick);
  cardImg.addEventListener('click', handleCardClick);

  return card;

}

// Обработчики событий

popupAddButtonElement.addEventListener('click',function openAddPopup() {
  openPopup(popupAdd);
});
popupEditButtonElement.addEventListener('click', function openEditPopup() {
  openPopup(popupEdit);
  fillProfileInputs ();
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
})

formElementEdit.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleCardFormSubmit);

// Рендер карточек

initialCards.forEach((item) => {
  const element = createElement(item);
  cardsContainer.append(element);
})


// Валидация


const checkInputValidity = (input, object) => {
  const error = document.querySelector(`#${input.id}-error`);

  if(input.validity.valid) {
    error.textContent = '';
    input.classList.remove(object.errorClass, object.inputMarginOut);
    error.classList.remove(object.inputErrorClass);
  } else {
    error.textContent = input.validationMessage;
    input.classList.add(object.errorClass, object.inputMarginOut);
    error.classList.add(object.inputErrorClass);
  }
}

const toggleButtonVisibility = (inputs, button, object) => {
  const isFormValid = inputs.every(input => input.validity.valid);

  if(isFormValid) {
    button.classList.remove(object.inactiveButtonClass);
    button.disabled = '';
  } else {
    button.classList.add(object.inactiveButtonClass);
    button.disabled = 'disabled';
  }
}

const enableValidation = (object) => {
  const { formSelector, inputSelector, submitButtonSelector, ...restObject } = object;
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


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputMarginOut: 'popup__input_margin_out',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});








