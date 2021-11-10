const express = require("express");
const router = express.Router();
const { Comment } = require("../../models");
const withAuth = require('../../util/auth')

// get all comments
router.get("/", (req, res) => {
  Comment.findAll()
    .then(commentData => {
      res.json(commentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

// get comment by id
router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id)
    .then(singleComment => {
      if (singleComment) {
        res.json(singleComment);
      } else {
        res.status(404).json({ err: "no such comment found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

// create new comment
router.post("/", withAuth, (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ err: "Please login first" });
  }
  Comment.create({
    comment: req.body.comment,
    userId: req.session.user.id,
    blogPostId: req.body.blogPostId 
  })
    .then(newComment => {
      res.json(newComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

// update a comment by id
router.put("/:id", withAuth, (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ err: "Please login first" });
  }
  Comment.findByPk(req.params.id)
    .then(foundCom => {
      if (req.session.user.id !== foundCom.UserId) {
        return res.status(403).json({ err: "not your comment!" });
      }

      Comment.update(
        {
          comment: req.body.comment,
          BlogPostId: req.body.blogPostId
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
        .then(updatedData => {
          if (updatedData[0]) {
            res.json(updatedData);
          } else {
            res.status(404).json({ err: "no such comment found!" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ err });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

// delete comment by id
router.delete("/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ err: "Please login first"  });
  }
  Comment.findByPk(req.params.id).then(foundCom => {
    if (req.session.user.id !== foundCom.UserId) {
      return res.status(403).json({ err: "not your comment!" });
    }
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(delComment => {
        if (delComment) {
          res.json(delComment);
        } else {
          res.status(404).json({ err: "no such comment found!" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err });
      });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ err });
  });;
});

module.exports = router;
