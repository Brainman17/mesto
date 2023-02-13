import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupCardImage = this._popup.querySelector(".popup__card-img");
    this._popupCardSubtitle = this._popup.querySelector(".popup__card-subtitle");
  }

  open(caption, src) {
    this._popupCardSubtitle.textContent = caption;
    this._popupCardImage.alt = caption;
    this._popupCardImage.src = src;

    super.open();
  }
}
