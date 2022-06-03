const { UserGame, UserGameBiodata, UserGameHistory } = require("../models");
const dummyAdmin = [];

module.exports = {
  loginpage: (req, res) => {
    res.render("pages/login/login", { layout: "layouts/login" });
  },

  loginadmin: (req, res) => {
    const { email, password } = req.body;

    dummyAdmin.push({
      email,
      password,
    });
    console.log(dummyAdmin);
    if (email === "admin@admin.com" && password === "admin") {
      res.redirect("/admin/");
    } else {
      res.redirect("/");
    }
  },
  dashboard: async (req, res) => {
    const userdata = await UserGame.findAll();
    const jumlahUser = userdata.length;
    const leaderboard = await UserGameHistory.findAll({
      order: [["score", "desc"]],
    });
    res.render("pages/home/index", { jumlahUser, leaderboard });
  },
};
