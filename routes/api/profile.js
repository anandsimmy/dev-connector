const express= require('express');
const auth= require('../../middleware/auth');
const Profile= require('../../models/Profile');

const router= express.Router();

// @route GET api/profile/me
// @desc logged in users profile
// @access private
router.get('/me', auth, async(req, res)=> {
    try{
        const profile= await Profile.findOne({ user: req.user }).populate(
            'user',
            [ 'name', 'avatar' ]
        );
        if(!profile){
            return res.status(400).json({ msg: 'Profile does not exist' })
        }
        res.json(profile)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports= router;