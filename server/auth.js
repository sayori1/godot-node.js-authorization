const express = require("express")
const models = require("./models")
const bcrypt = require("bcrypt")
const { model } = require("mongoose")
const jwt = require("jsonwebtoken")
const config = require("./config")

const router = express.Router()



router.post("/register", async (req,res) =>{
    try{
        const {login, password, name} = req.body
        const oldUser = await models.User.findOne({login})



        if(oldUser){
            res.status(409).send("The account exists, please log in")
        }

        encrypted = await bcrypt.hash(password, 10)

        const user = await models.User.create({
            login,password:encrypted,name, token:""
        })

        let token = jwt.sign(
            {user_id:user.id, login},
            config.secretToken,
            {
                expiresIn:"2h"
            }
        )

        res.status(200).json({user, token})

    }
    catch(err){
        console.log(err)
    }
})


router.post("/login", async (req, res) => {

    try {

      console.log(req.body)
      const { login, password } = req.body;

      console.log(login, password)
  
      if (!(login && password)) {
        res.status(400).send("All input is required");
      }
      const user = await models.User.findOne({ login });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, login },
          config.secretToken,
          {
            expiresIn: "2h",
          }
        );
  
        res.status(200).json({user, token})
      }
      else 
        res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
});

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.secretToken);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports.verifyToken = verifyToken
module.exports.router = router