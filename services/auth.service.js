const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidator,singinValidator} = require('../validation/auth.validation');


const register = async (req, res) => {
    const { error } = registerValidator(req.body);
    //console.log(error);
    if(error) res.status(400).json({
        message: error.details[0].message
    });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    let user = {
        email: req.body.email,
        password: hashPassword,
        name: req.body.name
    }
    try {
        let target = await db('user').where('email', user.email);
        let getEmail = target.map(x => x.email);
        if(getEmail[0]) {
            throw new Error(
                res.json({
                    message: 'email already exists'
                })
            );
        }else{
            let target_id = await db('user').insert(user);
            if(target_id != null){
                res.status(200).json({
                    message: 'success',
                    data: 'create user success user id is '+target_id
                });
            }
            else{
                res.status(400).json({
                    message: 'Bad Request',
                    data: ''
                });
            }
        }
        
    } catch (error) {
        console.log(error);
    }
}

const singin = async (req, res) => {

    const { error } = singinValidator(req.body);
    if(error) res.status(400).json({
        message: error.details[0].message
    });

    let user = {
        email: req.body.email,
        password: req.body.password
    }
    try {

        let target = await db('user').where('email', user.email);
        let getpass = target.map(x => x.password);
        if(getpass[0] === undefined || getpass[0] === null){
            res.status(400).json({
                message: 'not found user'
            });
        }
        else{
            
            let validPass = await bcrypt.compare(user.password,getpass[0]);
            if(!validPass){
                res.status(400).json({
                    message: 'Invalid Password'
                });
            }else{
  
                const token = jwt.sign({ id: target[0].id }, process.env.TOKEN_SECRET);
                res.header('user-token',token).json({
                    message: 'success',
                    token: token
                });
            }
        }
        
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    register,
    singin
}