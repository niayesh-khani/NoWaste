import React from "react";
import {useHistory } from "react-router-dom";
import HomePage from "./Homepage";
import Landing from "./Landing";
import Login from "./Login";

export default function Routing(){
    const history = useHistory();
    console.log(JSON.parse(localStorage.getItem("token")));
    if(JSON.parse(localStorage.getItem("token")) !== '')
    {
        history.push("/homepage");
        return(<HomePage />);
    }
    else
    {
        history.push("/login");
        return(<Login />);
    }
};