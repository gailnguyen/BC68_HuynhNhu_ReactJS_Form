import React from "react";
import { Space, Table, Tag } from "antd";

const TableSinhVien = ({
  arrSinhVien,
  handleDelete,
  handleGetInfoSinhVien,
}) => {
  const columns = [
    {
      title: "Mã số sinh viên",
      dataIndex: "mssv",
      key: "mssv",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Giới tính",
      key: "gender",
      dataIndex: "gender",
      render: (text) => {
        let colorTag =
          text == "nam" ? "geekblue" : text == "nữ" ? "volcano" : "green";
        return <Tag color={colorTag}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Thao tác",
      render: (record) => {
        return (
          <>
            <button
              onClick={() => {
                handleDelete(record.mssv);
              }}
              className="py-2 px-5 bg-red-500 text-white rounded-md"
            >
              Xóa
            </button>
            <button
              onClick={() => {
                handleGetInfoSinhVien(record);
              }}
              className="py-2 px-5 bg-blue-700 text-white rounded-md ml-3"
            >
              Sửa
            </button>
          </>
        );
      },
    },
  ];
  return <Table columns={columns} dataSource={arrSinhVien} />;
};

export default TableSinhVien;
