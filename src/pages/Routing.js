import React from "react";
import {useHistory } from "react-router-dom";
import HomePage from "./Homepage";
import Landing from "./Landing";

export default function Routing(){
    const history = useHistory();
    console.log(JSON.parse(localStorage.getItem("token")));
    console.log(JSON.parse(localStorage.getItem("token")));
    if(JSON.parse(localStorage.getItem("token")) !== '')
    {
        history.push("/homepage");
        return(<HomePage />);
    }
    else
    {
        history.push("/landing");
        return(<Landing />);
    }
};