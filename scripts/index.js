const popupElement = document.querySelector('.popup');
const popupAddElement = document.querySelector('.popup-add');
const popupAddButtonElement = document.querySelector('.profile__add-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const popupSaveButtonElement = popupElement.querySelector('.popup__save-button');
const DeleteButton = popupElement.querySelector('.card__delete-button');
const LikeButton = document.querySelector('.card__heart-button');
const formElement = popupElement.querySelector('.popup__form-content');
const nameInput = formElement.querySelector('.popup__form-subtitle_value_name');
const jobInput = formElement.querySelector('.popup__form-subtitle_value_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

console.log(popupAddElement);
console.log(popupAddButtonElement);

// const DeleteButtonClick = (e) => {
// e.target.closest('.card').remove();
// }
// const LikeButtonClick = (e) => {
//  e.target.classList.toggle('card__heart-button_active');
// }

// DeleteButton.addEventListener('click', DeleteButtonClick);
// LikeButton.addEventListener('click', LikeButtonClick);

function popupOpen() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupAddOpen() {
  popupAddElement.classList.add('popup_opened');
}


function popupClose() {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
  popupElement.classList.remove('popup_opened');
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

popupAddButtonElement.addEventListener('click', popupAddOpen);
popupEditButtonElement.addEventListener('click', popupOpen);
popupCloseButtonElement.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);

