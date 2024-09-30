import { Button, Checkbox, Modal, Space, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { getValueRoomApi } from "../../redux/roomSlice";
import { phongThueService } from "../../services/phongThue.service";
import { useDispatch, useSelector } from "react-redux";
import { NotificationContext } from "../../App";
import InputCustom from "../../components/FormInput/FormInput";
import { useFormik } from "formik";
const ManageInfoRoom = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleNotification } = useContext(NotificationContext);
  const { listRoom } = useSelector((state) => state.roomSlice);
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
      tenPhong: "",
      khach: 0,
      phongNgu: 0,
      giuong: 0,
      phongTam: 0,
      moTa: "",
      giaTien: 0,
      mayGiat: true,
      banLa: true,
      tivi: true,
      dieuHoa: true,
      wifi: true,
      bep: true,
      doXe: true,
      hoBoi: true,
      banUi: true,
      maViTri: 0,
      hinhAnh: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setIsModalOpen(false);
      phongThueService
        .updateRoom(
          //user.token
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzNDQ0IiwiZW1haWwiOiJ0b255QGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsIm5iZiI6MTcyNzYwMzA3OCwiZXhwIjoxNzI4MjA3ODc4fQ.UoUgPraEvtpJvp9dObRjgalLesPwwgMrPs1AGHzUvSs",
          values.id,
          values
        )
        .then((res) => {
          console.log(res);
          handleNotification("Update thành công", "success");
          dispatch(getValueRoomApi());
        })
        .catch((err) => {
          console.log(err);
          handleNotification(err.response.data.content, "error");
        });
    },
  });
  const showModal = (id) => {
    setIsModalOpen(true);
    phongThueService
      .getRoomById(id)
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
      title: "Room ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "tenPhong",
      key: "tenPhong",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => <img className="h-14" src={text} alt="avatar" />,
    },
    {
      title: "Location",
      key: "maViTri",
      dataIndex: "maViTri",
      align: "center",
    },
    {
      title: "Max Guest ",
      dataIndex: "khach",
      key: "khach",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "giaTien",
      key: "giaTien",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              phongThueService
                .deleteRoom(record.id)
                .then((res) => {
                  console.log(res);
                  handleNotification(res.data.message, "success");
                  dispatch(getValueRoomApi());
                })
                .catch((err) => {
                  console.log(err);
                  handleNotification(
                    err.response.data.message || err.response.data.content,
                    "error"
                  );
                  dispatch(getValueRoomApi());
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
            Edit Room
          </button>
          <Modal
            title="Room Information"
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
            width={800}
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 space-x-2">
                <InputCustom
                  contentLabel={"ID"}
                  name="id"
                  value={values.id}
                  disabled
                />
                <InputCustom
                  classWrapper="col-span-2"
                  contentLabel={"Name"}
                  name="tenPhong"
                  value={values.tenPhong}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.tenPhong}
                  touched={touched.tenPhong}
                />
              </div>
              <div className=" grid space-x-2 grid-cols-4">
                <InputCustom
                  contentLabel={"Max Guest"}
                  name="khach"
                  value={values.khach}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.khach}
                  touched={touched.khach}
                />

                <InputCustom
                  contentLabel={"Bed Room"}
                  value={values.phongNgu}
                  name="phongNgu"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.phongNgu}
                  touched={touched.phongNgu}
                />
                <InputCustom
                  contentLabel={"Bed"}
                  value={values.giuong}
                  name="giuong"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.giuong}
                  touched={touched.giuong}
                />
                <InputCustom
                  contentLabel={"Shower Room"}
                  value={values.phongTam}
                  name="phongTam"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.phongTam}
                  touched={touched.phongTam}
                />
              </div>
              <div className="lg:grid lg:grid-cols-2 lg:space-x-2">
                <InputCustom
                  contentLabel={"Price"}
                  value={values.giaTien}
                  name="giaTien"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.giaTien}
                  touched={touched.giaTien}
                />
                <InputCustom
                  contentLabel={"Location"}
                  value={values.maViTri}
                  name="maViTri"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.maViTri}
                  touched={touched.maViTri}
                />
              </div>

              <div className="grid grid-cols-2">
                <div className="grid grid-cols-1 lg:space-y-3">
                  <Checkbox
                    name="mayGiat"
                    checked={values.mayGiat}
                    onChange={handleChange}
                  >
                    Washing Machine
                  </Checkbox>
                  <Checkbox
                    name="tivi"
                    checked={values.tivi}
                    onChange={handleChange}
                  >
                    TV
                  </Checkbox>
                  <Checkbox
                    name="banLa"
                    checked={values.banLa}
                    onChange={handleChange}
                  >
                    Flat Iron
                  </Checkbox>
                  <Checkbox
                    name="dieuHoa"
                    checked={values.dieuHoa}
                    onChange={handleChange}
                  >
                    Air Conditioner
                  </Checkbox>
                  <Checkbox
                    name="wifi"
                    checked={values.wifi}
                    onChange={handleChange}
                  >
                    Wifi
                  </Checkbox>
                </div>

                <div className="grid grid-cols-1">
                  <Checkbox
                    name="bep"
                    checked={values.bep}
                    onChange={handleChange}
                  >
                    Kitchen
                  </Checkbox>
                  <Checkbox
                    name="hoBoi"
                    checked={values.hoBoi}
                    onChange={handleChange}
                  >
                    Pool
                  </Checkbox>
                  <Checkbox
                    name="doXe"
                    checked={values.doXe}
                    onChange={handleChange}
                  >
                    Parking
                  </Checkbox>
                </div>
              </div>
            </form>
          </Modal>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getValueRoomApi());
  }, []);
  return (
    <div>
      <div className="flex space-x-4 mb-5">
        <Button className="px-4 py-2 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-300">
          Thêm Phòng
        </Button>
        <div className="flex space-x-3">
          <input
            className="w-[280px] border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Nhập tên phòng"
          />
          <button className="px-4 py-2 bg-gray-200 text-gray-800 border-r  text-sx border-gray-300 hover:bg-gray-300 rounded-lg">
            Tìm <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <Table columns={columns} dataSource={listRoom} />
    </div>
  );
};

export default ManageInfoRoom;
