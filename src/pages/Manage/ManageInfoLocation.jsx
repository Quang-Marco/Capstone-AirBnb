import { useContext, useEffect, useState } from "react";
import { getViTriApi } from "../../redux/viTriSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Button, Modal, Space, Table } from "antd";
import { viTriService } from "../../services/viTri.service";
import InputCustom from "../../components/FormInput/FormInput";
import { NotificationContext } from "../../App";
const ManageInfoLocation = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleNotification } = useContext(NotificationContext);
  const { listViTri } = useSelector((state) => state.viTriSlice);
  const {
    handleBlur,
    handleChange,

    handleSubmit,
    values,
    // setFieldValue,
    setValues,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      id: "",
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setIsModalOpen(false);
      viTriService
        .updateViTri(values.id, values)
        .then((res) => {
          console.log(res);
          handleNotification("Update thành công", "success");
          dispatch(getViTriApi());
        })
        .catch((err) => {
          console.log(err);
          handleNotification("Update thất bại", "error");
        });
    },
  });
  const showModal = (id) => {
    setIsModalOpen(true);
    viTriService
      .getViTriById(id)
      .then((res) => {
        console.log(res);
        setValues(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "tenViTri",
      key: "tenViTri",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => <img className="h-14" src={text} alt="avatar" />,
    },
    {
      title: "Tỉnh Thành",
      key: "tinhThanh",
      dataIndex: "tinhThanh",
    },
    {
      title: "Quốc Gia",
      dataIndex: "quocGia",
      key: "quocGia",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              viTriService
                .deleteUser(record.id)
                .then((res) => {
                  console.log(res);
                  handleNotification(res.data.message, "success");
                  dispatch(getViTriApi());
                })
                .catch((err) => {
                  console.log(err);
                  handleNotification(
                    err.response.data.message || err.response.data.content,
                    "error"
                  );
                  dispatch(getViTriApi());
                });
            }}
            className="bg-red-500 text-white py-2 px-5 rounded-md hover:bg-red-500/80 duration-300"
          >
            Delete
          </button>
          <button
            onClick={() => {
              showModal(record.id);
            }}
            className="bg-yellow-500 text-white py-2 px-5 rounded-md hover:bg-yellow-500/80 duration-300"
          >
            Edit Info
          </button>
          <Modal
            title="User Information"
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <InputCustom
                contentLabel={"ID"}
                name="id"
                value={values.id}
                disabled
              />

              <InputCustom
                contentLabel={"Name"}
                name="tenViTri"
                value={values.tenViTri}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.tenViTri}
                touched={touched.tenViTri}
              />

              <InputCustom
                contentLabel={"Province"}
                value={values.tinhThanh}
                name="tinhThanh"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.tinhThanh}
                touched={touched.tinhThanh}
              />

              <InputCustom
                contentLabel={"Nation"}
                value={values.quocGia}
                name="quocGia"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.quocGia}
                touched={touched.quocGia}
              />
            </form>
          </Modal>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getViTriApi());
  }, []);
  return (
    <div>
      <div className="flex space-x-4 mb-5">
        <Button className="px-4 py-2 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-300">
          Thêm địa điểm
        </Button>
        <div className="flex space-x-3">
          <input
            className="w-[280px] border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Nhập tên địa điểm"
          />
          <button className="px-4 py-2 bg-gray-200 text-gray-800 border-r  text-sx border-gray-300 hover:bg-gray-300 rounded-lg">
            Tìm <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <Table columns={columns} dataSource={listViTri} />
    </div>
  );
};

export default ManageInfoLocation;
