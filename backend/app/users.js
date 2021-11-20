const express = require('express');
const User = require('../models/User');
const auth = require("../middleware/auth");

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const userData = {
      username: req.body.username,
      password: req.body.password,
    };

    const user = new User(userData);

    user.generateToken();
    await user.save();
    res.send(user);
  } catch(error) {
    res.status(400).send(error);
  }
});

router.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(401).send({message: 'error yes'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(401).send({message: 'error pas'});
  }

  user.generateToken();
  await user.save({validateBeforeSave: false});

  res.send({message: 'Username and password correct!', user});
});

router.post('/secret', auth, async (req, res) => {
  res.send({
    message: 'Secret message',
    username: req.user.username,
  });
});

router.delete('/sessions', async (req, res) => {
  try {
    const token = req.get('Authorization');
    const message = {message: 'Success'};

    if (!token) res.send(message);

    const user = await User.findOne(({token}));

    if (!user) res.send(message);

    user.generateToken();
    await user.save({validateBeforeSave: false});
    res.send(message);
  } catch (e) {

  }
});

module.exports = router;





















