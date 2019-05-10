import React from "react";
// import PropTypes from "prop-types";
// import { compose, connect } from "react-redux";

import { Main } from "../../common/templates/main";
import { Header } from "../../common/organisms/header";
import { Footer } from "../../common/organisms/footer";

// import { isSidebaresShownSelector } from "../selectors";

import { LeftSidebar } from "../organisms/left-sidebar";
import { RightSidebar } from "../organisms/right-sidebar";
import { Game } from "../organisms/game";

/* const mapStateToProps = state => ({
  isSidebaresShown: isSidebaresShownSelector(state),
});

const mapDispatchToProps = null;

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
); */

const GamePageView = () => (
  <Main header={<Header />} footer={<Footer />}>
    <LeftSidebar />
    <Game />
    <RightSidebar />
  </Main>
);

/* GamePageView.propTypes = {
  isSidebaresShown: PropTypes.bool.isRequired,
}; */

export const GamePage = GamePageView;
