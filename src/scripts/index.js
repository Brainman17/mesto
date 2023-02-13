import "../pages/index.css";

import {
  popupAddButtonElement,
  popupEditButtonElement,
  popupAvatarButtonElement,
  formElementEdit,
  formElementAdd,
  formElementAvatarUpdate,
  templateSelector,
} from "../utils/constants.js";

import { config } from "./config.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

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
    card.handleLikeButtonClick();
    console.log(res);
  })
  .catch(console.log);
}

function handleDeleteLike(_id, card) {
  api.deleteLike(_id).then((res) => {
    card.countLikes(res.likes);
    card.handleLikeButtonClick();
    console.log(res);
  })
  .catch(console.log);
}

function handleDeleteCardFormSubmit(_id, card) {
  api
    .deleteInitialCards(_id)
    .then((res) => {
      popupWithConfirmation.close();
      card.deleteCard();
      console.log(res);
    })
    .catch(console.log)
}

function handleCardFormSubmit(evt, { name, link }) {
  evt.preventDefault();
  popupAddCard.setButtonText("Создание...");

  api
    .postCreateCard(name, link)
    .then((res) => {
      createCard(res);
      popupAddCard.close();
    })
    .catch(console.log)
    .finally(() => popupAddCard.setButtonText("Создать"));
}

function handleProfileFormSubmit(evt, values) {
  evt.preventDefault();
  popupEditProfile.setButtonText("Сохранение...");

  api
    .editUserInfo(values.name, values.about)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      popupEditProfile.close();
    })
    .catch(console.log)
    .finally(() => popupEditProfile.setButtonText("Сохранить"));
}

function handleAvatarFormSubmit(evt, { avatar }) {
  evt.preventDefault();
  popupUpdateAvatar.setButtonText("Сохранение...");

  api
    .updateAvatar(avatar)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      popupUpdateAvatar.close();
    })
    .catch(console.log)
    .finally(() => popupUpdateAvatar.setButtonText("Да"));
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
  userId = userData._id;
  userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
  listOfCards.renderItems(cards);
})
.catch(console.log)

