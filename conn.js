const mysql = require("mysql2");

// Start a connection with mysql
// const db = mysql.createConnection({
//   host: "robogramdb.ckcm8ttzwplv.us-west-2.rds.amazonaws.com",
//   user: "masteradmin",
//   password: "FvK9TKtqC2tqHHec",
//   database: "robogramdb",
//   port: 3306,
//   connectTimeout: 30000
// });

// db.connect(function(err) {
//   if (err) {
//     console.error(err);
//     return;
//   } else {
//     console.log("database is connected...");
//   }
// });

const pool = mysql.createPool({
  host: "robogramdb.ckcm8ttzwplv.us-west-2.rds.amazonaws.com",
  user: "masteradmin",
  password: "FvK9TKtqC2tqHHec",
  database: "robogramdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
