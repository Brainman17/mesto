import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
   open(caption, src) {
    const popupCardImage = this._popup.querySelector(".popup__card-img");
    const popupCardSubtitle = this._popup.querySelector(".popup__card-subtitle");

    popupCardSubtitle.textContent = caption;
    popupCardImage.alt = caption;
    popupCardImage.src = src;

    super.open();
   }
}
