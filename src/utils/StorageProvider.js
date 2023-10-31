export default class StorageProvider {
  static get(key) {
    if (!key || !typeof key) {
      return null;
    }

    const allCookies = document.cookie.split(';');
    const resultCookies = allCookies
      .map((cookie) => {
        const split = cookie.split('=').map((data) => data.trim());
        if (split[0] === key) {
          return JSON.parse(decodeURIComponent(split[1]) || '');
        }
        return false;
      })
      .filter((e) => Boolean(e));

    return resultCookies.length ? resultCookies[0] : null;
  }

  static set(key, value) {
    const expiryTime = StorageProvider.getExpiryTime();
    const keyString = key.toString();
    const valueString = JSON.stringify(value);
    const cookie = `${keyString}=${valueString};${expiryTime};Path=/;'`;
    document.cookie = cookie;
  }

  static removeItem(key) {
    if (!key) {
      return false;
    }
    // setting previous time to expires will delete cookie.
    document.cookie = `${key}=;Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=site.com;`;
    return true;
  }

  static deleteAll() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      StorageProvider.removeItem(name);
    }
  }

  static getExpiryTime() {
    const d = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    d.setTime(d.getTime() + oneDay * 50);
    return `expires=${d.toUTCString()};`;
  }
}
