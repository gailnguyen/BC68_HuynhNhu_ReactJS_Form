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

// hàm bỏ dấu
export const removeAccentsAndSpaces = (str) => {
  return str
    .normalize("NFD") // Chuẩn hóa chuỗi Unicode
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .replace(/\s+/g, "") // Loại bỏ khoảng cách
    .toLowerCase(); // Chuyển tất cả các ký tự thành chữ thường
};
