import {initialCards} from './array.js';

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
  const img = card.querySelector('.card__image');

  img.src = item.link;
  img.alt = item.name;
  cardTitle.textContent = item.name;

  deleteButton.addEventListener('click', handleDeleteButtonClick);
  likeButton.addEventListener('click', handleLikeButtonClick);
  img.addEventListener('click', handleCardClick);

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













