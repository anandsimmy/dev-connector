const express= require('express');
const router= express.Router();
const { body, validationResult }= require('express-validator');
const auth= require('../../middleware/auth');
const Post= require('../../models/Post');
const User= require('../../models/User');

// @route POST api/posts
// @desc Add new post
// @access private
router.post('/',[auth, [
    body('text', 'Text is required').not().isEmpty()
]], async (req, res)=> {
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user= await User.findById(req.user.id)

        const newPost= new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        const post= await newPost.save()
        res.json(post)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

module.exports= router;