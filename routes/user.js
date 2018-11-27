const express = require("express");
const router = express.Router();
const db = require("../conn");

/**
 * Get all the users
 */
router.get("/", (req, res) => {
  let sql = "SELECT * from user";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

/**
 * Get one user by id
 * @param id user id
 */
router.get("/:id", (req, res) => {
  let sql = `SELECT * from user where id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

/**
 * Update a user
 * @param id user id to update
 */
router.patch("/:id", (req, res) => {
  const updateOps = req.body;

  let sql = `UPDATE user SET ? WHERE id = ${req.params.id}`;
  db.query(sql, updateOps, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

/**
 * Delete a single user from the database
 * @param id user id to delete
 */
router.delete("/:id", (req, res) => {
  let sql = `DELETE FROM user WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

/**
 * Post a user to the database
 * @param fullname
 * @param username
 * @param password
 * @param email
 * @param avatar
 */
router.post("/", (req, res) => {
  let user = {
    fullname: req.body.fullname,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    avatar: req.body.avatar
  };
  let sql = "INSERT INTO user SET ?";
  db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
