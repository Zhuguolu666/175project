const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.send('this is my first time test express111 123141421 !');
});


module.exports = router;
