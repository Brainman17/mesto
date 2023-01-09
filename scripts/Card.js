export class Card {
  constructor(data, templateSelector, openPopup) {
    this._title = data.title;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content('.card')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector('.card__image');
    this._elementTitle = this._element.querySelector('.card__subtitle');
    this._elementDeleteButton = this._element.querySelector('.card__delete-button');
    this._elementLikeButton = this._element.querySelector('.card__heart-button');

    this._elementDeleteButton.addEventListener('click', _handleDeleteButtonClick());
    this._elementLikeButton.addEventListener('click', _handleLikeButtonClick());
    this._elementImg.addEventListener('click', _handleCardClick());

    this._handleCardClick();
    this._handleLikeButtonClick();
    this._handleDeleteButtonClick();

    this._elementImg.src = this._link;
    this._elementImg.alt = this._title;
    this._elementTitle.textContent = this._title;

    return this._element;
  }

  _handleCardClick = (e) => {
    const popupCard = this._element.querySelector('.popup_card');

    this._element.querySelector('.popup__card-subtitle').textContent = e.target.alt;
    this._element.querySelector('.popup__card-img').src = e.target.src;
    this._element.querySelector('.popup__card-img').alt = e.target.alt;

    this._openPopup(popupCard);
  }

  _handleDeleteButtonClick() {
    this._element.querySelector('.card__delete-button').closest('.card').remove();
  }

  _handleLikeButtonClick() {
    this._element.querySelector('.card__heart-button').classList.toggle('card__heart-button_active');
  }
}



