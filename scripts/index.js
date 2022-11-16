const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const popupSaveButtonElement = popupElement.querySelector('.popup__save-button');

popupEditButtonElement.addEventListener('click', function() {
  popupElement.classList.add('popup_opened');
});

popupCloseButtonElement.addEventListener('click', function() {
  popupElement.classList.remove('popup_opened');
})

popupSaveButtonElement.addEventListener('click', function() {
  popupElement.classList.remove('popup_opened');
})

const formElement = popupElement.querySelector('.popup__form-content');
const nameInput = formElement.querySelector('.popup__form-subtitle_value_name');
const jobInput = formElement.querySelector('.popup__form-subtitle_value_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');


function formSubmitHandler (evt) {
    evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
