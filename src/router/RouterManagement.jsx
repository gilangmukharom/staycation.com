import React, { Suspense, useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import LayoutComponent from "../components/LayoutComponent/LayoutComponent";
import LayoutAdminComponent from "../components/LayoutAdminComponent/LayoutAdminComponent";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import RoomCustomerPage from "../pages/RoomCustomer/RoomCustomerPage";
import DetailRoomCustomerPage from "../pages/RoomCustomer/components/DetailRoomCustomer/DetailRoomCustomerPage";
import Booking from "../pages/Dashboard/Booking/Booking";
import Room from "../pages/Dashboard/Room/Room";
import DetailRoom from "../pages/Dashboard/Room/components/DetailRoom/DetailRoom";

function RouterManagement() {
  const token = localStorage.getItem("token");
  const cekAdmin = localStorage.getItem("cekAdmin");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
        {!token && location.pathname !== "/login" ? (
          <LayoutComponent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/room-customer" element={<RoomCustomerPage />} />
              <Route
                path="/room-customer/:uuid"
                element={<DetailRoomCustomerPage />}
              />
            </Routes>
          </LayoutComponent>
        ) : !token && location.pathname === "/login" ? (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        ) : token && cekAdmin === "true" ? (
          <LayoutAdminComponent>
            <Routes>
              <Route path="/admin/booking" element={<Booking />} />
              <Route path="/admin/room-admin" element={<Room />} />
              <Route path="/admin/room-admin/:uuid" element={<DetailRoom />} />
            </Routes>
          </LayoutAdminComponent>
        ) : (
          <LayoutComponent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/room-customer" element={<RoomCustomerPage />} />
              <Route
                path="/room-customer/:uuid"
                element={<DetailRoomCustomerPage />}
              />
            </Routes>
          </LayoutComponent>
        )}
      </Suspense>
    </>
  );
}

export default RouterManagement;
