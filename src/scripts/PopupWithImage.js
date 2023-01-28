import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupCardImage, popupCardSubtitle) {
    this._popupCardImage = popupCardImage;
    this._popupCardSubtitle = popupCardSubtitle;
  }

  open(caption, src) {
    this._popupCardImage = this._popup.querySelector(".popup__card-img");
    this._popupCardSubtitle = this._popup.querySelector(".popup__card-subtitle");

    this._popupCardSubtitle.textContent = caption;
    this._popupCardImage.alt = caption;
    this._popupCardImage.src = src;

    super.open();
  }
}
