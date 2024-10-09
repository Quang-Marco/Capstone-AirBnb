import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      header: {
        title: "Welcome to Our Application",
        subtitle: "Your internationalized experience starts here!",
        airbnbYourHome: "Airbnb your home",

        navbar: {
          search: "Search",
          stays: "Stays",
          experiences: "Experiences",
          where: "Where",
          who: "Who",
          date: "Date",
          checkin: "Check in",
          checkout: "Check out",
          searchDestination: "Search Destination",
          addDates: "Add dates",
          addGuests: "Add guests",
        },

        user: {
          signup: "Sign up",
          login: "Log in",
          logout: "Log out",
          giftCard: "Gift cards",
          profile: "Profile",
          experience: "Host an experience",
          helpCenter: "Help Center",
        },
      },
      content: {},
      footer: {
        inspiration: "Inspiration for future getaways",

        tabs: {
          popular: "Popular",
          canmore: "Chalet rental",

          artsCulture: "Arts & culture",
          phoenix: "Mansion rentals",
        },

        support: "Support",
        supportSubList: {
          helpCenter: "Help Center",
          airCover: "AirCover",
          antiDiscrimination: "Anti-discrimination",
          disabilitySupport: "Disability Support",
          cancellationOptions: "Cancellation options",
          reportConcern: "Report neighborhood concern",
        },
        hosting: "Hosting",
        hostingSubList: {
          airbnbYourHome: "Airbnb your home",
          airCoverHosts: "AirCover for Hosts",
          hostingResources: "Hosting resources",
          communityForum: "Community forum",
          hostingResponsibly: "Hosting responsibly",
          airbnbFriendly: "Airbnb-friendly apartments",
          hostingClass: "Join a free Hosting class",
        },
        airbnb: "Airbnb",
        airbnbSubList: {
          newsroom: "Newsroom",
          newFeatures: "New features",
          careers: "Careers",
          investors: "Investors",
          giftCards: "Gift cards",
          emergencyStays: "Airbnb.org emergency stays",
        },

        term: "Terms",
        sitemap: "Sitemap",
        privacy: "Privacy",
        yourPrivacy: "Your Privacy Choices",
        language: "English (US)",
      },
    },
  },

  vi: {
    translation: {
      header: {
        title: "Chào mừng đến với Ứng dụng của chúng tôi",
        subtitle: "Trải nghiệm quốc tế hóa bắt đầu từ đây!",
        airbnbYourHome: "Cho thuê chỗ ở qua Airbnb",

        navbar: {
          search: "Tìm kiếm",
          stays: "Chỗ ở",
          experiences: "Trải nghiệm",
          where: "Địa điểm",
          who: "Khách",
          date: "Ngày",
          checkin: "Nhận phòng",
          checkout: "Trả phòng",
          searchDestination: "Tìm kiếm điểm đến",
          addDates: "Thêm ngày",
          addGuests: "Thêm khách",
        },

        user: {
          signup: "Đăng ký",
          login: "Đăng nhập",
          logout: "Đăng xuất",
          giftCard: "Thẻ quà tặng",
          profile: "Trang cá nhân",
          experience: "Tổ chức trải nghiệm",
          helpCenter: "Trung tâm trợ giúp",
        },
      },
      content: {},
      footer: {
        inspiration: "Nguồn cảm hứng cho những kỳ nghỉ sau này",

        tabs: {
          popular: "Phổ biến",
          canmore: "Nhà gỗ chalet cho thuê",

          artsCulture: "Văn hóa và nghệ thuật",
          phoenix: "Dinh thự cho thuê",
        },

        support: "Hỗ trợ",
        supportSubList: {
          helpCenter: "Trung tâm trợ giúp",
          airCover: "AirCover",
          antiDiscrimination: "Chống phân biệt đối xử",
          disabilitySupport: "Hỗ trợ người khuyết tật",
          cancellationOptions: "Các tùy chọn hủy",
          reportConcern: "Báo cáo lo ngại của khu dân cư",
        },
        hosting: "Chủ nhà",
        hostingSubList: {
          airbnbYourHome: "Cho thuê nhà trên Airbnb",
          airCoverHosts: "AirCover cho Chủ nhà",
          hostingResources: "Tài nguyên về đón tiếp khách",
          communityForum: "Diễn đàn cộng đồng",
          hostingResponsibly: "Đón tiếp khách có trách nhiệm",
          airbnbFriendly: "Căn hộ thân thiện với Airbnb",
          hostingClass:
            "Tham gia khóa học miễn phí về công việc Đón tiếp khách",
        },
        airbnb: "Airbnb",
        airbnbSubList: {
          newsroom: "Trang tin tức",
          newFeatures: "Tính năng mới",
          careers: "Cơ hội nghề nghiệp",
          investors: "Nhà đầu tư",
          giftCards: "Thẻ quà tặng",
          emergencyStays: "Chỗ ở khẩn cấp của Airbnb.org",
        },

        term: "Điều khoản",
        sitemap: "Sơ đồ trang web",
        privacy: "Quyền riêng tư",
        yourPrivacy: "Lựa chọn quyền riêng tư của bạn",
        language: "Tiếng Việt (VN)",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  // debug: true,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
