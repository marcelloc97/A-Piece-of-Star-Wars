import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Story from "./pages/Story";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/story" component={Story} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
