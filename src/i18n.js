import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      header: {
        title: "Welcome to Our Application",
        subtitle: "Your internationalized experience starts here!",
        airbnbYourHome: "Airbnb your home",

        user: {
          signup: "Sign up",
          login: "Log in",
          giftCard: "Gift cards",
          experience: "Host an experience",
          helpCenter: "Help Center",
        },
      },
      search: {
        search: "Search",
        stays: "Stays",
        experiences: "Experiences",
      },
      content: {
        description:
          "This is a demonstration of how to use i18next with React to create a multilingual application.",
        instruction: "Click on the buttons below to switch the language.",
      },
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

        user: {
          signup: "Đăng ký",
          login: "Đăng nhập",
          giftCard: "Thẻ quà tặng",
          experience: "Tổ chức trải nghiệm",
          helpCenter: "Trung tâm trợ giúp",
        },
      },
      search: {
        search: "Tìm kiếm",
        stays: "Chỗ ở",
        experiences: "Trải nghiệm",
      },
      content: {
        description:
          "Đây là một ví dụ về cách sử dụng i18next với React để tạo ứng dụng đa ngôn ngữ.",
        instruction: "Nhấn vào các nút bên dưới để thay đổi ngôn ngữ.",
      },
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