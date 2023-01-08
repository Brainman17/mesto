export class Card {
  constructor(item, templateSelector, openPopup) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardTemplate = document
    .querySelector(this._templateSelector)
    .content.querySelector('.card')
    .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImg = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__subtitle');
    this._deleteButton = this._card.querySelector('.card__delete-button');
    this._likeButton = this._card.querySelector('.card__heart-button');

    this._cardTitle.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

    this._deleteButton.addEventListener('click', this._handleDeleteButtonClick); // слушатель клика по кнопке удаления
    this._likeButton.addEventListener('click', this._handleLikeButtonClick); // слушатель клика лайка
    this._cardImg.addEventListener('click', this._handleCardClick); // слушатель клика открытия карточки

    return this._card;
  }

  _handleCardClick = (e) => {
    this._popupCard = document.querySelector('.popup__card');
    this._popupCardSubtitle = document.querySelector('.popup__card-subtitle');
    this._popupCardImage = document.querySelector('.popup__card-img');

    this._popupCardImage.src = e.target.src;
    this._popupCardImage.alt = e.target.alt;
    this._popupCardSubtitle.textContent = e.target.alt;

    this._openPopup(this._popupCard);
  }

  _handleLikeButtonClick = (e) => {
    e.target.classList.toggle('card__heart-button_active');
  }

  _handleDeleteButtonClick = (e) => {
    e.target.closest('.card').remove();
  }

}


