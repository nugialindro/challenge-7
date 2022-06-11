const { PlayerUser } = require("../models");

module.exports = {
  loginpage: (req, res) => {
    res.render("pages/login/login", { layout: "layouts/login" });
  },

  dashboard: async (req, res) => {
    const userdata = await PlayerUser.findAll();
    const jumlahUser = userdata.length;
    // const leaderboard = await UserGameHistory.findAll({
    //   order: [["score", "desc"]],
    // });
    res.render("pages/home/index", { jumlahUser });
  },
};
