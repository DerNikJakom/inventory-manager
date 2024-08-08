import express from "express";
import deviceDB from "./deviceDB.js";

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", (req, res) => {
  deviceDB
    .getMitarbeiter()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/geraete", (req, res) => {
  deviceDB
    .getAllGeraete()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/geraete/user/:id", (req, res) => {
  deviceDB
    .getGeraeteOfUser(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/geraete/:code", (req, res) => {
  deviceDB
    .getSpecificGeraet(req.params.code)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/geraete/:code/:id", (req, res) => {
  const hexcode = req.params.code;
  const mitarbeiterID = req.params.id;
  deviceDB
    .updateGeraet(hexcode, mitarbeiterID)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/mitarbeiter", (req, res) => {
  deviceDB
    .createMitarbeiter(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/mitarbeiter/:id", (req, res) => {
  deviceDB
    .deleteMitarbeiter(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.put("/mitarbeiter/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  deviceDB
    .updateMitarbeiter(id, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}.`);
});
