const mysql = require("mysql");

// Start a connection with mysql
const db = mysql.createConnection({
  host: "robogram.ckcm8ttzwplv.us-west-2.rds.amazonaws.com",
  user: "masteruser",
  password: "FvK9TKtqC2tqHHec",
  database: "robogram"
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Database connected..");
});

module.exports = db;
