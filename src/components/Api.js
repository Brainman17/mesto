export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }

  editUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name, about
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }

  postCreateCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      'Content-Type': 'application/json',
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }

  deleteInitialCards(id) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers:  this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }

  putLike(id) {
    return fetch(this._baseUrl + '/cards/' + id + '/likes', {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }

  deleteLike(id) {
    return fetch(this._baseUrl + '/cards/' + id + '/likes', {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }

  updateAvatar(id, avatar) {
    return fetch(this._baseUrl + '/cards/' + id + '/likes', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }
}



