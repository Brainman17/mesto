import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {config} from './config.js';
import {initialCards} from './initialCards.js';

// Переменные

const popups = document.querySelectorAll('.popup');
const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupCard = document.querySelector('.popup_card');
const popupAddButtonElement = document.querySelector('.profile__add-button');
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const popupCardSubtitle = document.querySelector('.popup__card-subtitle');
const popupCardImage = document.querySelector('.popup__card-img');

const formElementEdit = document.forms['form-edit'];
const formElementAdd = document.forms['form-add'];
const formInputName = document.querySelector('[name="name-add"]');
const formInputLink = document.querySelector('[name="link-add"]');

const nameInput = formElementEdit.querySelector('.popup__form-subtitle_value_name');
const jobInput = formElementEdit.querySelector('.popup__form-subtitle_value_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.cards');
const templateSelector = '#card-template';

// Функции

const handleCardClick = (name, link) => {
  popupCardSubtitle.textContent = name;
  popupCardImage.alt = name;
  popupCardImage.src = link;

  openPopup(popupCard);
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
    link: formInputLink.value}, cardsContainer);

  evt.target.reset();
}

// Обработчики событий

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

popupAddButtonElement.addEventListener('click',function openAddPopup() {
  openPopup(popupAdd);
});

popupEditButtonElement.addEventListener('click', function openEditPopup() {
  openPopup(popupEdit);
  fillProfileInputs ();
});

formElementEdit.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleCardFormSubmit);


// Экземпляры валидации форм

const formValidatorEdit = new FormValidator(config, formElementEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(config, formElementAdd)
formValidatorAdd.enableValidation();

const renderCard = (item, container) => {
  const card = new Card(item, templateSelector, handleCardClick);
  const cardElement = card.generateCard();

  container.prepend(cardElement);
};

initialCards.forEach((item) => {
  renderCard(item, cardsContainer);
});












