import React from "react";
import './Register.css'
import {Link} from 'react-router-dom';
import {useState} from 'react'
import {RegisterApiCall} from '../ApiCall/RegisterApiCall';

function Register(){

    const[name,setName]= useState('')
    const[emailval,setEmailval]= useState('');
    const[pwdval,setPwdval]= useState('');
    const[confirmpwdval,setConfirmPwdval]= useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(name!=='' ||emailval!=='' ||pwdval!==''||confirmpwdval!==''){
            if (/@tothenew.com\s*$/.test(emailval)) {
                if(pwdval===confirmpwdval){
                    RegisterApiCall({"name":name,"email":emailval,"password":pwdval,"google":false,"userImage":""})
                    setName('');
                    setEmailval('');
                    setPwdval('');
                    setConfirmPwdval('');
                    alert('User signed-up successfully.Kindly Login!!')
                }
                else{
                    alert("Passwords don't match. Kindly try again")
                }
             }
             else{
                 alert('User can only sign-up using To The New official email-ID. Kindly try again!!');
             } 
            
            }                        
        }

    return (
        <div className="register-main">
            <div className="top">
                    <h5>Already have an account?
                    <Link id='link-signin' to='/google'> Sign in</Link>
                    </h5>
                </div>
            <div className="form">                
                <div className="body">
                    <form onSubmit={handleSubmit}>
                        <label for='username'>Enter your Name :</label>
                        <input placeholder="Enter your name" 
                               type="text"
                               value={name}
                               onChange={(e)=>{setName(e.target.value)}} 
                        />
                        <label for='email1'>Email :</label>

                            <input placeholder="TTN Email-ID" 
                                   type='email' 
                                   value={emailval} 
                                   onChange={(e)=>{setEmailval(e.target.value)}} 
                            />
                        
                        <label for='pwd1'>Password :</label>
                            <input placeholder="Password" 
                                   type="password" 
                                   value={pwdval} 
                                   onChange={(e)=>{setPwdval(e.target.value)}}
                            />
                        <label for='confirmpwd1'>Confirm Password :</label>
                            <input placeholder="Confirm password" 
                                   type="password" 
                                   value={confirmpwdval} 
                                   onChange={(e)=>{setConfirmPwdval(e.target.value)}}
                            />
                            <button type="submit" id='sub-btn' >Sign Up</button>
                        </form>
                </div>
               
            </div>            
        </div>
    )
}

export default Register;