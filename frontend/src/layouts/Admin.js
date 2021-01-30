import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";

import routes from "../routes.js";
import "./styles.css";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/home" />
  </Switch>
);

export default function Admin({ ...rest }) {

  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  return (
    <div className='px-0 mx-auto admin-wrapper'>
      <div className='admin-main-panel' ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner styles are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className='admin-content'>
            <div className='admin-container'>{switchRoutes}</div>
          </div>
        ) : (
          <div>{switchRoutes}</div>
        )}
      </div>
    </div>
  );
}
