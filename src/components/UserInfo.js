export class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._job = document.querySelector(userJobSelector);
    this._avatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return { name: this._name.textContent, about: this._job.textContent };
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._job.textContent = about;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
