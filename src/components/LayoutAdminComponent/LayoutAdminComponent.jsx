import React from "react";
import { Layout } from "antd";

import HeaderAdmin from "./HeaderAdmin/HeaderAdmin";
import SiderAdmin from "./SiderAdmin/SiderAdmin";
import FooterAdmin from "./FooterAdmin/FooterAdmin";
import "./layoutAdminComponent.css";

function LayoutAdminComponent({ children }) {
  const { Content } = Layout;
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <SiderAdmin />

        <Layout>
          <HeaderAdmin />

          <Content>
            <div style={{ minHeight: 380, padding: "24px 32px" }}>
              {children}
            </div>
          </Content>

          <FooterAdmin />
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutAdminComponent;
