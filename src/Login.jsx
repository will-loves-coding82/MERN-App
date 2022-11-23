import React from "react";
import './Login.css';
import { AiFillCar } from "react-icons/ai";
import { Link } from 'react-router-dom';

import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

const Login = () => {

    const [dropDown, setdropDown]= useState( false );
    const [userName, changeName]= useState( "" );
    const [email, changeEmail]= useState( "" );
    const [password, changePassword]= useState( "" );
    const [verifiedUser, toggleVerified] = useState(false);

    const navigate = useNavigate();

     async function onSubmit(event) {

        event.preventDefault();
        const response = await fetch("http://localhost:4000/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        });


        const data = await response.json();
        if (data.user) {
            localStorage.setItem("token", data.user)
            console.log("set token: " + data.user)
            navigate('/dashboard');
        }
        else {
            console.log("username or password is incorrect");

            changeName("");
            changePassword("");
        }


    }   

    
    const toggleFormView = (event) => {
        event.preventDefault();
        var btn = document.getElementById("dropdown-btn");
        btn.style.opacity = 1;

        
        if(dropDown === false ) {
            setTimeout(function () {
                document.getElementById("login-form").style.visibility = "visible";
                document.getElementById("login-form").style.opacity = 1;

            }, 250);

            document.querySelector("i").style.visibility = "hidden";
            document.querySelector("i").style.opacity = 0;
            document.getElementById("dropdown-btn").style.transform = "scale(3,5)"
            setdropDown(true)

        }

        if(dropDown === true) {
                
            setTimeout(function () {
  
                document.querySelector("i").style.opacity = 1;
                document.querySelector("i").style.visibility = "visible";
         
            }, 500);
            
            document.getElementById("login-form").style.visibility = "hidden";
            document.getElementById("login-form").style.opacity = 0;
            document.getElementById("dropdown-btn").style.transform = "scale(1,1)";

            setdropDown(false)

        }

    }



        
        return (
    
                <>
                    <div id = "body">
                    <h1 id="title">repetition</h1>
                    <h1 id="description">The most non-essential exercise logger</h1>


                    <div id="btn-container">
                        <div id="dropdown-btn">
                            
                            <i className='fas' 

                            onMouseOver={() => {
                            var btn = document.getElementById("dropdown-btn");
                            var icon = document.getElementsByClassName("fas")[0];

                            if(icon.style.visibility === "visible"){
                                btn.style.transform = "scale(1.2)";
                                btn.style.opacity = 0.8;
                            }
                            }}

                            onMouseOut = {() => {
                                var btn = document.getElementById("dropdown-btn");
                                var icon = document.getElementsByClassName("fas")[0];
                                if(icon.style.visibility === "visible"){

                                    btn.style.transform = "scale(1)";
                                    btn.style.opacity = 1;
                                }

                            }}
                            onClick={e => {toggleFormView(e)}}><AiFillCar /></i>
                            
    

                        </div>
                        <div>
                            <form id="login-form" class="dropdown" action="" onSubmit = {e => onSubmit(e)}>
                                <div>
                                    <label for="name" class="label" >Name <input class = "input-field"  id="name" type="text"  name="user-input" 
                                    onChange = {e => changeName(e.target.value)} value = {userName} placeholder=" Enter your username"  />
                                    </label><br></br>

                                    <label for="email"  class="label">Email <input class = "input-field"  id="name" type="text" name="user-input" 
                                    onChange = {e => changeEmail(e.target.value)} value = {email} placeholder=" Enter your email"  />
                                    </label><br></br>

                                    <label for="password" class="label">Password <input class = "input-field"id="password" type="text" name="user-input" 
                                    onChange = {e => changePassword(e.target.value)} value = {password} placeholder=" Enter your password"  />
                                    </label><br></br>

                                    <button id = "sign-in" type="submit" value = 'Submit' >Sign In</button>
                                    <button id = "cancel" onClick = {e => toggleFormView(e)}>Cancel</button>
                                </div>
                            </form>

                        </div>

                        
                    </div>
                    <p >I"M A NEW USER. <Link to = "/createUser">SIGN UP</Link></p>


                    </div>

                </>
       
            
            );
        
    
}


export default Login;