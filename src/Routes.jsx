import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AylikMenu from "./pages/AylikMenu"
import HaftalikMenu from "./pages/HaftalikMenu"
import YemekBilgileri from "./pages/YemekBilgileri"


const Routes = () => {
    return (
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/aylik-menu" exact component={AylikMenu} />
        <Route path="/haftalik-menu" exact component={HaftalikMenu} />
        <Route path="/yemek-bilgileri" exact component={YemekBilgileri} />
      </Switch>
    );
  };
  
  export default Routes;
  