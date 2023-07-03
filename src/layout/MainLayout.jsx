import React from "react";
import Overplay from "../components/Overplay";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { Outlet } from "react-router-dom";
import AuthenModal from "../components/AuthenModal";
import { AuthenProvider } from "../components/AuthenContext";
import BackToTop from "../utils/scrollToTop";
import Loading from "../components/Loading";
// import Loading from "../components/Loading";
export default function MainLayout() {
  return (
    <div>
      <AuthenProvider>
        {/* <Loading /> */}
        <Overplay />
        <Header />

        <Outlet />

        <Nav />
        <Footer />
        <AuthenModal />
        <Modal />
        <BackToTop />
      </AuthenProvider>
    </div>
  );
}
