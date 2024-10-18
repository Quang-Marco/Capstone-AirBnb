import { useContext, useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { Button, Modal, Space, Table } from "antd";
import { viTriService } from "../../services/viTri.service";
import InputCustom from "../../components/FormInput/FormInput";
import { NotificationContext } from "../../App";
import CreateNewLocation from "./CreateNewLocation";
const ManageInfoLocation = () => {
  const getValueLocationApi = async () => {
    try {
      const response = await viTriService.getLocations();

      return response.data.content;
    } catch (err) {
      handleNotification(err.message, "error");
      throw err;
    }
  };
  const [location, setLocations] = useState([]);
  //call api user
  const fetchLocations = async () => {
    try {
      const locationData = await getValueLocationApi();
      setLocations(locationData);
    } catch {
      handleNotification("Can't get value location API", "error");
    }
  };
  const { user } = useSelector((state) => state.authSlice);
  //search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLocationOpen, setIsModalLocationOpen] = useState(false);
  const [isModalUploadOpen, setIsModalUploadOpen] = useState(false);
  const { handleNotification } = useContext(NotificationContext);

  const [selectedId, setSelectedId] = useState(null);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // Hàm chuyển đổi chuỗi sang dạng không dấu bằng cách thay thế thủ công các ký tự có dấu
  const removeDiacritics = (str) => {
    const diacriticsMap = {
      á: "a",
      à: "a",
      ả: "a",
      ã: "a",
      ạ: "a",
      ă: "a",
      ắ: "a",
      ằ: "a",
      ẳ: "a",
      ẵ: "a",
      ặ: "a",
      â: "a",
      ấ: "a",
      ầ: "a",
      ẩ: "a",
      ẫ: "a",
      ậ: "a",
      é: "e",
      è: "e",
      ẻ: "e",
      ẽ: "e",
      ẹ: "e",
      ê: "e",
      ế: "e",
      ề: "e",
      ể: "e",
      ễ: "e",
      ệ: "e",
      í: "i",
      ì: "i",
      ỉ: "i",
      ĩ: "i",
      ị: "i",
      ó: "o",
      ò: "o",
      ỏ: "o",
      õ: "o",
      ọ: "o",
      ô: "o",
      ố: "o",
      ồ: "o",
      ổ: "o",
      ỗ: "o",
      ộ: "o",
      ơ: "o",
      ớ: "o",
      ờ: "o",
      ở: "o",
      ỡ: "o",
      ợ: "o",
      ú: "u",
      ù: "u",
      ủ: "u",
      ũ: "u",
      ụ: "u",
      ư: "u",
      ứ: "u",
      ừ: "u",
      ử: "u",
      ữ: "u",
      ự: "u",
      ý: "y",
      ỳ: "y",
      ỷ: "y",
      ỹ: "y",
      ỵ: "y",
      đ: "d",
      Á: "A",
      À: "A",
      Ả: "A",
      Ã: "A",
      Ạ: "A",
      Ă: "A",
      Ắ: "A",
      Ằ: "A",
      Ẳ: "A",
      Ẵ: "A",
      Ặ: "A",
      Â: "A",
      Ấ: "A",
      Ầ: "A",
      Ẩ: "A",
      Ẫ: "A",
      Ậ: "A",
      É: "E",
      È: "E",
      Ẻ: "E",
      Ẽ: "E",
      Ẹ: "E",
      Ê: "E",
      Ế: "E",
      Ề: "E",
      Ể: "E",
      Ễ: "E",
      Ệ: "E",
      Í: "I",
      Ì: "I",
      Ỉ: "I",
      Ĩ: "I",
      Ị: "I",
      Ó: "O",
      Ò: "O",
      Ỏ: "O",
      Õ: "O",
      Ọ: "O",
      Ô: "O",
      Ố: "O",
      Ồ: "O",
      Ổ: "O",
      Ỗ: "O",
      Ộ: "O",
      Ơ: "O",
      Ớ: "O",
      Ờ: "O",
      Ở: "O",
      Ỡ: "O",
      Ợ: "O",
      Ú: "U",
      Ù: "U",
      Ủ: "U",
      Ũ: "U",
      Ụ: "U",
      Ư: "U",
      Ứ: "U",
      Ừ: "U",
      Ử: "U",
      Ữ: "U",
      Ự: "U",
      Ý: "Y",
      Ỳ: "Y",
      Ỷ: "Y",
      Ỹ: "Y",
      Ỵ: "Y",
      Đ: "D",
    };

    return str.replace(
      /[^A-Za-z0-9\s]/g,
      (match) => diacriticsMap[match] || match
    );
  };

  const handleSearchSubmit = () => {
    const searchTerms = removeDiacritics(searchTerm)
      .toLowerCase()
      .split(" ")
      .filter((term) => term); // Loại bỏ khoảng trắng thừa

    const results = location.filter((loc) => {
      const tenViTri = removeDiacritics(loc.tenViTri.toLowerCase());
      const tinhThanh = removeDiacritics(loc.tinhThanh.toLowerCase());
      const quocGia = removeDiacritics(loc.quocGia.toLowerCase());

      // Kiểm tra xem tất cả các từ trong searchTerms có xuất hiện trong tenViTri, tinhThanh hoặc quocGia hay không
      return searchTerms.every(
        (term) =>
          tenViTri.includes(term) ||
          tinhThanh.includes(term) ||
          quocGia.includes(term)
      );
    });

    setSearchResults(results);
    setIsSearching(true);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsSearching(false);
  };
  const handleSelectedId = (id) => {
    setSelectedId(id);
  };
  const [uploadImage, setUploadImage] = useState(null);
  const [errorImage, setErrorImage] = useState("");
  const inputFileRef = useRef(null);

  const handleSubmitImage = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (uploadImage) {
      formData.append("formFile", uploadImage.img);
      viTriService
        .uploadImageLocation(selectedId, formData, user.token)
        .then(() => {
          handleNotification("Upload avatar successfully", "success");
          setIsModalUploadOpen(false);
          fetchLocations();
          setUploadImage(null);
          setErrorImage("");
          inputFileRef.current.value = "";
        })
        .catch((err) => {
          handleNotification(err.message, "error");
          fetchLocations();
          setUploadImage(null);
          setErrorImage("");
          inputFileRef.current.value = "";
        });
    }
  };

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
    },
    onSubmit: (values) => {
      viTriService
        .updateLocation(values.id, values, user.token)
        .then(() => {
          handleNotification("Update thành công", "success");
          setIsModalOpen(false);
          fetchLocations();
        })
        .catch(() => {
          handleNotification("Update thất bại", "error");
          setIsModalOpen(true);
          fetchLocations();
        });
    },
  });
  const showModal = (id) => {
    setIsModalOpen(true);
    viTriService
      .getLocationsById(id)
      .then((res) => {
        setValues(res.data.content);
      })
      .catch((err) => {
        handleNotification(err.message, "error");
      });
  };
  const showCreateNewLocationModal = () => {
    setIsModalLocationOpen(true);
  };
  const showUploadImageModal = () => {
    setIsModalUploadOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalLocationOpen(false);
    setIsModalUploadOpen(false);
    fetchLocations();
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
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => <img className="h-20 w-24" src={text} alt="avatar" />,
    },
    {
      title: "Province",
      key: "tinhThanh",
      dataIndex: "tinhThanh",
    },
    {
      title: "Nation",
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
                .deleteLocation(record.id, user.token)
                .then((res) => {
                  handleNotification(res.data.message, "success");
                  fetchLocations();
                })
                .catch((err) => {
                  handleNotification(
                    err.response.data.message || err.response.data.content,
                    "error"
                  );
                  fetchLocations();
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
            title="Location Information"
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
            okText="Update"
            centered
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
          <button
            onClick={() => {
              showUploadImageModal(true);
              handleSelectedId(record.id);
            }}
            className="bg-green-500 text-white py-2 px-5 rounded-md hover:bg-yellow-500/80 duration-300"
          >
            Upload Image
          </button>
          <Modal
            open={isModalUploadOpen}
            okButtonProps={{ style: { display: "none" } }}
            onCancel={handleCancel}
            centered
          >
            <div>
              <form onSubmit={handleSubmitImage} className="space-y-2">
                <h2 className="text-2xl">Upload Image Location</h2>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Choose an image
                  </label>
                  <input
                    accept="image/png, image/jpeg"
                    type="file"
                    ref={inputFileRef}
                    onChange={(e) => {
                      const img = e.target.files[0];
                      if (img) {
                        if (img.size > 1024 * 1024) {
                          setErrorImage("Vui lòng upload hình ảnh dưới 1mb ");
                          return;
                        }
                        const imgURL = URL.createObjectURL(img);
                        setUploadImage({ img, imgURL });
                      }
                    }}
                  />
                </div>
                <p className="text-red-500">{errorImage}</p>
                {uploadImage ? (
                  <img
                    className="w-32"
                    src={uploadImage?.imgURL}
                    alt="avatar"
                  />
                ) : null}
                <button
                  type="submit"
                  className="py-2 px-5 bg-green-700 text-white rounded-md hover:bg-green-600 duration-300"
                >
                  Upload
                </button>
                <button
                  onClick={() => {
                    setUploadImage(null);
                    setErrorImage("");
                    inputFileRef.current.value = "";
                  }}
                  className="py-2 px-5 ml-5 bg-red-600 text-white rounded-md hover:bg-red-500 duration-300"
                >
                  Delete
                </button>
              </form>
            </div>
          </Modal>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:space-y-3 md:flex-row md:space-y-0 md:space-x-4 mb-5">
        <Button
          onClick={showCreateNewLocationModal}
          className="w-full sm:w-auto px-4 py-2  mb-2  bg-gray-200 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-300"
        >
          Add Location
        </Button>
        <Modal
          title={"Add Location"}
          open={isModalLocationOpen}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={handleCancel}
          centered
        >
          <CreateNewLocation />
        </Modal>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 w-full">
          <input
            className="w-full sm:w-[280px] border border-gray-300 px-4 py-2 rounded-lg "
            type="text"
            placeholder="Search by Location's Name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            onClick={handleSearchSubmit}
            className="px-4 py-2 bg-gray-200 text-gray-800 border-r text-sx border-gray-300 hover:bg-gray-300 rounded-lg w-full sm:w-auto"
          >
            Search <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          {isSearching && (
            <button
              onClick={handleResetSearch}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full sm:w-auto"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={isSearching ? searchResults : location}
        scroll={{ x: "100%" }}
      />
    </div>
  );
};

export default ManageInfoLocation;
