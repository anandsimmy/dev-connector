const express= require('express');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const config= require('config');
const { body, validationResult }= require('express-validator');
const auth= require('../../middleware/auth');
const User= require('../../models/User');

const router= express.Router();

// @PROTECTED-ROUTE GET api/auth
// @access public

router.get('/', auth, async (req, res)=> {
    try{
        const user= await User.findById(req.user).select('-password');
        res.send(user)
    }catch(err){
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
});

// @route POST api/auth
// @desc login users and get token
// @access public

router.post('/', [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password is required').exists()
], async (req, res)=> {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const { email, password }= req.body
        let user= await User.findOne({ email })
        if(!user){
            return res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] })
        }

        const isMatch= await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] })
        }
        
        //jwt
        const payload= {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err
                res.json({ token })
            })
    }catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
});

module.exports= router;