import React, { useEffect, useState } from "react";
import axios from "axios";
import './EditRestaurant.css';

const EditRestaurant = () => {
    const [update, setUpdate] = useState('');
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const [openNetwork, setOpenNetwork] = useState(false);
    const [restaurant, setRestaurant] = useState();
    const handleCloseNetwork = () => {
        setOpenNetwork(false);
    };
    
    //edit restaurant profile
    const handleEditRestaurant = (e) => {
        e.preventDefault();
        axios.patch(
            `http://5.34.195.16/user/customer_profile/${id}/`, update,
            {headers: {
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "GET,PATCH",
                'Authorization' : "Token " + token.slice(1,-1)   
            }}
        )
        .then((response)=> {
            console.log(response);
            console.log("succesfully updated");
            window.location.reload(false);
        })
        .catch((error) => {
            console.log(error)
            if (error.request) {
                setOpenNetwork(true);
                console.log("network error");
            }
        });
    }

    //get the restaurant
    useEffect(() =>{
        axios.get(
            `http://5.34.195.16/restaurant/restaurant_profile/${id}/` , 
            {headers :{
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "GET,PATCH",
                'Authorization' : "Token " + token.slice(1,-1)
            }}
        )
        .then((response) => {
            console.log(response);
            setRestaurant(response.data)
        })
        .catch((error) => console.log(error));
    },[]);

    return ( 
        <div></div>
    );
}

export default EditRestaurant;