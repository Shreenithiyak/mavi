import db from "../config/db.js";

export const createUserModel = (name, email) => {

  return new Promise((resolve, reject) => {

    const sql =
      "INSERT INTO users (name, email) VALUES (?, ?)";

    db.query(sql, [name, email], (err, result) => {

      if (err) {
        reject(err);
      } else {
        resolve(result);
      }

    });

  });

};

export const getUsersModel = () => {

  return new Promise((resolve, reject) => {

    const sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {

      if (err) {
        reject(err);
      } else {
        resolve(result);
      }

    });

  });

};