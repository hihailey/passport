const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController");
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();
//const userModel = require ('../models/userModel')


const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);



const githubLogin = new GitHubStrategy(
  {
  clientID: "d5e968f78e336bd461b8",
  clientSecret: "67dcb90bf34028a72da65dfbff0fe1b5dc6b71f0",
  callbackURL: "http://localhost:8000/auth/github/callback"
},
  function (accessToken, refreshToken, profile, done) {
  let user = userController.getUserByGitHubIdOrCreate(profile);
  return done(null, user);
}
);

//쿠키에 user.id를 담음
// serialization 어떤 정보를 쿠키에게 주느냐
passport.serializeUser(function (user, done) {
  done(null, user.id);
}); 


passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);
module.exports = passport.use(githubLogin);
