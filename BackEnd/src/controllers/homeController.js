import db from "../models/index";
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

// object: {
//     key: '',
//     value: ''
// }
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  console.log(req.body);
  return res.send("post crud from");
};
let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  console.log("=============");
  console.log(data);
  console.log("=============");
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  console.log(userId);
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    // check user data not found
    // console.log("===========");
    // console.log(userData);
    // console.log("===========");
    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    // console.log(req.query.id);
    return res.send("User not found");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDService.updateUserDate(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUsers,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;

  if (id) {
    await CRUDService.deleteUserById(id);

    return res.send("Deleted user successfully");
  } else {
    return res.send("User not found");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
