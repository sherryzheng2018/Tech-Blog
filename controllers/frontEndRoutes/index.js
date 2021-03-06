const express = require('express');
const router = express.Router();
const {User,Comment,Blogpost}  = require("../../models");
const withAuth = require('../../util/auth')
const dateFormatterHelper = require('../../util/dateUtil')




// get all blog posts
router.get("/",(req,res)=>{
    console.log(req.session.user)
    console.log(1111111111111111111111111111)
    Blogpost.findAll({
        include:[{model:User}]
    }).then(blogData=>{
        console.log("=================")
        const hbsLCData = blogData.map(item=>item.get({plain:true}))
        // console.log(hbsLCData)
        res.render("home",{
            blogposts:hbsLCData,
            helpers: {
                dateFormatterHelper
              }
        })
    })
})

// get blog post by id
router.get("/blogposts/:id", (req,res)=>{
    Blogpost.findByPk(req.params.id,{
        include:[
            {
                model:Comment,
                include:[{
                    model: User,
                }]
            },
            {
                model:User,
                attributes: { exclude: ['password'] },
            }
    ]
    }).then(blogData=>{
        const hbsData = blogData.get({plain:true})
        // console.log(hbsData);
        res.render("single",{
            hbsData:hbsData,
            helpers: {
                dateFormatterHelper
              }
        });
    })
})

// update post
router.get("/blogposts/:id/edit", (req,res)=>{
    Blogpost.findByPk(req.params.id,{
        include:[
            {
                model:Comment,
                include:[{
                    model: User,
                }]
            },
            {
                model:User,
                attributes: { exclude: ['password'] },
            }
    ]
    }).then(blogData=>{
        const hbsData = blogData.get({plain:true})
        console.log(hbsData.title);
        res.render("newPost",{
            hbsData:hbsData,
            isEdit: true,
            formId: "editPost"
        });
    })
})

// get user profile 
router.get("/dashboard", withAuth, (req,res)=>{
    console.log(req.session.user.id)
    console.log(1111111111111111111111111111)
    User.findByPk(req.session.user.id,{
        include:[Blogpost]
    }).then(userData=>{
        const hbsData = userData.get({plain:true})
        console.log(hbsData);
        res.render("home",{
            blogposts:hbsData.blogposts,
            isSelf: true,
            isDashboard: true,
            helpers: {
                dateFormatterHelper
              }
        });
    })
})

router.get("/newpost", withAuth, (req,res)=>{

res.render("newPost", {formId:"createPost"});
    
})


router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect(`/`)
    }
   return  res.render("login")
})

router.get('*',(req,res)=>{
    res.redirect("/")
})

module.exports = router;