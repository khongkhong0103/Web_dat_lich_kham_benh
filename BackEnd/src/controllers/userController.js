let handleLogin = async (req, res) => {
  let email = req.body.email;
  // console.log("yourEmail", email);
  let password = req.body.password;

  //check email exits
  // compare password
  // return userInformation
  // access tokens:JWT Json web tokens

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameters",
    });
  }
  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errorCode,
    message: userData.errMessage,
    userData,
  });
};

module.exports = {
  handleLogin: handleLogin,
};
