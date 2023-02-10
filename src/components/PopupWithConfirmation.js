import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handlePopupFormSubmit) {
    super(popupSelector);

    this._handlePopupFormSubmit = handlePopupFormSubmit;
    this._deleteBtn = this._popup.querySelector('.popup__delete-button');
  }

  open(_id, card) {
    this._card = card;
    this._id = _id;
    super.open();
    }

  setEventListeners() {
    super.setEventListeners();

    this._deleteBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handlePopupFormSubmit(this._id, this._card);
      super.close();
    })
  }
}
