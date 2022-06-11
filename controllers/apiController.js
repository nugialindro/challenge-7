const { PlayerUser } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await PlayerUser.create({
        username: req.body.username,
        email: req.body.email,
        password: encryptedPassword,
      });
      res.json(user);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  login: async (req, res) => {
    const user = await PlayerUser.authenticate(req.body);
    const { id, username } = user;
    res.json({
      id,
      username,
      accessToken: user.generateToken(),
    });
  },

  index: async (req, res) => {
    const data = await PlayerUser.findAll();
    res.status(200).json(data);
  },
};
