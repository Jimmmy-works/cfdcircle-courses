const COURSE_PATH = "/course";
const REGISTER_PATH = "/register";
const PROFILE_PATH = "/profile";
const BLOG_PATH = "/blog";
export const PATHS = {
  HOME: "/",
  COURSE: COURSE_PATH,
  RESGISTER: REGISTER_PATH,
  COURSE_DETAIL: COURSE_PATH + "/:slug",
  COURSE_ORDER: REGISTER_PATH + "/:slug",
  PROFILE: {
    INDEX: PROFILE_PATH,
    COURSES: PROFILE_PATH + "/my-course",
    PAYMENT: PROFILE_PATH + "/my-payment",
  },
  BLOG: "/blog",
  BLOG_DETAIL: BLOG_PATH + "/blog-detail",
  CONTACT: "/contact",
  ABOUT: "/about",
};
