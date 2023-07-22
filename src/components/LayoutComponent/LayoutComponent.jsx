import React from "react";
import { Layout } from "antd";
import HeaderComponent from "./HeaderComponent/HeaderComponent";
import FooterComponent from "./FooterComponent/FooterComponent";

function LayoutComponent({ children }) {
  const { Content } = Layout;

  return (
    <>
      <Layout>
        <HeaderComponent />

        <Content className="site-layout" style={{ padding: "0 150px" }}>
          <div style={{ minHeight: 380 }}>{children}</div>
        </Content>

        <FooterComponent />
      </Layout>
    </>
  );
}

export default LayoutComponent;
