import StorageProvider from "./StorageProvider";

const AUTH = "AUTH";

export default class SessionProvider {
  constructor() {
    this.extendSession = this.extendSession.bind(this);
    this.storage = window.sessionStorage;
  }

  static createSession(obj) {
    StorageProvider.set(AUTH, obj);
  }

  static getSession() {
    const obj = StorageProvider.get(AUTH);
    if (obj) {
      return obj;
    }
    return null;
  }

  static getSessionVal(key) {
    const obj = StorageProvider.get(AUTH);
    if (obj) {
      return obj[key];
    }
    return null;
  }

  static isAuthenticated() {
    return SessionProvider.getSessionVal("isVerified");
  }

  static getEmail() {
    return SessionProvider.getSessionVal("email");
  }

  static getUserName() {
    return SessionProvider.getSessionVal("userName");
  }

  static getToken() {
    return SessionProvider.getSessionVal("jwToken");
  }

  static getID() {
    return SessionProvider.getSessionVal("id");
  }

  static getRoles() {
    return SessionProvider.getSessionVal("roles");
  }

  static deleteSession() {
    if (StorageProvider.get(AUTH)) {
      StorageProvider.deleteAll();
    }
  }

  static extendSession() {
    const session = StorageProvider.get(AUTH);
    StorageProvider.set(AUTH, session);
  }

  static removeItem(key) {
    return this.storage.removeItem(key);
  }
}
