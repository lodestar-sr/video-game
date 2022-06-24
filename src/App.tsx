import React from "react";
import {Redirect, Switch} from "react-router";
import {Route} from "react-router-dom";
import {ROUTES} from "./constants";
import FullLayout from "./layouts/FullLayout";
import VideoGames from "./pages/VideoGames";
import Contact from "./pages/Contact";

const App = () => (
  <FullLayout>
    <Switch>
      <Route path={ROUTES.VIDEO_GAMES} component={VideoGames} />
      <Route path={ROUTES.CONTACT} component={Contact} />
      <Redirect to={ROUTES.VIDEO_GAMES} />
    </Switch>
  </FullLayout>
);

export default App;
