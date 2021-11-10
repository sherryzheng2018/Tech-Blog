const User = require("./User");
const Blogpost = require("./Blogpost");
const Comment = require("./Comment");

User.hasMany(Blogpost,{
    onDelete:"CASCADE"
});

Blogpost.belongsTo(User,{
    onDelete:"CASCADE"
});

User.hasMany(Comment,{
    onDelete:"CASCADE"
})

Comment.belongsTo(User,{
    onDelete:"CASCADE"
})

Blogpost.hasMany(Comment,{
    onDelete:"CASCADE"
});

Comment.belongsTo(Blogpost,{
    onDelete:"CASCADE"
})

module.exports={
    User,
    Blogpost,
    Comment
};