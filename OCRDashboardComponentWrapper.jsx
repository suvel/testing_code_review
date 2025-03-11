import React from "react";
import { Outlet } from "react-router-dom";

import Ocricon from "../../../assets/images/ocr_icon.png";
import ContentAreaWrapper from "../../../components/common/ContentAreaWrapper";
import Layout from "../../../components/navigation/Layout2";

const sideBarMenuOptions = [
  {
    name: "OCR Dashboard",
    iconComponent: <img src={Ocricon} width="22px" height="22px"/>,
    path: "ocrDashboard",
    hasMenu: false,
  },
];

const OrdersComponentWrapper = (props) => {
  return (
    <>
        <ContentAreaWrapper>
          <Outlet {...props} />
        </ContentAreaWrapper>
    </>
  );
};

const OCRDashboardComponentWrapper = ({ keycloak, navigate = undefined,children }) => {
  return (
    <>
      <Layout menuItems={sideBarMenuOptions} keycloak={keycloak}>
        {children}
        <OrdersComponentWrapper navigate={navigate} />
      </Layout>
    </>
  );
};

export default OCRDashboardComponentWrapper;
