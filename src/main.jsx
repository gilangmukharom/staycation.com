import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import { ThemeConfig } from "./themes/ThemeConfig.jsx";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./config/apollo-client.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <ConfigProvider theme={ThemeConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </ApolloProvider>
);
