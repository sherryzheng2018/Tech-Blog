const express = require('express');
const router = express.Router();
const blogRoutes = require("./blogRoutes");
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");


router.use("/blogposts",blogRoutes);
router.use("/users",userRoutes);
router.use("/comments",commentRoutes);
router.get("/",(req,res)=>{
    res.send("hello from api!")
})

module.exports = router;