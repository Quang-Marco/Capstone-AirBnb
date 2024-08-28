export const notiValidation = {
  empty: "Vui lòng không bỏ trống",
  email: "Vui lòng nhập đúng định dạng email",
  phone:
    "Vui lòng nhập định dạng số điện thoại Việt Nam bắt đầu bằng 0 hoặc +84",
  password:
    "Mật khẩu phải có ít nhất 8 ký tự bao gồm 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 ký tự đặc biệt và không được có dấu",
  min: (minValue) => `Vui lòng nhập tối thiểu ${minValue} ký tự`,
  max: (maxValue) => `Vui lòng nhập tối đa ${maxValue} ký tự`,
};
