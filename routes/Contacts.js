const express = require('express');
const router = express.Router();



router.route('/')
.get((req, res) =>{
    res.send("Contacts Page")
})



module.exports = router