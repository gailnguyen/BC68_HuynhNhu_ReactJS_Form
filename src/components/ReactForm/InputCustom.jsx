import React from "react";

const InputCustom = ({
  contentLabel,
  placeHolder,
  name,
  value,
  onChange,
  // kiểm tra ng dùng đã bấm vào hay chưa
  // validation input
  onBlur,
  // errors và touched là 1 object
  errors,
  touched,
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {contentLabel}
      </label>
      <input
        type="text"
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
          errors && touched ? "border-red-500" : "focus:border-blue-500"
        }`}
        placeholder={placeHolder}
        name={name}
        // truyền phương thức handleChange để lấy dữ liệu
        onChange={onChange}
        // truyền dữ liệu mặc định vào input
        value={value}
        onBlur={onBlur}
      />
      {/* viết tt điều kiện để ktra nếu error vs touched đc truyền vào mới hiện thị thẻ p thông báo lỗi */}
      {errors && touched && (
        <p className="text-red-500 italic mt-1">{errors}</p>
      )}
    </div>
  );
};

export default InputCustom;
