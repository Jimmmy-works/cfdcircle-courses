import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Course from "./pages/Course";
import CourseDetail from "./pages/CourseDetail";
import Page404 from "./pages/Page404";
import MainLayout from "./layout/MainLayout";
import ProfileLayout from "./layout/ProfileLayout";
import StudentPayment from "./pages/StudentProfile/StudentPayment";
import StudentCourse from "./pages/StudentProfile/StudentCourse";
import StudentInfo from "./pages/StudentProfile/StudentInfo";
import { PATHS } from "./constant/pathnames";
import CourseOrder from "./pages/CourseOrder";
import PrivateRoute from "./components/PrivateRoute";
import BackToTop from "./utils/scrollToTop";

// const Home = lazy(() => import("./pages/Home"));
// const Contact = lazy(() => import("./pages/Contact/Contact"));
// const About = lazy(() => import("./pages/About"));
// const Blog = lazy(() => import("./pages/Blog"));
// const BlogDetail = lazy(() => import("./pages/BlogDetail"));
// const Course = lazy(() => import("./pages/Course"));
// const CourseDetail = lazy(() => import("./pages/CourseDetail"));
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={PATHS.CONTACT} element={<Contact />} />
          <Route path={PATHS.ABOUT} element={<About />} />
          <Route path={PATHS.BLOG} element={<Blog />} />
          <Route path={PATHS.BLOG_DETAIL} element={<BlogDetail />} />
          <Route path={PATHS.COURSE} element={<Course />} />
          <Route path={PATHS.COURSE_DETAIL} element={<CourseDetail />} />
          <Route element={<PrivateRoute redirectPath={`${PATHS.HOME}`} />}>
            <Route path={PATHS.COURSE_ORDER} element={<CourseOrder />} />
            <Route path={PATHS.PROFILE.INDEX} element={<ProfileLayout />}>
              <Route index element={<StudentInfo />} />
              <Route
                path={PATHS.PROFILE.PAYMENT}
                element={<StudentPayment />}
              />
              <Route path={PATHS.PROFILE.COURSES} element={<StudentCourse />} />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
