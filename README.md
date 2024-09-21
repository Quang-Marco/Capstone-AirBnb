Node v20.14.0

# Libraries:

- Antd để xây dựng UI
- Swiper để xây dựng Carousel
- Tailwind CSS & SASS
- Axios để call API
- Formik và Yup để quản lý form và validation
- Lottie-react để quản lý animation.json
- Redux-toolkit & React-redux
- React-router-dom v6
- React-toastify để thông báo lỗi
- React-i18next và i18next để quản lý đa ngôn ngữ
- React-scroll-to-top để cuộn lên đầu trang

# Base:

- Fonts
- Libraries
- Hooks: useResponsive, useDebounce, useRoutes,...
- Components: Form-Input,...
- Redux - data API tái sử dụng (listRooms,..)
- useContext - data tĩnh tái sử dụng: notification,...

# Clean code & optimize code:

- Tự tin dùng icons pro của fontawesome, sử dụng className
- map() luôn có key
- Sử dụng tiếng Anh
- Data lưu trữ dưới dạng mảng list...
- KHÔNG DÙNG thẻ a, thay thế bằng Link, NavLink, useNavigate
- HẠN CHẾ dùng position
- Responsive nhanh chóng bằng Tailwind đối với grid, text, margin,...

# Chia nhánh theo feature (tính năng):

- Nhánh chính (main/master)
- Nhánh phát triển (dev)
- Nhánh tính năng (feature):

  - Feature/HomePage - Quang
  - Feature/RoomDetails - Như
  - Feature/user-authentication (Login, Register, Validation,...) - Như
  - Feature/user-profile (thông tin cá nhân, chỉnh sửa thông tin, phòng đã đặt) - Quang
  - Feature/Admin (Quản lý người dùng, quản lý thông tin vị trí, quản lý thông tin phòng, quản lý đặt phòng) - Lực
  - Feature/Localization (i18n)

# Clone repo

git clone <repo-url>

# Checkout sang nhánh được giao

git checkout feature/<tên_nhánh>

# Đẩy code lên nhánh tính năng

- git add .
- git commit -m "Update feature"
- git push origin feature/<tên_nhánh>
