const User = require('../models/user')

exports.createUser = (req, res) => {
  const username = req.body.username
  User.findOneAndUpdate(
    {username: username},
    {
      $setOnInsert: {
        username: username,
      },
    },
    { upsert: true, new: true },
    (err, user) => {
      res.json({
        username: user.username,
        _id: user.id,
      })
    }
  )
}

exports.allUsers = (req, res) => {
  User.find({},
    (err, users) => {
      res.json(users.map( user => {
        return {
          username: user.username,
          _id: user.id,
        }
      }))
    }
  )
}