import React, { useEffect } from "react";
import { useState } from "react";
import jwt from 'jsonwebtoken';
import {useNavigate} from 'react-router-dom';

const Dashboard = () => {
    const [locations, setLocations] = useState([]);
    const [userName, setName ] = useState("");
    const [loading, setLoading] = useState(false);

 
    
    async function loadDashboard() {
        console.log("loading dashboard")
        console.log(localStorage.getItem('token'));
        const req =  await fetch("http://localhost:4000/users/verify",{
            headers:{
                'x-access-token': localStorage.getItem('token'),
            },
        })
        

        const data = await req.json();
        console.log(data.status)
        if(data.status === "ok"){
            console.log('Status is okay ')

            setName(data.userName)

        }
        else {
            alert(data.error)
        }
        
        


    }

    useEffect(()=> {
        console.log("calling useEffect")
        const token = localStorage.getItem('token')
        if(token){
            const user = jwt.decode(token)
            if(!user){
                console.log('No user')

                localStorage.removeItem('token')
                const navigate = useNavigate();
                navigate('/login')

            }
            else{
                console.log('Yes user')
                loadDashboard();
            }
        }
        else {
            console.log('Token bad')

        }
    },[])
    return(
            <nav id = "navbar">
                <h1 id = "title">Dashboard</h1>
                <h2 id = "welcome">Welcome {userName}</h2>
            </nav>
            
    );
    
}

export default Dashboard;