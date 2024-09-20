Node v20.14.0

Libraries:

- Antd để xây dựng UI
- Tailwind CSS & SASS
- Axios để call API
- Formik và Yup để quản lý form và validation
- Lottie-react để quản lý animation.json
- Redux-toolkit & React-redux
- React-router-dom v6
- React-toastify để thông báo lỗi
- React-i18next và i18next để quản lý đa ngôn ngữ

Base:

- Fonts
- Redux/useContext
- Hooks: useResponsive, useDebounce, useRoutes,...
- Components: Form-Input,...
- Libraries

Clean code & optimize code:

- Tự tin dùng icons pro của fontawesome, sử dụng className
- map() luôn có key
- Sử dụng tiếng Anh
- Data lưu trữ dưới dạng mảng list...
- KHÔNG DÙNG thẻ a, thay thế bằng Link, NavLink, useNavigate
- HẠN CHẾ dùng position
- Responsive nhanh chóng bằng Tailwind đối với grid, text, margin,...

Chia nhánh theo feature (tính năng):

- Nhánh chính (main/master)
- Nhánh phát triển (dev)
- Nhánh tính năng (feature):
  - Feature/HomePage
  - Feature/RoomDetails
  - Feature/user-authentication (Login, Register, Validation,...)
  - Feature/user-profile (thông tin cá nhân, chỉnh sửa thông tin, phòng đã đặt)
  - Feature/Admin (Quản lý người dùng, quản lý thông tin vị trí, quản lý thông tin phòng, quản lý đặt phòng)
  - Feature/Localization (i18n)
