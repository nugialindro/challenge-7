const { PlayerUser, PlayerUserHistory } = require("../models");

module.exports = {
  loginpage: (req, res) => {
    res.render("pages/login/login", { layout: "layouts/login" });
  },

  dashboard: async (req, res) => {
    const userdata = await PlayerUser.findAll();
    const jumlahUser = userdata.length;
    const recentGame = await PlayerUserHistory.findAll();

    res.render("pages/home/index", { jumlahUser, recentGame });
  },
};
