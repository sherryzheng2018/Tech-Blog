const express = require('express');
const router = express.Router();
const {Blogpost,User} = require('../../models');

// get all blog posts
router.get("/",(req,res)=>{
    Blogpost.findAll().then(blogData=>{
        res.json(blogData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

// get blog posts by id
router.get("/:id",(req,res)=>{
    Blogpost.findByPk(req.params.id).then(singleBlog=>{
        if(singleBlog){
            res.json(singleBlog)
        } else {
            res.status(404).json({err:"no blog found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

// create a new blog post
router.post("/",(req,res)=>{
    Blogpost.create({
        title:req.body.title,
        content:req.body.content,
        userId: req.session.user.id
    }).then(newPost=>{
        res.json(newPost)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})


// delete a post by blog id
router.delete("/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(403).json({err:"Please login first!"})
    }
    User.findByPk(req.session.user.id).then(loggedInUser=>{
        loggedInUser.removeBlog(req.params.id).then(result=>{
            if(result){
                return res.json(result);
            } else {
                return res.status(404).json({msg:"No blog"})
            }
        }).catch(err=>{
            console.log(err);
            res.status(500).json({err})
        })
    })
})

// update a blog by id
router.put("/:id",(req,res)=>{
    Blogpost.update({
        title:req.body.title,
        content:req.body.content
    },{
        where:{
            id:req.params.id,
            userId:req.session.user.id
        }
    }).then(updatedData=>{
        if(updatedData[0]){
            res.json(updatedData)
        } else {
            res.status(404).json({err:"no such blog found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

// delte a post by id
// router.delete("/:id",(req,res)=>{
//     Blogpost.destroy({
//         where:{
//             id:req.params.id
//         }
//     }).then(deletedBlog=>{
//         if(deletedBlog){
//             res.json(deletedBlog)
//         } else {
//             res.status(404).json({err:"no such blog found!"})
//         }
//     }).catch(err=>{
//         console.log(err);
//         res.status(500).json({err})
//     })
// })

module.exports = router;