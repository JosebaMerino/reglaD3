class DataManager {
  constructor() {

  }

  /**
   * Almacena los datos
   * @param {*} key 
   * @param {*} value 
   */
  setData(key , value) {
    localStorage.setItem(key ,JSON.stringify(value));
  }

  getData(key) {
    let value = localStorage.getItem(key);
    return JSON.parse(value);
  }
}