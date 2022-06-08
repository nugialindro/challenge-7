const { UserGame, UserGameBiodata } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("../lib/passport");

module.exports = {
  registerpage: (req, res) => {
    res.render("pages/register/register", { layout: "layouts/login" });
  },

  register: async (req, res, next) => {
    try {
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
      res.redirect("/login");
    } catch (err) {
      next(err);
    }
  },

  login: passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
    failureFlash: true,
  }),

  // authenticate: async ({ email, password }) => {
  //   try {
  //     const user = await UserGame.findOne({ where: { email } });
  //     if (!user) return Promise.reject("User not found!");
  //     const isPasswordValid = await bcrypt.compare(password, UserGame.password);
  //     if (!isPasswordValid) return Promise.reject("Wrong password");
  //     return Promise.resolve(user);
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // },
};
