const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model')
const gravatar  = require('gravatar');

const errHandler = function(err) {
    console.log("errHandler")
    console.log(err);
}

exports.getPosts = function (req, res) {
    PostModel.find().then(docs=>{
        res.json(docs)
    }).catch(error =>{
        console.log(error)
        res.status(500)
    })
}

function setGravatar(user) {
    return new Promise(function(resolve, reject) {
        let gravatarUrl = gravatar.url(user.email, {s: '100', r: 'x', d: 'retro'}, false);
        let query = { email: user.email },
        update = { gravatar: gravatarUrl },
        options = { upsert: false, new: false, setDefaultsOnInsert: false };
        UserModel.findOneAndUpdate(query, update, options, function(error, result) {
            if (error) {
                reject(error);
            } else {
                result.gravatar = gravatarUrl;
                resolve(result);
            }
        });
    })
}

function getUserByEmail (email){
    return new Promise(function(resolve, reject) {
        let query = { email: email },
        update = { lastActive: new Date() },
        options = { upsert: true, new: true, setDefaultsOnInsert: true }
        UserModel.findOneAndUpdate(query, update, options, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    })
}

function getPostObject (user, reqBody){
    return {
        email       : user.email,
        rating      : reqBody.rating,
        content     : reqBody.content,
        gravatar    : user.gravatar
    }
}

function savePost (user,body){
    return new Promise(function(resolve, reject) {
        let postObject = getPostObject(user,body);
        let post = new PostModel(postObject);
        post.save(function (error,savedPost) {
            if (error) {
                reject(error);
            } else {
                resolve(savedPost);
            }
        }) 
    });
}

exports.post_create = function (req, res) {
    var dataPromise = getUserByEmail(req.body.email);
    dataPromise
    .then(function(result) {
        if(!result.gravatar){
            let gravatarPromise = setGravatar(result).then(result);
            return gravatarPromise;
        } 
        return result
     }, errHandler)
     .then(function(user) {
         let savePromise = savePost(user, req.body);
         return savePromise;
     }, errHandler)
     .then(function(post){
        res.json(post);
     },errHandler)
     .catch(error=>{
         console.log("catch")
         res.status(500)
     })
};