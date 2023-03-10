import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "./App";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      {/* Define other routes here */}
    </Switch>
  );
}

export default Routes;