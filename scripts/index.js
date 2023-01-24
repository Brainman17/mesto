import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { config } from "./config.js";
import { initialCards } from "./initialCards.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";


// Переменные

const popupAddButtonElement = document.querySelector(".profile__add-button");
const popupEditButtonElement = document.querySelector(".profile__edit-button");

const formElementEdit = document.forms["form-edit"];
const formElementAdd = document.forms["form-add"];
const formInputName = document.querySelector('[name="name-add"]');
const formInputLink = document.querySelector('[name="link-add"]');

const nameInput = formElementEdit.querySelector(
  ".popup__form-subtitle_value_name"
);
const jobInput = formElementEdit.querySelector(
  ".popup__form-subtitle_value_job"
);

const cardsContainer = document.querySelector(".cards");
const templateSelector = "#card-template";

// Функции

function handleCardClick(name, link) {
  imageCardPopup.open(name, link);
};

function handleProfileFormSubmit(evt, values) {
  evt.preventDefault();
  userInfo.setUserInfo(values.name, values.job);
  editCardPopup.close();
}

function createCard(item){
  const card = new Card(item, templateSelector, handleCardClick)
  const cardElement = card.generateCard();
  listOfCards.addItem(cardElement);
}

function handleCardFormSubmit(evt, item) {
  evt.preventDefault();
  createCard(item);
  addCardPopup.close();
}

// Обработчики событий

popupAddButtonElement.addEventListener("click", () => {
  addCardPopup.open();
});

popupEditButtonElement.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  editCardPopup.setFormValues({ name, job });
  editCardPopup.open();
});

formElementEdit.addEventListener("submit", handleProfileFormSubmit);
formElementAdd.addEventListener("submit", handleCardFormSubmit);

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

const addCardPopup = new PopupWithForm(".popup_add", handleCardFormSubmit);
addCardPopup.setEventListeners();

const editCardPopup = new PopupWithForm(".popup_edit", handleProfileFormSubmit);
editCardPopup.setEventListeners();

const imageCardPopup = new PopupWithImage(".popup_card");
imageCardPopup.setEventListeners();

const userInfo = new UserInfo({ userNameSelector: '.profile__title', userJobSelector: '.profile__subtitle'});

const formValidatorEdit = new FormValidator(config, formElementEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(config, formElementAdd);
formValidatorAdd.enableValidation();




