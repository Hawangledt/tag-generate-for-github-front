import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Signup() {
    const {loginWithRedirect} = useAuth0()
    function onClickRegisterLogin(){
        loginWithRedirect()
    }
    return <div><button onClick={onClickRegisterLogin}>
        Enter you credentials
        </button></div>
}

export default Signup