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

const getAllGeraete = async () => {
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

const getSpecificGeraet = (code) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT geraete.mitarbeiter_id, mitarbeiter.vorname, mitarbeiter.nachname, geraete.name, geraete.hersteller, geraete.modell, geraete.seriennummer, geraete.produktnummer, geraete.code FROM geraete INNER JOIN mitarbeiter ON geraete.mitarbeiter_id = mitarbeiter.id WHERE code = $1",
      [code],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

const getGeraeteOfUser = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT geraete.mitarbeiter_id, mitarbeiter.vorname, mitarbeiter.nachname, geraete.name, geraete.hersteller, geraete.modell, geraete.seriennummer, geraete.produktnummer, geraete.code FROM geraete INNER JOIN mitarbeiter ON geraete.mitarbeiter_id = mitarbeiter.id WHERE mitarbeiter_id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

const createMitarbeiter = (body) => {
  return new Promise(function (resolve, reject) {
    const { vorname, nachname, email, passwort } = body;
    console.log(body);
    if (Object.keys(body).length > 0) {
      pool.query(
        "INSERT INTO mitarbeiter (vorname, nachname, email, passwort) VALUES ($1, $2, $3, $4) RETURNING *",
        [vorname, nachname, email, passwort],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(
              `Backend: A new mitarbeiter has been added: ${JSON.stringify(
                results.rows[0]
              )}`
            );
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    } else {
      console.error("No or wrong input given");
    }
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

const updateGeraet = (code, mitarbeiterID) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "UPDATE geraete SET mitarbeiter_id = $1 WHERE code = $2 RETURNING *",
      [mitarbeiterID, code],
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
  getAllGeraete,
  getGeraeteOfUser,
  getSpecificGeraet,
  updateGeraet,
  createMitarbeiter,
};
