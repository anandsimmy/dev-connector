const express= require('express');
const request= require('request');
const config= require('config');
const auth= require('../../middleware/auth');
const Profile= require('../../models/Profile');
const User= require('../../models/User');
const { body, validationResult }= require('express-validator');

const router= express.Router();

// @route GET api/profile/me
// @desc logged in users profile
// @access private
router.get('/me', auth, async(req, res)=> {
    try{
        const profile= await Profile.findOne({ user: req.user.id }).populate(
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

// @route POST api/profile
// @desc create users profile
// @access private
router.post('/', [auth, [
    body('status', 'Status is required').not().isEmpty(),
    body('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors })
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    }= req.body;

    //creating ProfileObject
    const profileFields= {}
    profileFields.user= req.user.id;
    if(company) profileFields.company= company;
    if(location) profileFields.location= location;
    if(bio) profileFields.bio= bio;
    if(status) profileFields.status= status;
    if(githubusername) profileFields.githubusername= githubusername;
    if(website) profileFields.website= website;
    if(skills){
        profileFields.skills= skills.split(',').map(skill => skill.trim());
    }

    //creating social object
    profileFields.social= {}
    if(facebook) profileFields.social.facebook= facebook;
    if(youtube) profileFields.social.youtube= youtube;
    if(twitter) profileFields.social.twitter= twitter;
    if(instagram) profileFields.social.instagram= instagram;
    if(linkedin) profileFields.social.linkedin= linkedin;

    try{
        let profile= await Profile.findOne({ user: req.user.id });

        //Update existing profile if profile is already present
        if(profile){
            profile= await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true })
            return res.json(profile);
        }

        //Create new profile
        profile= new Profile(profileFields);

        await profile.save();

        res.json(profile)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
});

// @route GET api/profile
// @desc all users profile
// @access public
router.get('/', async (req, res) => {
    try{
        const profiles= await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    }catch(err){
        console.error(err.message)
        res.status(500).json('Server Error');
    }

});

// @route GET api/profile/user/:user_id
// @desc get profile of single user from userId
// @access public
router.get('/user/:user_id', async (req, res) => {
    try{
        const profile= await Profile.findOne({ user: req.params.user_id })
        if(!profile) return res.status(400).json({ msg: 'Profile not found' })
        res.json(profile)
    }catch(err){
        console.error(err.message)
        if(err.kind=='ObjectId') return res.status(400).json({ msg: 'Profile not found' })
        res.status(500).json('Server Error');
    }

});

// @route DELETE api/profile/
// @desc delete profile and user
// @access private
router.delete('/',auth, async (req, res) => {
    try{
        //Remove profile
        await Profile.findOneAndRemove({ user: req.user.id })
        
        //Remove user
        await User.findOneAndRemove({ _id: req.user.id })
        res.json({ msg: 'User removed' })
    }catch(err){
        console.error(err.message)
        res.status(500).json('Server Error');
    }

});

// @route PUT api/profile/experience
// @desc add job experience
// @access private
router.put('/experience', [ auth,[
    body('title', 'Title is required').not().isEmpty(),
    body('company', 'Company is required').not().isEmpty(),
    body('from', 'From is required').not().isEmpty()
]], async (req, res) => {
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        title,
        company,
        current,
        from,
        description
    }= req.body;
    const newExp= {
        title,
        company,
        current,
        from,
        description
    }
    try{
        const profile= await Profile.findOne({ user: req.user.id })
        
        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)
    }catch(err){
        console.error(err.message)
        res.status(500).json('Server Error');
    }

});

// @route DELETE api/profile/experience/:exp_id
// @desc delete job experience
// @access private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile= await Profile.findOne({ user: req.user.id })
        
        //getting index of experience to be removed
        const removeIndex= profile.experience.map(item => item.id).indexOf(req.params.exp_id)

        profile.experience.splice(removeIndex, 1)

        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).json('Server Error');
    }
})

// @route PUT api/profile/education
// @desc add job education
// @access private
router.put('/education', [ auth,[
    body('school', 'School is required').not().isEmpty(),
    body('degree', 'Degree is required').not().isEmpty(),
    body('fieldofstudy', 'Field of study is required').not().isEmpty(),
    body('from', 'From is required').not().isEmpty()
]], async (req, res) => {
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        school,
        degree,
        fieldofstudy,
        current,
        from,
        description
    }= req.body;
    const newEdu= {
        school,
        degree,
        fieldofstudy,
        current,
        from,
        description
    }
    try{
        const profile= await Profile.findOne({ user: req.user.id })
        
        profile.education.unshift(newEdu)
        await profile.save()
        res.json(profile)
    }catch(err){
        console.error(err.message)
        res.status(500).json('Server Error');
    }

});

// @route DELETE api/profile/education/:edu_id
// @desc delete job education
// @access private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile= await Profile.findOne({ user: req.user.id })
        
        //getting index of education to be removed
        const removeIndex= profile.education.map(item => item.id).indexOf(req.params.edu_id)

        profile.education.splice(removeIndex, 1)

        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).json('Server Error');
    }
})

// @route GET api/profile/github/:username
// @desc get github repos
// @access public
router.get('/github/:username', async (req, res) => {
    try {
        const options= {
            uri: `https://api.github.com/users/${req.params.username}/repos?sort=created:asc&per_page=5
            &client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }
        request(options, (error, response, body) => {
            if(error) console.error(error)

            if(response.statusCode!=200){
                return res.status(404).json({ msg: 'No github profile found' })
            }

            res.json(JSON.parse(body))
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports= router;