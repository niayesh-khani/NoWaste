import React from "react";
import {useHistory } from "react-router-dom";
import HomePage from "./Homepage";
import Landing from "./Landing";
import Login from "./Login";

export default function Routing(){
    const history = useHistory();
    // console.log(JSON.parse(localStorage.getItem("token")));
    const token = localStorage.getItem("token")
    if(token === '' || token === 'undefined' || token == null)
    {
        history.push("/login");
        return(<Login />);
    }
    else
    {
        history.push("/homepage");
        return(<HomePage />);
    }
};