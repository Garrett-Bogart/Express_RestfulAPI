const db = require("./queries");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const port = 3001;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);

app.get("/students", db.getStudents);
app.get("/grades", db.getGrades);
app.get("/students/:id", db.studentSearch);
app.get("/grades/:id", db.gradeSearch);
app.post("/grades/", db.insertGrade);
app.post("/register/", db.createUser);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
