import React from "react";
import ReactRouterPropTypes from 'react-router-prop-types';

// import { useStore } from "effector-react";
import { RouteGate } from "../../../core/routing";

import { Main } from "../../common/templates/main";
import { Header } from "../../common/organisms/header";
import { Footer } from "../../common/organisms/footer";

// eslint-disable-next-line arrow-body-style
export const AboutPage = ({ route }) => {
  // const isGameStarted = useStore($isGameStarted);
  return (
    <>
      <RouteGate path={route.path} />
      <Main
        header={<Header />}
        footer={<Footer />}
      >
        About
      </Main>
    </>
  );
};

AboutPage.propTypes = {
  route: ReactRouterPropTypes.route.isRequired,
};
