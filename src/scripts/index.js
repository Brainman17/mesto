import { config } from "./config.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

import "../pages/index.css";

// Переменные

const popupAddButtonElement = document.querySelector(".profile__add-button");
const popupEditButtonElement = document.querySelector(".profile__edit-button");
const popupAvatarButtonElement = document.querySelector(".profile__avatar");

const formElementEdit = document.forms["form-edit"];
const formElementAdd = document.forms["form-add"];
const formElementAvatarUpdate = document.forms["form-avatar"];

const templateSelector = "#card-template";

// Функции

function createCard(item) {
  const card = new Card(
    item,
    templateSelector,
    handleCardClick,
    userId,
    () => popupWithConfirmation.open(item._id, card),
    () => handlePutLike(item._id, card),
    () => handleDeleteLike(item._id, card)
  );
  const cardElement = card.generateCard();
  listOfCards.addItem(cardElement);
  card.countLikes(item.likes);
}

function handlePutLike(_id, card) {
  api.putLike(_id).then((res) => {
    card.countLikes(res.likes);
    console.log(res);
  });
}

function handleDeleteLike(_id, card) {
  api.deleteLike(_id).then((res) => {
    card.countLikes(res.likes);
    console.log(res);
  });
}

function handleDeleteCardFormSubmit(_id, card) {
  api
    .deleteInitialCards(_id)
    .then((res) => {
      card.countLikes();
      console.log(res);
    })
    .catch(console.log);
  card.deleteCard();
}

function handleCardFormSubmit(evt, { name, link }) {
  evt.preventDefault();
  popupAddCard.setButtonText("Создание...");

  api
    .postCreateCard(name, link)
    .then((res) => {
      createCard(res);
    })
    .catch(console.log)
    .finally(() => popupAddCard.setButtonText("Создать"));

  popupAddCard.close();
}

function handleProfileFormSubmit(evt, values) {
  evt.preventDefault();
  popupEditProfile.setButtonText("Сохранение...");

  api
    .editUserInfo(values.name, values.about)
    .then((res) => userInfo.setUserInfo(res.name, res.about, res.avatar))
    .catch(console.log)
    .finally(() => popupEditProfile.setButtonText("Сохранить"));

  popupEditProfile.close();
}

function handleAvatarFormSubmit(evt, { avatar }) {
  evt.preventDefault();
  popupUpdateAvatar.setButtonText("Сохранение...");

  api
    .updateAvatar(avatar)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
    })
    .catch(console.log)
    .finally(() => popupUpdateAvatar.setButtonText("Да"));
  popupUpdateAvatar.close();
}

function handleCardClick(name, link) {
  imageCardPopup.open(name, link);
}

// Обработчики событий

popupAddButtonElement.addEventListener("click", () => {
  popupAddCard.open();
});

popupEditButtonElement.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  popupEditProfile.setFormValues({ name, about });
  popupEditProfile.open();
});

popupAvatarButtonElement.addEventListener("click", () => {
  popupUpdateAvatar.open();
});

// Экземпляры

const popupWithConfirmation = new PopupWithConfirmation(
  ".popup_delete",
  handleDeleteCardFormSubmit
);
popupWithConfirmation.setEventListeners();

const popupUpdateAvatar = new PopupWithForm(
  ".popup_avatar-update",
  handleAvatarFormSubmit
);
popupUpdateAvatar.setEventListeners();

const popupAddCard = new PopupWithForm(".popup_add", handleCardFormSubmit);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(
  ".popup_edit",
  handleProfileFormSubmit
);
popupEditProfile.setEventListeners();

const imageCardPopup = new PopupWithImage(".popup_card");
imageCardPopup.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userJobSelector: ".profile__subtitle",
  userAvatarSelector: ".profile__avatar",
});

const formValidatorEdit = new FormValidator(config, formElementEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(config, formElementAdd);
formValidatorAdd.enableValidation();

const formValidatorAvatarUpdate = new FormValidator(
  config,
  formElementAvatarUpdate
);
formValidatorAvatarUpdate.enableValidation();

const listOfCards = new Section(
  {
    renderer: (item) => {
      createCard(item);
    },
  },
  ".cards"
);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "35c121f9-a929-4389-abb0-8fb8cd7ce78b",
    "Content-Type": "application/json",
  },
});

let userId;

api.getUserInfo().then((res) => {
  userId = res._id;
  userInfo.setUserInfo(res.name, res.about, res.avatar);
});

api.getInitialCards().then((res) => {
  listOfCards.renderItems(res);
});
