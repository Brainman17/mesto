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

  editUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        info
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }


  deleteInitialCards(id) {
    return fetch(this._baseUrl + id, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка:( ${res.status}`))
      .catch(console.log)
  }

  createCard() {
    return fetch(this._baseUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        text
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка, друг: ${res.status}`))
      .catch(console.log)
  }
}



