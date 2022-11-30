import {initialCards} from './array.js';

// Переменные


const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupCard= document.querySelector('.popup_card');
const popupAddButtonElement = document.querySelector('.profile__add-button');
const popupCloseButtonElementList = document.querySelectorAll('.popup__close-button');
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const formElementEdit = document.querySelector('.popup__form-content_edit');
const nameInput = formElementEdit.querySelector('.popup__form-subtitle_value_name');
const jobInput = formElementEdit.querySelector('.popup__form-subtitle_value_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const formElementAdd = document.querySelector('.popup__form-content_add');
const formInputName = document.querySelector('[name="name-add"]');
const formInputLink = document.querySelector('[name="link-add"]');
const popupCardSubtitle = document.querySelector('.popup__card-subtitle');
const popupCardImage = document.querySelector('.popup__card-img');

const handleCreateButton = (evt) => {
  evt.preventDefault();

  renderCard({ name: formInputName.value,
    link: formInputLink.value});

  evt.target.reset();

  closePopup(popupAdd);

}

const renderCard = (item) => {
  cardsContainer.prepend(createElement(item));
};

const openCardClick = (e) => {
  popupCardImage.src = e.target.currentSrc;
  popupCardImage.alt = e.target.parentNode.innerText;
  popupCardSubtitle.textContent = e.target.parentNode.innerText;
  popupCard.classList.add('popup_opened');
}

const deleteButtonClick = (e) => {
  e.target.closest('.card').remove();
}

const likeButtonClick = (e) => {
  e.target.classList.toggle('card__heart-button_active');
}

// Функции


function popupEditOpen() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupAddOpen() {
  popupAdd.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

}

function popupClose() {
  popupEdit.classList.remove('popup_opened');
  popupAdd.classList.remove('popup_opened');
  popupCard.classList.remove('popup_opened');
}

function handleSubmitButton (evt) {
  evt.preventDefault();
  closePopup(popupEdit);
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function createElement(item) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.card__subtitle');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__heart-button');
  const img = card.querySelector('.card__image');

  img.src = item.link;
  img.alt = item.name;
  cardTitle.textContent = item.name;

  deleteButton.addEventListener('click', deleteButtonClick);
  likeButton.addEventListener('click', likeButtonClick);
  img.addEventListener('click', openCardClick);

  return card;

}

// Обработчики событий


popupAddButtonElement.addEventListener('click', popupAddOpen);
popupEditButtonElement.addEventListener('click', popupEditOpen);
popupCloseButtonElementList.forEach(btn => btn.addEventListener('click', popupClose));
formElementEdit.addEventListener('submit', handleSubmitButton);
formElementAdd.addEventListener('submit', handleCreateButton);

// Рендер карточек


initialCards.forEach((item) => {
  const element = createElement(item);
  cardsContainer.append(element);
})













