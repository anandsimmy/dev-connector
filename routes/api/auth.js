const express= require('express');

const router= express.Router();

// @route GET api/auth
// @access public
router.get('/', (req, res)=> {
    res.send('Auth route')
});

module.exports= router;