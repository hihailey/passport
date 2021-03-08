const express = require("express");
const router = express.Router();
const { ensureAuthenticated, checkAdmin } = require("../middleware/checkAuth");

//this file is not ejs file
//anyone see this page (even if you are not logged in)

router.get("/", (req, res) => {
  res.send("welcome");  
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", checkAdmin, (req, res) => {
  getSessions()
  .then(sessionData => {
    res.render("admin", {
      user: req.user,
      sessionData
    });
  });
});

router.get("/admin/revoke", checkAdmin, (req, res) => {
  revokeSessions()
  .then(sessionData => {
    res.render("admin", {
      user: req.user,
      sessionData
    });
  });
});





module.exports = router;
