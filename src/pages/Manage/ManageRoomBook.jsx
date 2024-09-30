import { useContext, useEffect, useState } from "react";
import { Button, Modal, Space, Table } from "antd";
import InputCustom from "../../components/FormInput/FormInput";
import { datPhongService } from "../../services/datPhong.service";
import { NotificationContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { getBookedRoomApi } from "../../redux/bookRoomSlice";
import { useFormik } from "formik";

const ManageRoomBook = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleNotification } = useContext(NotificationContext);
  const dispatch = useDispatch();
  const { listBookRoom } = useSelector((state) => state.bookRoomSlice);
  const {
    handleBlur,
    handleChange,

    handleSubmit,
    values,
    initialValues,
    setFieldValue,
    setValues,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      id: "",
      maPhong: "",
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: "",
      maNguoiDung: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setIsModalOpen(false);
      datPhongService
        .updateRoomBooked(values.id, values)
        .then((res) => {
          console.log(res);

          handleNotification("Update thành công", "success");
          dispatch(getBookedRoomApi());
        })
        .catch((err) => {
          console.log(err);
          handleNotification("Update thất bại", "error");
        });
    },
  });

  const isFormChanged = () => {
    return values == initialValues;
  };

  const checkChanged = () => {
    if (isFormChanged() == true) {
      handleCancel();
    } else {
      handleSubmit();
    }
  };
  const showModal = (roomId) => {
    setIsModalOpen(true);
    datPhongService
      .getRoomById(roomId)
      .then((res) => {
        console.log(res);
        setValues(res.data.content);
        const comingDay = new Date(res.data.content.ngayDen)
          .toISOString()
          .split("T")[0];
        setFieldValue("ngayDen", comingDay);
        const movingDay = new Date(res.data.content.ngayDi)
          .toISOString()
          .split("T")[0];
        setFieldValue("ngayDi", movingDay);
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
      title: "Mã Nhân Viên",
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
    },
    {
      title: "Mã Phòng",
      dataIndex: "maPhong",
      key: "maPhong",
    },
    {
      title: "Ngày Đến",
      dataIndex: "ngayDen",
      key: "ngayDen",
    },
    {
      title: "Ngày Đi",
      dataIndex: "ngayDi",
      key: "ngayDi",
    },
    {
      title: "Số Lượng Khách",
      dataIndex: "soLuongKhach",
      key: "soLuongKhach",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              datPhongService
                .deleteRoom(record.id)
                .then((res) => {
                  console.log(res);
                  handleNotification(res.data.message, "success");
                  dispatch(getBookedRoomApi());
                })
                .catch((err) => {
                  console.log(err);
                  handleNotification(
                    err.response.data.message || err.response.data.content,
                    "error"
                  );
                  dispatch(getBookedRoomApi());
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
            title="Booked Room Information"
            open={isModalOpen}
            onOk={checkChanged}
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
                contentLabel={"Mã Phòng"}
                name="maPhong"
                value={values.maPhong}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.maPhong}
                touched={touched.maPhong}
              />

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Ngày Đến
                </label>
                <input
                  type="date"
                  name="ngayDen"
                  value={values.ngayDen}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Ngày Đi
                </label>
                <input
                  type="date"
                  name="ngayDi"
                  value={values.ngayDi}
                  onChange={handleChange}
                />
              </div>

              <InputCustom
                contentLabel={"Số lượng khách"}
                value={values.soLuongKhach}
                name="soLuongKhach"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.soLuongKhach}
                touched={touched.soLuongKhach}
              />
              <InputCustom
                contentLabel={"Mã nhân viên"}
                value={values.maNguoiDung}
                name="soLuongKhach"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.maNguoiDung}
                touched={touched.maNguoiDung}
              />
            </form>
          </Modal>
        </Space>
      ),
    },
  ];
  console.log(values);
  useEffect(() => {
    dispatch(getBookedRoomApi());
  }, []);
  return (
    <div className="space-y-3">
      <div>
        <Button className="py-2 px-4 rounded-lg boder border-gray-300 ">
          Đặt phòng
        </Button>
      </div>
      <div className="flex space-x-5">
        <input
          className="w-[280px] border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Tìm theo mã phòng"
        />
        <button className=" border  rounded-lg py-2 px-4 hover:cursor-pointer hover:text-blue-600 hover:border-blue-500 duration-200">
          Search
        </button>
      </div>
      <Table columns={columns} dataSource={listBookRoom} />
    </div>
  );
};

export default ManageRoomBook;
