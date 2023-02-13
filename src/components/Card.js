export class Card {
  constructor(
    data,
    templateSelector,
    handleImageClick,
    userId,
    openPopupConfirmation,
    handlePutLike,
    handleDeleteLike
  ) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._userId = userId;
    this._openPopupConfirmation = openPopupConfirmation;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;
  }

  _getTemplate = () => {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  };

  deleteCard() {
    this._cardTemplate.remove();
  }

  _isLiked() {
    if (this._buttonLike.classList.contains("card__heart-button_active")) {
      return true;
    } else {
      return false;
    }
  }

  countLikes(array) {
    this._cardLikeCounter.textContent = array.length;
  }

  handleLikeButtonClick() {
    this._buttonLike.classList.toggle("card__heart-button_active");
  }

  _addEventListeners() {
    this._buttonDelete = this._cardTemplate.querySelector(
      ".card__delete-button"
    );
    this._buttonLike = this._cardTemplate.querySelector(".card__heart-button");

    this._buttonDelete.addEventListener("click", () =>
      this._openPopupConfirmation()
    );
    this._buttonLike.addEventListener("click", () => {
      if (this._isLiked()) {
        this._handleDeleteLike(this._data.id);
      } else {
        this._handlePutLike(this._data.id);
      }
    });
    this._cardElementImage.addEventListener("click", () =>
      this._handleImageClick(this._data.name, this._data.link)
    );
  }

  generateCard() {
    this._cardTemplate = this._getTemplate();

    this._cardLikeCounter = this._cardTemplate.querySelector(
      ".card__like-counter"
    );
    this._cardElementImage = this._cardTemplate.querySelector(".card__image");
    this._cardElementTitle =
      this._cardTemplate.querySelector(".card__subtitle");

    this._cardElementImage.src = this._data.link;
    this._cardElementImage.alt = this._data.name;
    this._cardElementTitle.textContent = this._data.name;

    this._addEventListeners();

    if (this._data.likes.some((like) => like._id === this._userId)) {
      this.handleLikeButtonClick();
    }

    //Сравнить id мой с id ownera
    if (this._userId !== this._data.owner._id) {
      this._buttonDelete.style.display = "none";
    }

    return this._cardTemplate;
  }
}
