export class Section {
  constructor({ renderer }, wrapSelector) {
    this._renderer = renderer;
    this._cardsContainer = document.querySelector(wrapSelector);
  }

  renderItems(items) {
    items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(cardElement) {
    this._cardsContainer.prepend(cardElement);
  }
}
