import  { Navigate } from "react-router-dom";
import React from "react";

const Protected = ({children})=> {
    const token = localStorage.getItem("authorization");
    //""
    return (
        <>
    
        {token.length ? children: <Navigate to="/"/>}
        </>
    )
}
export default Protected;