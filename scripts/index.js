import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { config } from "./config.js";
import { initialCards } from "./initialCards.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

// Переменные

const popupAddButtonElement = document.querySelector(".profile__add-button");
const popupEditButtonElement = document.querySelector(".profile__edit-button");

const formElementEdit = document.forms["form-edit"];
const formElementAdd = document.forms["form-add"];

const templateSelector = "#card-template";

// Функции

function createCard(item){
  const card = new Card(item, templateSelector, handleCardClick)
  const cardElement = card.generateCard();
  listOfCards.addItem(cardElement);
}

function handleCardClick(name, link) {
  imageCardPopup.open(name, link);
};

function handleProfileFormSubmit(evt, values) {
  evt.preventDefault();
  userInfo.setUserInfo(values.name, values.about);
  editCardPopup.close();
}

function handleCardFormSubmit(evt, item) {
  evt.preventDefault();
  createCard(item);
  addCardPopup.close();
}

// Обработчики событий

popupAddButtonElement.addEventListener('click', () => {
  addCardPopup.open();
});

popupEditButtonElement.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  editCardPopup.setFormValues({ name, about });
  editCardPopup.open();
});

// Экземпляры

const listOfCards = new Section( {
  initialCards: initialCards,
  renderer: (item) => {
    createCard(item);
  },
},
  '.cards'
);
listOfCards.renderItems();

const addCardPopup = new PopupWithForm('.popup_add', handleCardFormSubmit);
addCardPopup.setEventListeners();

const editCardPopup = new PopupWithForm('.popup_edit', handleProfileFormSubmit);
editCardPopup.setEventListeners();

const imageCardPopup = new PopupWithImage('.popup_card');
imageCardPopup.setEventListeners();

const userInfo = new UserInfo({ userNameSelector: '.profile__title', userJobSelector: '.profile__subtitle'});

const formValidatorEdit = new FormValidator(config, formElementEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(config, formElementAdd);
formValidatorAdd.enableValidation();




