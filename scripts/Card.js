export class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  _handleDeleteButtonClick(evt) {
    evt.target.closest('.card').remove();
  }

  _handleLikeButtonClick(evt) {
    evt.target.classList.toggle('card__heart-button_active');
  }

  _addEventListeners() {
    this._element = this._getTemplate();
    this._elementDeleteButton = this._element.querySelector('.card__delete-button');
    this._elementLikeButton = this._element.querySelector('.card__heart-button');
    this._elementImg = this._element.querySelector('.card__image');

    this._elementDeleteButton.addEventListener('click', this._handleDeleteButtonClick);
    this._elementLikeButton.addEventListener('click', this._handleLikeButtonClick);
    this._elementImg.addEventListener('click', () => this._handleImageClick(this._data.name, this._data.link));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector('.card__image');
    this._elementTitle = this._element.querySelector('.card__subtitle');

    this._elementImg.src = this._data.link;
    this._elementImg.alt = this._data.name;
    this._elementTitle.textContent = this._data.name;

    this._addEventListeners();

    return this._element;
  }
}



