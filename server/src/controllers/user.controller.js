import User from '../models/user.model'
import _ from 'lodash'
import errorHandler from './helpers/dbErrorHandlers'
import jwtDecode from 'jwt-decode'

  const create = (req, res, next) => {

    const user = new User(req.body)
    user.save((err, result) => {
        if(err) {
            res.send({error: errorHandler.getErrorMessage(err)})
        }else{
            res.send({message: 'Successfuly created a new user.'})
        }
    })
}

const read = (req, res) => {

    const token = req.cookies.userJwtToken
    const id = jwtDecode(token)._id
 
    User.findById(id, (err, user) => {
        if(err || !user){
            return res.status(400).json({error: 'User not found'})
        }
        user.hashed_password = undefined
        user.salt = undefined
        return res.status(200).json(user)
    })
}

const update = (req, res, next) => {
    let user = req.profile
    user = _.extend(user, req.body);

    user.updated = Date.now()
    user.save(err=>{
         
        if(err){
            return res.send({error: errorHandler.getErrorMessage(err)})
        }
        return res.send({message: 'Data updated', user: user})
    })
}

const remove = (req, res, next) => {
    let user = req.profile
       user.remove((err)=>{
        if(err){
            return res.status(400).send({error: errorHandler.getErrorMessage(err)})
        }
        res.status(200).send({message:'Account closed'})
    })
}
            
const userByID = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.json({error:'User not found!'})
        }
    req.profile = user;
    next()
    })
}

const reloginUser = (req, res) => {

    const id = jwtDecode(req.body.token)._id

    User.findOne({'_id': id},(err, user) => {
      
        if(err || !user){       
            return res.send({error: 'User not found'})
        }
     
            return res.send({message:user})
    })
       
}

const test = (req, res) => {

    const token = req.cookies.userJwtToken
    const id = jwtDecode(token)._id

    if(!token) {
        console.log('no token')
        return res.status(400).json('Unathorized')
    }
    User.findOne({'_id': id},(err, user) => {
      
        if(err || !user){       
            return res.send({error: 'User not found'})
        }
     
        return res.send({message:user})
    })
       
}


export default {
    create,
    read, 
    update,
    remove,
    reloginUser,
    test,
    userByID
}