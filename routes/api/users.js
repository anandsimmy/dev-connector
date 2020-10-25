const express= require('express');
const router= express.Router();
const { body, validationResult }= require('express-validator');
const gravatar= require('gravatar');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const config= require('config');
const User= require('../../models/User');

// @route POST api/users
// @desc register users
// @access public

router.post('/', [
    body('name', 'Please enter a name').not().isEmpty(),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Please enter a password with min 6 characters').isLength({ min:6 })
], async (req, res)=> {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const { name, email, password }= req.body
        let user= await User.findOne({ email })
        if(user){
            return res.status(400).json({ errors: [ { msg: 'User already exists' } ] })
        }
        const avatar= gravatar.url(email, {
            s: 200,
            r: 'pg',
            d: 'robohash'
        })
        user= new User({
            name,
            email,
            password,
            avatar
        })
        const salt= await bcrypt.genSalt(10)
        user.password= await bcrypt.hash(password, salt)
        await user.save()
        
        //jwt
        const payload= {
            user: {
                id: user.id
            }
        }
        
    }catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
});

module.exports= router;