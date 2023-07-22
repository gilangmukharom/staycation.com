import React from "react";
import { Layout, Row, Col, Typography, List } from "antd";
import { Link } from "react-router-dom";
import "./footerComponent.css";

function FooterComponent() {
  const { Title } = Typography;
  const { Footer } = Layout;

  return (
    <Footer>
      <p>&copy; Copyright 2023 • Made with ❤️ by R.S AHMAD AGIL ALATAS</p>
    </Footer>
  );
}

export default FooterComponent;
