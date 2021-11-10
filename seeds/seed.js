const sequelize = require("../config/connection")
const {Blogpost,User,Comment} = require("../models")
const blogpost = require("./blogPost.json")
const userData = require("./user.json")
const commentData = require("./comment.json")

const seedMe = async ()=>{
    await sequelize.sync({force:true});
    
    await Blogpost.bulkCreate(blogpost);
    console.log('\n-----seeded blogs!-----\n')

    await User.bulkCreate(userData,{individualHooks:true});
    console.log('\n-----seeded users!-----\n')

    await Comment.bulkCreate(commentData);
    console.log('\n-----seeded comments!-----\n')
    process.exit(0);
}

seedMe()