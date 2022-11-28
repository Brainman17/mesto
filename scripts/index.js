import {initialCards} from './array.js';



const popupElement = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupAddButtonElement = document.querySelector('.profile__add-button');
const popupCloseButtonElement = popupElement.querySelectorAll('.popup__close-button');
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const popupSaveButtonElement = popupElement.querySelector('.popup__save-button');
const formElement = popupElement.querySelector('.popup__form-content');
const nameInput = formElement.querySelector('.popup__form-subtitle_value_name');
const jobInput = formElement.querySelector('.popup__form-subtitle_value_job');
const titleInput = formElement.querySelector('.popup__form-subtitle_value_title');
const linkInput = formElement.querySelector('.popup__form-subtitle_value_link');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const titleCard = document.querySelector('.card__subtitle');
const linkCard = document.querySelector('card__image');

function popupEditOpen() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupAddOpen() {
  popupAdd.classList.add('popup_opened');
}

function popupClose() {
  popupEdit.classList.remove('popup_opened');
  popupAdd.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
    evt.preventDefault();
  popupEdit.classList.remove('popup_opened');
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

popupAddButtonElement.addEventListener('click', popupAddOpen);
popupEditButtonElement.addEventListener('click', popupEditOpen);
popupCloseButtonElement.forEach(btn => btn.addEventListener('click', popupClose));
formElement.addEventListener('submit', formSubmitHandler);




// Практическая работа 5


const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const form = document.querySelector('.popup__form-content_add');
const formInputName = document.querySelector('[name="name-add"]');
const formInputLink = document.querySelector('[name="link-add"]');


function createElement(item) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.card__subtitle');
  const DeleteButton = card.querySelector('.card__delete-button');
  const LikeButton = card.querySelector('.card__heart-button');
  const img = card.querySelector('.card__image');

  img.src = item.link;
  cardTitle.textContent = item.name;

  DeleteButton.addEventListener('click', DeleteButtonClick);
  LikeButton.addEventListener('click', LikeButtonClick);

  return card;

}

const DeleteButtonClick = (e) => {
  e.target.closest('.card').remove();
}

const LikeButtonClick = (e) => {
  e.target.classList.toggle('card__heart-button_active');
}

initialCards.forEach(function(item) {
  const element = createElement(item);
  cardsList.append(element);
})

const formCreateHandler = (evt) => {
  evt.preventDefault();
  const list = {
    name: formInputName.value,
    link: formInputLink.value
  }

  const element = createElement(list);
  cardsList.append(element);

}

form.addEventListener('submit', formCreateHandler);
