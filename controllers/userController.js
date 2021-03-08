const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

//find or create new user

const getUserByGitHubIdOrCreate = (profile) => {
  let user = userModel.findId(profile.id);
  if (user) {
    return user;
  }
  let createdUser = userModel.createUserWithGithubId(profile);

  return createdUser;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGitHubIdOrCreate
};
