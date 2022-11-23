import React from 'react';
import Login from './Login'
import Dashboard from "./Dashboard"
import CreateUser from "./CreateUser"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const RouteComponent = (props) => (

  <BrowserRouter>
    <Routes>
      <Route  exact path="/" element = {<Login/>}/>
      <Route  exact path = "/login" element = {<Login/>} />
      <Route  path = "/createUser" element = {<CreateUser/>} />
      <Route path = "/dashboard" element = {<Dashboard/>} />

    </Routes>
</BrowserRouter>
);
export default RouteComponent;