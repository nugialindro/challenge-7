const { UserGame, UserGameBiodata } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  registerpage: (req, res) => {
    res.render("pages/register/register", { layout: "layouts/login" });
  },

  register: async (req, res) => {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const userGame = await UserGame.create({
      username: req.body.username,
      email: req.body.email,
      password: encryptedPassword,
    });
    await UserGameBiodata.create({
      userGameId: userGame.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
    });
    res.redirect("/");
  },
};
