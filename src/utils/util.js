// lấy dữ liệu từ local storage
export const getValueLocalStorage = (key) => {
  let dataLocal = localStorage.getItem(key);
  return dataLocal ? JSON.parse(dataLocal) : null;
};

// thay đổi dữ liệu trên local storage
export const setValueLocalStorage = (key, value) => {
  let stringData = JSON.stringify(value);
  localStorage.setItem(key, stringData);
};
