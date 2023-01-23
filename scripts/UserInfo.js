export class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._description = document.querySelector(userDescriptionSelector);
    console.log(this._description);
    console.log(this._name)
  }

  getUserInfo() {
    return { name: this._name.textContent, description: this._description.textContent };
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
