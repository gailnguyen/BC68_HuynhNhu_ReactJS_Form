import { DatePicker } from "antd";
import { ErrorMessage, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import TableSinhVien from "./TableSinhVien";
import InputCustom from "./InputCustom";
import {
  getValueLocalStorage,
  removeAccentsAndSpaces,
  setValueLocalStorage,
} from "../../utils/util";
import * as yup from "yup";

const ReactForm = () => {
  // tạo mảng bằng useState để render dữ liệu lên giao diện
  const [arrSinhVien, setArrSinhVien] = useState([]);

  // sửa thông tin nhân viên
  const [sinhVien, setSinhVien] = useState();

  // search sinh viên
  const [inputValue, setInputValue] = useState("");

  // truyền dữ liệu mặc định object vào useFormik
  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    setValues,
    handleReset,
    // kiểm tra lỗi input
    errors,
    // kiểm tra xem người dùng đã tương tác với input hay chưa
    touched, // true/false
    // kiểm tra xem người dùng đã thoát khỏi input hay chưa
    handleBlur,
    // thuộc tính isValid check errors của input
    isValid,
  } = useFormik({
    // initialValues giúp lưu trữ dữ liệu của các thẻ input trong form
    // initialValues chứa 1 object vs các thuộc tính có tên trùng với thuộc tính name của các input trong form
    initialValues: {
      mssv: "",
      name: "",
      email: "",
      phone: "",
      gender: "",
      birthday: "",
    },
    // truyền thuộc tính onsubmit để lấy giá trị thông qua phương thức handleSubmit đến từ formik
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      //   let newArrSinhVien = [...arrSinhVien];
      //   newArrSinhVien.push(values);
      //   setArrSinhVien(newArrSinhVien);
      const newArrSinhVien = [...arrSinhVien, values];
      setArrSinhVien(newArrSinhVien);
      setValueLocalStorage("arrSinhVien", newArrSinhVien);
      //   cách reset 1
      //   resetForm();
      //   cách reset 2
      //   setValues({
      //     mssv: "",
      //     name: "",
      //     email: "",
      //     phone: "",
      //     gender: "",
      //     birthday: "",
      //   });
      handleReset();
    },
    // thuộc tính validationSchema của formik
    validationSchema: yup.object({
      mssv: yup
        .string()
        .required("Vui lòng không bỏ trống trường này")
        .length(6, "Vui lòng nhập đúng 6 ký tự"),
      name: yup.string().required("Vui lòng không bỏ trống trường này"),
      email: yup
        .string()
        .email("Vui lòng nhập đúng định dạng email")
        .required("Vui lòng không bỏ trống trường này"),
      phone: yup
        .string()
        .matches(
          /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
          "Vui lòng nhập đúng định dạng số điện thoại Việt Nam"
        )
        .required("Vui lòng không bỏ trống trường này"),
      gender: yup.string().required("Vui lòng không bỏ trống trường này"),
    }),
  });

  // lấy data từ local storage để render lên giao diện mỗi lần ng dùng truy cập
  useEffect(() => {
    const data = getValueLocalStorage("arrSinhVien");
    // kiểm tra sau khi gọi data, nếu có mới render
    data && setArrSinhVien(data);
  }, []);

  // useEffect thứ 2 chạy cùng lúc với setSinhVien re-render lại giao diện, giúp đưa thông tin sinh viên lên input
  useEffect(() => {
    sinhVien && setValues(sinhVien);
  }, [sinhVien]);

  // viết hàm giúp xóa phần tử trong mảng
  const handleDeleteSinhVien = (mssv) => {
    let newArrSinhVien = [...arrSinhVien];
    let index = newArrSinhVien.findIndex((item) => item.mssv == mssv);
    if (index != -1) {
      newArrSinhVien.splice(index, 1);
      setArrSinhVien(newArrSinhVien);
      setValueLocalStorage("arrSinhVien", newArrSinhVien);
    }
  };

  // viết hàm lấy tt sinh viên lên input
  const handleGetInfoSinhVien = (sinhVien) => {
    setSinhVien(sinhVien);
  };

  return (
    <div className="container">
      <h2 className="bg-black text-white text-2xl uppercase p-4 font-bold text-center">
        Thông tin sinh viên
      </h2>
      <div className="my-3">
        {/* form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            {/* mssv */}
            <InputCustom
              contentLabel="Mã số sinh viên"
              placeHolder={"Vui lòng nhập mã số sinh viên"}
              name={"mssv"}
              value={values.mssv}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.mssv}
              touched={touched.mssv}
              disabled
            />
            {/* name */}
            <InputCustom
              contentLabel="Họ và tên"
              placeHolder={"Vui lòng nhập tên sinh viên"}
              name={"name"}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.name}
              touched={touched.name}
            />

            {/* email */}
            <InputCustom
              contentLabel="Địa chỉ email"
              placeHolder={"Vui lòng nhập email"}
              name={"email"}
              value={values.email}
              onChange={handleChange}
              // để kiểm tra đc touched phải truyền vào handleBlur
              onBlur={handleBlur}
              errors={errors.email}
              touched={touched.email}
            />

            {/* phone */}
            <InputCustom
              contentLabel="Số điện thoại"
              placeHolder={"Vui lòng nhập SĐT"}
              name={"phone"}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.phone}
              touched={touched.phone}
            />

            {/* gender */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Giới tính
              </label>
              <select
                name="gender"
                onChange={handleChange}
                value={values.gender}
                onBlur={handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option value="">Chọn giới tính</option>
                <option value="nam">Nam</option>
                <option value="nữ">Nữ</option>
                <option value="khác">Khác</option>
              </select>
              {errors && touched ? (
                <p className="text-red-500 italic mt-1">{errors.gender}</p>
              ) : null}
            </div>

            {/* birthday from antd */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Ngày sinh
              </label>
              <DatePicker
                onChange={(date, dateString) => {
                  console.log(dateString);
                  //   dùng setFieldValue để update dữ liệu cho thuộc tính đc quản lý bởi formik
                  setFieldValue("birthday", dateString);
                }}
                format="DD-MM-YYYY"
              />
            </div>

            {/* action */}
            <div className="space-x-5">
              <button
                type="submit"
                className="py-2 px-5 bg-black text-white rounded-md"
              >
                Thêm sinh viên
              </button>
              <button
                type="button"
                className="py-2 px-5 bg-red-500 text-white rounded-md"
                onClick={() => {
                  resetForm();
                }}
              >
                Reset form
              </button>
              <button
                type="button"
                className="py-2 px-5 bg-green-700 text-white rounded-md"
                onClick={() => {
                  console.log(values);
                  if (!isValid) {
                    return;
                  }
                  // xử lý update dữ liệu
                  // console.log(arrSinhVien);
                  let index = arrSinhVien.findIndex(
                    (item) => item.mssv == values.mssv
                  );
                  console.log(index);
                  if (index != -1) {
                    arrSinhVien[index] = values;
                  }
                  let newArrSinhVien = [...arrSinhVien];
                  setArrSinhVien(newArrSinhVien);
                  setValueLocalStorage("arrSinhVien", newArrSinhVien);
                }}
              >
                Cập nhật sinh viên
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="my-8">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Nhập tên sinh viên"
            required
            onChange={() => {
              setInputValue(event.target.value);
            }}
          />
          <button
            type="button"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
            onClick={() => {
              let keyWord = removeAccentsAndSpaces(inputValue);
              console.log(keyWord);
              console.log(arrSinhVien);
              let arrSinhVienFilter = arrSinhVien.filter((item) => {
                let newSinhVien = removeAccentsAndSpaces(item.name);
                return newSinhVien.includes(keyWord);
              });
              setArrSinhVien(arrSinhVienFilter);
            }}
          >
            Search
          </button>
        </div>
      </div>

      <TableSinhVien
        arrSinhVien={arrSinhVien}
        handleDelete={handleDeleteSinhVien}
        handleGetInfoSinhVien={handleGetInfoSinhVien}
      />
    </div>
  );
};

export default ReactForm;
