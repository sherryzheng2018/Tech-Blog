const sequelize = require("../config/connection")
const {Blogpost,User,Comment} = require("../models")
const blogpost = require("./blogPost.json")
const userData = require("./user.json")
const commentData = require("./comment.json")

const seedMe = async ()=>{
    await sequelize.drop();
    await sequelize.sync({force:true});
    //first seed table without foreigh key constraint
    await User.bulkCreate(userData,{individualHooks:true});
    console.log('\n-----seeded users!-----\n')

    //then seed table with foreigh key constraint that is already seeded
    await Blogpost.bulkCreate(blogpost);
    console.log('\n-----seeded blogs!-----\n')

    await Comment.bulkCreate(commentData);
    console.log('\n-----seeded comments!-----\n')
    process.exit(0);
}

seedMe()