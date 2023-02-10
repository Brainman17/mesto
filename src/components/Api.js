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
        name: name,
        about: about
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }

  postCreateCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }

  deleteInitialCards(_id) {
    return fetch(this._baseUrl + '/cards/' + _id, {
      method: 'DELETE',
      headers:  this._headers
    })
      .then(res => {
        return res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`)
      })
      .catch(console.log)
  }

  putLike(_id) {
    return fetch(this._baseUrl + '/cards/' + _id + '/likes', {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }

  deleteLike(_id) {
    return fetch(this._baseUrl + '/cards/' + _id + '/likes', {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }

  updateAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }
}



