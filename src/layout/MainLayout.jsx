import React, { useEffect } from "react";
import Overplay from "../components/Overplay";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { Outlet } from "react-router-dom";
import AuthenModal from "../components/AuthenModal";
import { AuthenProvider, useAuthen } from "../components/AuthenContext";
import BackToTop from "../utils/scrollToTop";
import Loading from "../components/Loading";
import useDebounce from "../hooks/useDebounce";
export default function MainLayout() {
  //
  return (
    <div>
      <AuthenProvider>
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
