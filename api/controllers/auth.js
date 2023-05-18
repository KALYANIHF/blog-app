import { db } from "../db.js";
import bcrypt from "bcryptjs";
//register
export const register = (req, res) => {
  // if (db.connect()) {
  //   console.log("connected");
  // } else {
  //   console.log("the connection is not establish");
  // }
  //CHECK EXISTING USER
  const query1 = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(query1, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) {
      return res.status(409).json("User already exists");
    }
    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const query2 =
      "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const VALUES = [req.body.username, req.body.email, hash];
    db.query(query2, [VALUES], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created");
    });
  });
};
//login
export const login = (req, res) => {
  res.json("from controller auth login");
};
//logout
export const logout = (req, res) => {
  res.json("from controller auth logout");
};
