const express = require('express');
const router = express.Router();
const {Blogpost,User} = require('../../models');

// get all blog posts
router.get("/",(req,res)=>{
    Blogpost.findAll().then(laCroixData=>{
        res.json(laCroixData)
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

// create new blog post
router.post("/",(req,res)=>{
    Blogpost.create({
        title:req.body.title,
        content:req.body.content
    }).then(newPost=>{
        res.json(newPost)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

// create a new blog by id
router.post("/blogpost/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(403).json({err:"not logged in!"})
    }
    User.findByPk(req.session.user.id).then(loggedInUser=>{
        loggedInUser.addFavorite(req.params.id).then(result=>{
           res.json(result)
        }).catch(err=>{
            console.log(err);
            res.status(500).json({err})
        })
    })
})

router.delete("/blog/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(403).json({err:"not logged in!"})
    }
    User.findByPk(req.session.user.id).then(loggedInUser=>{
        loggedInUser.removeFavorite(req.params.id).then(result=>{
            if(result){
                return res.json(result);
            } else {
                return res.status(404).json({msg:"not favorited"})
            }
        }).catch(err=>{
            console.log(err);
            res.status(500).json({err})
        })
    })
})

router.put("/:id",(req,res)=>{
    LaCroix.update({
        flavor:req.body.flavor,
        image:req.body.image
    },{
        where:{
            id:req.params.id
        }
    }).then(updatedData=>{
        if(updatedData[0]){
            res.json(updatedData)
        } else {
            res.status(404).json({err:"no such flavor found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

router.delete("/:id",(req,res)=>{
    LaCroix.destroy({
        where:{
            id:req.params.id
        }
    }).then(deletedLacroix=>{
        if(deletedLacroix){
            res.json(deletedLacroix)
        } else {
            res.status(404).json({err:"no such flavor found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

module.exports = router;