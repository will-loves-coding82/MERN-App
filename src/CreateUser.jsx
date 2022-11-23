import React from 'react'
import "./CreateUser.css"
import { Link } from 'react-router-dom';
import axios from "axios";


const checkList = [ "Passwords match", 
                    "Username is unique", 
                    "Password is at least 6 characters long"];





class CreateUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName:"",
            email:"",
            password:"",
            confirm:"",

            match: true,
            nameExists: false,
            timer:null,
            canSubmit: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.changeCheck = this.changeCheck.bind(this);
        this.checkValidName = this.checkValidName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.isTrue = this.isTrue.bind(this);
    }

    

    checkValidName (event) {
        
        this.setState({
            userName: event.target.value,
        })


        clearTimeout(this.state.timer)

       const newTimer = setTimeout( ()=> {
            
        console.log("checking")
        if(this.state.userName === "") {
            this.setState({nameExists: true})
            return;
        }

        axios.get("http://localhost:4000/users/find/" + this.state.userName)
        .then(response => {
            console.log(response)

            if(response.data.status !== "error") {
                this.setState({nameExists: false})
                console.log("set nameExists to false")

            }
            else {
                this.setState({nameExists: true})

            }
       })
        .catch(error => {
            console.log(error)
        })}
        , 1000);

        this.setState({timer:newTimer})
    };



    isTrue(item) {
      //console.log("called isTrue");
      let idx = checkList.indexOf(item);
      //let box = document.getElementById(`list-container:nth-child(${idx})`);

      switch(idx){
        case 0:
             return this.state.match && this.state.password.length > 0 ? true:  false;
        case 1:
            return this.state.nameExists === false && this.state.userName !== "" ? true :  false;
        case 2:
            return this.state.password.length >= 6 ? true:  false;
        default:
            return false;
        }
    };
      

    onSubmit(event){
        event.preventDefault();

        if(this.state.match === false) {
            return;
        }
        if(this.state.password === "" && this.state.confirm === "") {
            return;
        }

        //this.checkValidName(this.state.userName);
        if(this.state.nameExists === true){
            return;
        }

        const registered = {
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password
        }

        axios.post("http://localhost:4000/users/add", registered)
        .then((response)=> {

            if(response.status === 200) {

                this.setState({
                    userName: "",
                    email:"",
                    password:"",
                    confirm:"",
                    match: true,
                    nameExists: false
                })

            }

   
        }
        )

    }


    changeEmail(event){
        this.setState({
            email: event.target.value
        })
    }

    changePassword(event){
        this.setState({
            password: event.target.value
        })

        if(event.target.value !== this.state.confirm) {
            this.setState({match: false})
        }
        else {
            this.setState({match: true})
        }
    }

    changeCheck(event){

        this.setState({confirm: event.target.value});

        if(event.target.value !== this.state.password) {
             //alert("Passwords don't match")
             this.setState({match: false})
        }
        else {
            this.setState({
                match: true
            })
        }

        
    }

    render() {
        return(
            <>
            <div id ="wrapper">

            <h1 id="welcome">Welcome,</h1>
            <h1 id = "get-started"> Sign Up To Get Started!</h1>
           
            <form id="signup-form" class="dropdown" action="" onSubmit={this.onSubmit}>
                <div>
                    <label for="name" class="label">Name <input class="input-field" id="name" type="text" name="user-input"
                        onChange={this.checkValidName} autoFocus value={this.state.userName} placeholder=" Enter your username" />
                    </label><br></br>

                    <label for="email" class="label">Email <input class="input-field" id="email" type="text" name="user-input"
                        onChange={this.changeEmail} value={this.state.email} placeholder=" Enter your email" />
                    </label><br></br>

                    <label for="password" class="label">Password <input class="input-field" id="password" type="text" name="user-input"
                        onChange={this.changePassword} value={this.state.password} placeholder=" Enter your password" />
                    </label><br></br>

                    <label for="confirm-password" class="label">Confirm Password<input class="input-field" id="confirm" type="text" name="user-input"
                        onChange={this.changeCheck} value={this.state.confirm} placeholder="Re-enter Password" />
                    </label><br></br>

                    <button id="sign-up" type="submit" value='Submit'>Sign Up</button>
                    <Link to = "/"><button id="go-back">Back</button></Link>

                </div>
            </form>

            <div className="checkList">
                <div className="list-container">
                {checkList.map((item, index) => (
                    
                    <div key={index}>
                    <input checked = {this.isTrue(item)} value={item} type="checkbox" onChange = {event => event.preventDefault()} />
                    <span >{item}</span>
                    </div>
                ))}
                </div>
            </div>

            </div>
            </>
        
        )
    }
}

export default CreateUser;