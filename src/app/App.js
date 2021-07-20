import React from "react";
import Loadable from "react-loadable";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import createLaunchpadPage from "./create-launchpad/create-launchpad-page";
import { ROUTES } from "../common/constants/routes";
import reducer from "./../common/store/index";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const CreateLaunchpadPage = Loadable({
  loader: () =>
    import(
      /*webpackChunkName: GetStarted */ "./create-launchpad/create-launchpad-page"
    ),
  loading: createLaunchpadPage,
});
Spin.setDefaultIndicator(
  <LoadingOutlined style={{ fontSize: 50, color: "#2042a8" }} spin />
);
function App() {
  return (
    <ReduxProvider store={reducer}>
      <Router>
        <Switch>
          <Route
            exact
            path={ROUTES.createLaunchpad}
            component={CreateLaunchpadPage}
          />
        </Switch>
      </Router>
    </ReduxProvider>
  );
}

export default App;
