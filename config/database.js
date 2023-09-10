const { Sequelize } = require("sequelize");

const db = new Sequelize("tugasexpressmysql", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    console.log("Connection succesfully");
  } catch (error) {
    console.error("Unable connect", error);
  }
})();

module.exports = db;
