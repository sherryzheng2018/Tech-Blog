const express = require("express");
const router = express.Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

// get all users
router.get("/", (req, res) => {
  User.findAll()
    .then(UserData => {
      res.json(UserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

// logout user
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// get user by id
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then(singleUser => {
      if (singleUser) {
        res.json(singleUser);
      } else {
        res.status(404).json({ err: "no such user found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

// create a new user
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(newUser => {
      req.session.user = {
        id: newUser.id,
        username: newUser.username
      };
      res.json(newUser);
    })
    .catch(err => {
      console.log(err);
      req.session.destroy(()=>{
        res.status(500).json({ err });
      })
    });
});


router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(foundUser => {
      if (!foundUser) {
        return req.session.destroy(() => {
          return res.status(401).json({ err: "invalid username/password" });
        });
      }
      if (!req.body.password) {
        return req.session.destroy(() => {
          return res.status(401).json({ err: "invalid username/password" });
        });
      }
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.user = {
          id: foundUser.id,
          username: foundUser.username
        };
        return res.json({
          id:foundUser.id,
          username:foundUser.username,
        });
      } else {
        return req.session.destroy(() => {
          return res.status(401).json({ err: "invalid username/password" });
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

// update user by id
router.put("/:id", (req, res) => {
  User.update(
    {
      username: req.body.username,
      password: req.body.password
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
        res.status(404).json({ err: "no such user found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

// delete user by id
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(deletedUser => {
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res.status(404).json({ err: "no such user found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

module.exports = router;
