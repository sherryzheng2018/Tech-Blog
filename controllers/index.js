const express = require('express');
const router = express.Router();
const apiRoutes = require("./api")
const appRoutes = require("./frontEndRoutes")


router.use("/api",apiRoutes)
router.use("/",appRoutes)

router.get("/sessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;