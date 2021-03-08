const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});


router.get(
  "/github",
  passport.authenticate('github', { scope: [ 'user:email' ] }
  )
);

router.get('/github/callback',
  passport.authenticate(
      'github',
      // 실패 시 로그인페이지로 다시 이동
      { failureRedirect: 'auth/login' }),
    // 성공 시 dashboard 이동
      (req, res) => {
        res.redirect('/dashboard');
      }
);





module.exports = router;
