const UserModel = require('../models/user.model')
const dateFormat = require('dateformat');

exports.getLastActive = function (req, res){
    setTimeout(() => {
        UserModel.findOne({"email": req.body.email}).then( result =>{
            if(result){
                res.json(dateFormat(result.lastActive, "dddd, mmmm dS, yyyy, h:MM:ss TT"))
                return;
            }
            res.status(500)
        });
    }, 700);
   
}