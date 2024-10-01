import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker, Space } from "antd";
import "./bookingPicker.scss";
import { datPhongService } from "../../services/datPhong.service";
import { NotificationContext } from "../../App";

const { RangePicker } = DatePicker;

const BookingForm = ({ roomPrice, roomId }) => {
  const { handleNotification } = useContext(NotificationContext);
  const [bookingDays, setBookingDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const handleDateChange = (date, dateStrings, setFieldValue) => {
    const checkinDate = new Date(dateStrings[0]);
    const checkoutDate = new Date(dateStrings[1]);

    if (checkinDate && checkoutDate) {
      const timeRange = checkoutDate - checkinDate;
      const numberOfDays = timeRange / (1000 * 60 * 60 * 24);
      const finalPrice = numberOfDays * roomPrice + 5 + 7;
      console.log(numberOfDays);
      setBookingDays(numberOfDays);
      setTotalPrice(numberOfDays * roomPrice);
      setFinalPrice(finalPrice);
    }

    setFieldValue("checkin", dateStrings[0]);
    setFieldValue("checkout", dateStrings[1]);
  };

  const guestPicker = [
    {
      title: "Adults",
      field: "adults",
      age: "Age 13+",
      minValue: 0,
    },
    {
      title: "Children",
      field: "children",
      age: "Age 2-12",
      minValue: 0,
    },
    {
      title: "Infants",
      field: "infants",
      age: "Under 2",
      minValue: 0,
    },
    {
      title: (
        <div>
          Pets <br />{" "}
          <span className="underline text-sm">Bringing a service animal?</span>
        </div>
      ),
      field: "pets",
      age: "",
      minValue: 0,
    },
  ];
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const toggleDropdown = () => {
    setIsGuestPickerOpen(!isGuestPickerOpen);
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      checkin: "",
      checkout: "",
      adults: 1,
      children: 0,
      infants: 0,
      pets: 0,
    },
    validationSchema: Yup.object({
      checkin: Yup.date().required("Check-in date is required"),
      checkout: Yup.date()
        .min(Yup.ref("checkin"), "Check-out date must be after check-in")
        .required("Check-out date is required"),
    }),
    onSubmit: (values) => {
      console.log("Booking values:", values);
      datPhongService
        .bookRoom({
          maPhong: roomId,
          ngayDen: values.checkin,
          ngayDi: values.checkout,
          soLuongKhach: values.adults,
        })
        .then((res) => {
          console.log(res);
          handleNotification("Complete booking successfully", "success");
        })
        .catch((err) => {
          console.log(err);
          handleNotification("Fail to book this room", "error");
        });
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="bookingPicker w-full max-w-lg mx-auto"
    >
      {/* Date Picker */}
      <div className="flex justify-between">
        {errors.checkin && touched.checkin && (
          <p className="text-red-500 text-xs mb-2 italic">*{errors.checkin}</p>
        )}
        {errors.checkout && touched.checkout && (
          <p className="text-red-500 text-xs mb-2 italic">*{errors.checkout}</p>
        )}
      </div>
      <Space direction="vertical" size={12}>
        <RangePicker
          placeholder={["CHECK-IN", "CHECK-OUT"]}
          onChange={(date, dateStrings) =>
            handleDateChange(date, dateStrings, setFieldValue)
          }
          className="date-range-style"
        />
      </Space>

      {/* Guest Picker */}
      <div className="guestPicker">
        <button
          onClick={toggleDropdown}
          className="dropdown-button font-semibold text-sm text-left border w-full rounded-b-lg"
          style={{ padding: "10px" }}
        >
          GUESTS
          <span className={isGuestPickerOpen ? "arrow-up" : "arrow-down"}>
            {" "}
            ▼{" "}
          </span>
          <div>
            {values.adults !== 0 ? (
              <span className="text-gray-500 text-xs">
                {values.adults} adults
              </span>
            ) : null}
            {values.children !== 0 ? (
              <span className="text-gray-500 text-xs">
                , {values.children} children
              </span>
            ) : null}
            {values.infants !== 0 ? (
              <span className="text-gray-500 text-xs">
                , {values.infants} infants
              </span>
            ) : null}
            {values.pets !== 0 ? (
              <span className="text-gray-500 text-xs">
                , {values.pets} pets
              </span>
            ) : null}
          </div>
        </button>

        {isGuestPickerOpen && (
          <div className="guestDropdown p-3">
            {guestPicker.map((item, index) => {
              return (
                <div
                  key={index}
                  className="guest-option flex justify-between mb-4"
                >
                  <div>
                    <span className="font-semibold">{item.title}</span> <br />
                    {item.age && (
                      <span className="text-gray-500 text-sm">{item.age}</span>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          item.field,
                          Math.max(item.minValue, values[item.field] - 1)
                        )
                      }
                      disabled={values[item.field] <= item.minValue}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{values[item.field]}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue(item.field, values[item.field] + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="text-sm text-gray-500">
              This place has a maximum of 2 guests, not including infants. If
              you're bringing more than 2 pets, please let your Host know.
            </div>
            <button
              onClick={() => {
                setIsGuestPickerOpen(false);
              }}
              className="underline block font-semibold"
              style={{ textAlign: "right" }}
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#DB0B64] text-white rounded-md cursor-pointer font-semibold mt-5"
        style={{ padding: "12px 0" }}
      >
        Reserve
      </button>

      {/* Booking Summary */}
      <span className="block text-center text-base mt-3">
        You won't be charged yet
      </span>
      <div>
        <div className="py-6" style={{ lineHeight: "2" }}>
          <div className="flex justify-between">
            <span className="underline">
              ${roomPrice} x {bookingDays} night
            </span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Cleaning fee</span>
            <span>{totalPrice ? "$5" : "$0"}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Airbnb service fee</span>
            <span>{totalPrice ? "$7" : "$0"}</span>
          </div>
        </div>
        <div className="flex justify-between font-semibold border-t py-5">
          <span>Total</span>
          <span>${finalPrice}</span>
        </div>
      </div>
    </form>
  );
};
export default BookingForm;
