import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../../components/navigation/Layout2";
import Title from "../../components/common/Title";
import BreadCrumbContextAttached from "../../components/common/BreadCrumbContextAttached";
import { BreadCrumbProvider } from "../../context/breadCrumbContext";
import ContentAreaWrapper from "../../components/common/ContentAreaWrapper";
import menuList from '../../components/navigation/menu_metadata'

const MetaComponentTemplate = (props) => {
  return (
    <>
      <BreadCrumbProvider
        baseCrumbs={[
          {
            label: "Master Configuration",
            name: "metadata",
            path: "/metadata",
          },
        ]}
      >
        {/* <BreadCrumbContextAttached /> */}
        <ContentAreaWrapper p={"30px"}>
          {/* <Title variant="metadata" /> */}
          <Outlet {...props} />
        </ContentAreaWrapper>
      </BreadCrumbProvider>
    </>
  );
};

const MetaComponentWrapper = ({ keycloak, navigate = undefined, children }) => {
  return (
    <>
      <Layout menuItems={menuList} keycloak={keycloak}>
        {children}
        <MetaComponentTemplate navigate={navigate} />
      </Layout>
    </>
  );
};

export default MetaComponentWrapper;
