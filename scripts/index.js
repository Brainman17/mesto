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
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const cardsContainer = document.querySelector(".cards");
const templateSelector = "#card-template";

// Функции

const handleCardClick = (name, link) => {
  imageCardPopup.open(name, link);
};

// function fillProfileInputs() {
//   const { name, description } = userInfo.getUserInfo();

//   nameInput.value = name;
//   jobInput.value = description;
// }

function handleProfileFormSubmit(evt, values) {
  evt.preventDefault();
  userInfo.setUserInfo(values.name, values.description);
  // profileName.textContent = nameInput.value;
  // profileJob.textContent = jobInput.value;
  editCardPopup.close();
}

function handleCardFormSubmit(evt, values) {
  evt.preventDefault();

  renderItems({ name: values['name-add'],
      link: values.link
    });

  addItem(cardsContainer);
  addCardPopup.close();
}

// Обработчики событий

popupAddButtonElement.addEventListener("click", () => {
  addCardPopup.open();
});

popupEditButtonElement.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  editCardPopup.setFormValues({ name, description });
  editCardPopup.open();
});

formElementEdit.addEventListener("submit", handleProfileFormSubmit);
formElementAdd.addEventListener("submit", handleCardFormSubmit);

// Экземпляры

const listOfCards = new Section( {
  initialCards: initialCards,
  renderer: (item) => {
    const card = new Card(item, templateSelector, handleCardClick)
    const cardElement = card.generateCard();
    listOfCards.addItem(cardElement);
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

const userInfo = new UserInfo({ userNameSelector: '.profile__title', userDescriptionSelector: '.profile__subtitle'});

const formValidatorEdit = new FormValidator(config, formElementEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(config, formElementAdd);
formValidatorAdd.enableValidation();




