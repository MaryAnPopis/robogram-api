const express = require("express");
const router = express.Router();
const db = require("../conn");

/**
 * Get all the users
 */
router.get("/", (req, res) => {
  let sql = "SELECT * from user";
  db.query(sql, (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.error(`GET ERROR ${err}`);
      throw err;
    }
  });
});

/**
 * Get one user by id
 * @param id user id
 */
router.get("/:id", (req, res) => {
  let sql = `SELECT * from user where id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.err(`GET/:id error ${err}`);
      throw err;
    } else {
      res.send(result);
    }
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
  db.query(sql, user, (err, results) => {
    if (err) throw err;
    res.status(200).json({ insertId: results.insertId });
  });
});

router.post("/autho", (req, res) => {
  let user = {
    username: req.body.username,
    password: req.body.password
  };
  let sql = `SELECT id FROM user WHERE
  username= "${user.username}" AND password="${user.password}"`;
  db.query(sql, user, (err, results) => {
    if (err) throw err;
    results[0] == null
      ? res.status(404).json({ found: false, id: results })
      : res.status(200).json({ found: true, id: results[0].id });
  });
});

module.exports = router;
