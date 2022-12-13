import {initialCards} from './array.js';

// Переменные

const popupMain = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupCard= document.querySelector('.popup_card');
const popupAddButtonElement = document.querySelector('.profile__add-button');
const popupCloseButtonElementAdd = document.querySelector('.popup__close-button_add');
const popupCloseButtonElementEdit = document.querySelector('.popup__close-button_edit');
const popupCloseButtonElementCard = document.querySelector('.popup__close-button_card');
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

const handleOpenCardClick = (e) => {
  popupCardImage.src = e.target.currentSrc;
  popupCardImage.alt = e.target.parentNode.innerText;
  popupCardSubtitle.textContent = e.target.parentNode.innerText;
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
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
  const img = card.querySelector('.card__image');

  img.src = item.link;
  img.alt = item.name;
  cardTitle.textContent = item.name;

  deleteButton.addEventListener('click', handleDeleteButtonClick);
  likeButton.addEventListener('click', handleLikeButtonClick);
  img.addEventListener('click', () => handleCardClick(item));

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

popupCloseButtonElementAdd.addEventListener('click', () => closePopup(popupAdd));
popupCloseButtonElementEdit.addEventListener('click', () => closePopup(popupEdit));
popupCloseButtonElementCard.addEventListener('click', () => closePopup(popupCard));
formElementEdit.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleCardFormSubmit);
popupEdit.addEventListener('click', function (evt) {
  if(evt.target === evt.currentTarget) closePopup(popupEdit)
});
document.addEventListener('keydown', function(evt) {
  if (evt.key === "Escape") closePopup(popupEdit);
});
popupAdd.addEventListener('click', function (evt) {
  if(evt.target === evt.currentTarget) closePopup(popupAdd)
});
document.addEventListener('keydown', function(evt) {
  if (evt.key === "Escape") closePopup(popupAdd);
});
popupCard.addEventListener('click', function (evt) {
  if(evt.target === evt.currentTarget) closePopup(popupCard)
});
document.addEventListener('keydown', function(evt) {
  if (evt.key === "Escape") closePopup(popupCard);
});


// Рендер карточек

initialCards.forEach((item) => {
  const element = createElement(item);
  cardsContainer.append(element);
})













