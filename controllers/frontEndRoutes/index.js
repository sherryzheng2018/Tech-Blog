const express = require('express');
const router = express.Router();
const {User,Comment,Blogpost}  = require("../../models");
const withAuth = require('../../util/auth')



// get all blog posts
router.get("/",(req,res)=>{
    Blogpost.findAll().then(blogData=>{
        console.log(blogData)
        console.log("=================")
        const hbsLCData = blogData.map(item=>item.get({plain:true}))
        // console.log(hbsLCData)
        return res.render("home",{
            blogposts:hbsLCData
        })
    })
})

// get blog post by id
router.get("/blogposts/:id", (req,res)=>{
    Blogpost.findByPk(req.params.id,{
        include:[{
            model:Comment,
            include:[User]
        }]
    }).then(blogData=>{
        const hbsData = blogData.get({plain:true})
        // console.log(hbsData);
        res.render("blogposts/single",hbsData);
    })
})

// get user profile 
router.get("/dashboard", withAuth, (req,res)=>{
    User.findByPk(req.session.user.id,{
        include:[Blogpost]
    }).then(userData=>{
        const hbsData = userData.get({plain:true})
        // console.log(hbsData);
        res.render("dashboard",hbsData);
    })
})


router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect(`/`)
    }
   return  res.render("login")
})

module.exports = router;