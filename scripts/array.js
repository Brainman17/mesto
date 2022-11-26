const initialCards = [
  {
    name: 'Архыз',
    link: 'http://127.0.0.1:5500/images/dombay.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createElement(item) {
  const template = `
    <article class="card">
    <img src:${item.link} alt="Домбай" class="card__image" />
    <button class="card__delete-button" type="button"></button>
    <div class="card__wrapper">
      <h2 class="card__subtitle">${item.name}</h2>
      <button class="card__heart-button" type="button"></button>
    </div>
    </article>
  `

  // console.log(template)
}

initialCards.forEach(function(item) {
  createElement(item);
})
