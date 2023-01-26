export class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate = () => {
    return document.querySelector(this._templateSelector)
    .content.querySelector('.card').cloneNode(true);
  }

  _handleDeleteButtonClick() {
    this._cardTemplate.remove();
  }

  _handleLikeButtonClick() {
    this._buttonLike.classList.toggle('card__heart-button_active');
  }

  _addEventListeners() {
    this._buttonDelete = this._cardTemplate.querySelector('.card__delete-button');
    this._buttonLike = this._cardTemplate.querySelector('.card__heart-button');

    this._buttonDelete.addEventListener('click', () => this._handleDeleteButtonClick());
    this._buttonLike.addEventListener('click', () => this._handleLikeButtonClick());
    this._cardElementImage.addEventListener('click', () => this._handleImageClick(this._data.name, this._data.link));
  }

  generateCard() {
    this._cardTemplate = this._getTemplate();

    this._cardElementImage = this._cardTemplate.querySelector('.card__image');
    this._cardElementTitle = this._cardTemplate.querySelector('.card__subtitle');

    this._cardElementImage.src = this._data.link;
    this._cardElementImage.alt = this._data.name;
    this._cardElementTitle.textContent = this._data.name;

    this._addEventListeners();

    return this._cardTemplate;
  }
}

