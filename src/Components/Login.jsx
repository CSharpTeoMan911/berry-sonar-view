import { useEffect, useState } from 'react';
import { setAuthContainerGeometry } from '../Functions/Animations';
import logo from '../Images/firebaselogo.png';
import { signInUser } from '../Functions/Firebase';
import Notification from './Notification';
import { set } from 'firebase/database';

export default function Login() {
    const [message, setMessage] = useState("");
    const [type, setType] = useState("inforamtion");
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("authenticated") === "true"){
            window.location.href = "/";
        }
        setAuthContainerGeometry();
    });
    

    return (
        <div id='main-background' className="background" style={{ overflow: "auto" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", height: "100%", width: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
                
                <Notification type={type} message={message} show={show} setShow={setShow}/>
                
                <div style={{ display: "flex", flexDirection: "column", alignSelf: "center", overflowY: "auto", overflowX:"hidden", width:"100%" }}>
                    <div id='auth-container' className="auth-container">
                        <img src={logo} alt="Logo" className="logo" style={{ alignSelf: "center", width: "70%", maxWidth: "300px", marginTop: "10px" }} />

                        <div className='auth-section'>
                            <p className='auth-title'>
                                Email
                            </p>
                            <input id='email_input' className='auth-input' />
                        </div>
                        <div className='auth-section'>
                            <p className='auth-title'>
                                Password
                            </p>
                            <input id='password_input' type='password' className='auth-input' />
                        </div>

                        <button className='auth-button' onClick={()=>{signIn(setShow, setMessage, setType, setRefresh);}}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

async function signIn(setShow, setMessage, setType, setRefresh) {
    let email = document.getElementById("email_input").value;
    let password = document.getElementById("password_input").value;
    let auth_result = await signInUser(email, password);


    if (auth_result == "Sign in successful") {
        setType("notification");
        setTimeout(() => {
            localStorage.setItem("authenticated", "true");
            setRefresh(true);
        }, 3200);
    }
    else{
        setType("error");
    }

    setShow(true);
    setMessage(auth_result);
}