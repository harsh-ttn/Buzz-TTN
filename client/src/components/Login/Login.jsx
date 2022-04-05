import React from "react";
import './Login.css'
import {Link} from 'react-router-dom';
import { useState } from "react";
import logo from './logoPng.png';
import signin from './signin.png';

function Login(){

    const[emailval,setEmailval]= useState('');
    const[pwdval,setPwdval]= useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    return (
        <div className="main-login">
            <div className="login-container">
                <div className="left-side">
                    <div className="img-class">
                        <img src={logo} id="img-id" alt="" />
                    </div>
                    <form onSubmit={handleSubmit}>
                      <label for='email1'>Email :</label>

                        <input placeholder="TTN Email-ID" 
                               type='email' 
                               value={emailval} 
                               onChange={(e)=>{setEmailval(e.target.value)}} 
                               id='email1'
                        />
                      
                      <label for='pwd1'>Password :</label>
                        <input placeholder="Password" 
                               type="password" 
                               value={pwdval} 
                               onChange={(e)=>{setPwdval(e.target.value)}}
                               id='pwd1'
                        />

                        <button type="submit" id='sub-btn'>Sign in</button>
                    </form>

                    <div className="footer">
                        <h4>Don't have an account? <Link className="link" to='/register'>Sign Up Now</Link></h4>
                    </div>

                </div>
                <div className="right-side">
                    <div className="welcomenote">
                        <h3>Enter your details and Start your journey with us</h3>
                        <h4 className="note">Don't stop until you are PROUD</h4>
                    </div>
                    <div className="signinImg">
                        <img src={signin} id='signin_img' alt="" />
                    </div>
                    <div className="signin_google">
                        <button className="google_btn">Sign in with Google</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login;