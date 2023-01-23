export class Section {
  constructor({ initialCards, renderer}, wrapSelector) {
    this._initialCards = initialCards;
    this._renderer = renderer;
    this._cardsContainer = document.querySelector(wrapSelector);
  }

  renderItems() {
    this._initialCards.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(cardElement) {
    this._cardsContainer.prepend(cardElement);
  }
}
