export class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate = () => {
    return document.querySelector(this._templateSelector)
    .content.querySelector('.card');

  }

  _handleDeleteButtonClick(evt) {
    evt.target.closest('.card').remove();
  }

  _handleLikeButtonClick(evt) {
    evt.target.classList.toggle('card__heart-button_active');
  }

  _addEventListeners() {
    const cardElementDeleteButton = this._cardElement.querySelector('.card__delete-button');
    const cardElementLikeButton = this._cardElement.querySelector('.card__heart-button');

    cardElementDeleteButton.addEventListener('click', this._handleDeleteButtonClick);
    cardElementLikeButton.addEventListener('click', this._handleLikeButtonClick);
    this._cardElementImage.addEventListener('click', () => this._handleImageClick(this._data.name, this._data.link));

  }

  generateCard() {
    const cardTemplate = this._getTemplate();

    this._cardElement = cardTemplate.cloneNode(true);

    this._cardElementImage = this._cardElement.querySelector('.card__image');
    this._cardElementTitle = this._cardElement.querySelector('.card__subtitle');


    this._cardElementImage.src = this._data.link;
    this._cardElementImage.alt = this._data.name;
    this._cardElementTitle.textContent = this._data.name;

    this._addEventListeners();

    return this._cardElement;
  }
}

