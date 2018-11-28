const mysql = require("mysql");

// Start a connection with mysql
const db = mysql.createConnection({
  host: "robogram.ckcm8ttzwplv.us-west-2.rds.amazonaws.com",
  user: "masteruser",
  password: "FvK9TKtqC2tqHHec",
  database: "robogram",
  port: 3306
});

module.exports = db;
