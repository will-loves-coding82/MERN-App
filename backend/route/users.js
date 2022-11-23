const express = require("express");
const router = express.Router();
const userTemplateCopy = require('../models/userModels.js');
const jwt = require("jsonwebtoken");
const { decode } = require("punycode");


// this post will recieve a post request for signup provided by the user, which is sent to server.js and 
// then sent to route.js which will send a response'
router.route('/add').post((request, response) => {

    // create a new instance of a schema which is a user
    const user = new userTemplateCopy({

        // when a new schema has been created, we have username 
        // and password fields. 
        userName:request.body.userName,
        email:request.body.email,
        password:request.body.password
    })

    user.save().then(data => {
        console.log("user created")
         return response.json(data)
    })
    .catch(error => {
         return response.json(error)
    })
  
})

router.route('/find/:userName').get((req, res)=>{
    console.log("performing get request for name: " + req.params.userName)
    userTemplateCopy.find({userName: req.params.userName}, (err, arr) => {
        console.log(arr.length)
        if(arr.length> 0) {
            console.log("cannot create user")
            return res.json({status: "error"})

        }
        else {
            console.log("can create user")
            return res.json({status: "ok"})


        }
    })


});

router.route('/login').post((req,res)=> {

    const user = userTemplateCopy.find({
        userName: req.body.userName,
        password:req.body.password,
    }, (err,arr)=> {
        if(arr.length !== 0) {
            const token = jwt.sign({
                userName: req.body.userName,
                password: req.body.password
            }, 'secret123'
            
            );
            console.log("successful login")
            return res.json({status: 'ok', user: token})

        }
        return res.json({status: "error", user: false})
    
    
    })
  

})


router.route('/verify').get((req,res)=> {
        const token = req.headers['x-access-token'];
   
        //const decoded = jwt.verify(token, 'youcannevverfigurethisoutbro123345')
        jwt.verify(token, 'secret123', function(err, decoded) {
            console.log(decoded) // bar
            userTemplateCopy.find({userName: decoded.userName}, function (err, arr) {
                    if (arr.length !== 0) {
                        console.log("dashboard verification success");
                        return res.json({ status: 'ok', userName: decoded.userName });
                    }
    
                    else if (err) {
                        console.log("dashboard validation error");
                        return res.json({ status: "error", error: "Invalid token" });
                    }
    
                })
          });
       

    })

module.exports = router;
