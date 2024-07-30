import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "device-manager",
  password: "postgres",
  port: 5432,
});

//get all mitarbeiter
const getMitarbeiter = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM mitarbeiter", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

const getGeraete = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM geraete", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//create a new mitarbeiter record in the database
const createMitarbeiter = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;
    pool.query(
      "INSERT INTO mitarbeiter (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new mitarbeiter has been added: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};
//delete a mitarbeiter
const deleteMitarbeiter = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM mitarbeiter WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Mitarbeiter deleted with ID: ${id}`);
      }
    );
  });
};

const deleteGeraet = (code) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM geraete WHERE code = $1",
      [code],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Mitarbeiter deleted with code: ${code}`);
      }
    );
  });
};

//update a mitarbeiter record
const updateMitarbeiter = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;
    pool.query(
      "UPDATE mitarbeiter SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Mitarbeiter updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

const updateGeraet = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;
    pool.query(
      "UPDATE geraete SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Gerät updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export default {
  getMitarbeiter,
  getGeraete,
  createMitarbeiter,
  deleteMitarbeiter,
  deleteGeraet,
  updateMitarbeiter,
  updateGeraet,
};
