const User = require("../model/userModel");

exports.getAll = function (req, res) {
  User.get(function (err, events) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      res.json({
        message: "Users Received !",
        data: events,
      });
    }
  });
};

exports.create = async function (req, res) {
  console.log(req.body);
  var user = await User.findOne({ username: req.body.username });

  user = user ? user : new User();
  user.username = req.body.username;
  user.publicKey = req.body.publicKey;

  user.save(function (err, userResult) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      res.json({
        message: "Users Created !",
        data: userResult,
      });
    }
  });
};

exports.fineOne = async function (req, res) {
  var user = await User.findOne({ username: req.params.username });

  if (!user) {
    res.status(404).send("Not found");
  } else {
    res.json({
      message: "Users Found !",
      data: user,
    });
  }
};

exports.removeAll = async function (req, res) {
  await User.remove({});
  res.json({
    message: "All Users removed !",
    data: user,
  });
};
