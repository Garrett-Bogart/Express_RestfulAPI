const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const port = 3001;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);

users = [];

students = [
  {
    name: "Forrest",
    studentId: "1234",
    grades: ["B", "A"],
  },
  {
    name: "Tim",
    studentId: "7564",
    grades: ["A", "C"],
  },
  {
    name: "Sarah",
    studentId: "4311",
    grades: ["A", "F"],
  },
];
//localhost:3001/students => student array
app.get("/students", (req, res) => res.json(students));

//localhost:3001/students/1
/*
{
    "name": "Tim",
    "studentId": "7564",
    "grades": [
        "A",
        "C"
    ]
}
*/
app.get("/students/:studentId", (req, res) => {
  res.send(students[req.params.studentId]);
});

//localhost:3001/students/search/Joe => []
/*localhost:3001/students/search/Tim => [
    {
        "name": "Tim",
        "studentId": "7564",
        "grades": [
            "A",
            "C"
        ]
    }
]*/
app.get("/students/search/:filter", (req, res) => {
  let filter = req.params.filter;
  let filtered = [];
  filtered = students.filter((student) => {
    return student.name == filter;
  });
  res.send(filtered);
});

app.get("/grades/:studentId", (req, res) => {
  let filter = req.params.studentId;
  let filtered = students.filter((student) => {
    return student.studentId == filter;
  });
  res.send(filtered);
});

//localhost:3001/grade body: {"id": "1234","grade":"c+"} => {"status": "success","message": "The grade has been added"}
//localhost:3001/grade body: {"id": "1254","grade":"c+"} => {"status": "failed","message": "student not found"}
app.post("/grade", (req, res) => {
  let result;
  const data = req.body;
  let found = students.find((student) => student.studentId == data.id);
  if (found == undefined) {
    result = {
      status: "failed",
      message: "student not found",
    };
    res.status(400);
  } else {
    found.grades.push(data.grade);
    result = {
      status: "success",
      message: "The grade has been added",
    };
  }
  res.json(result);
});

//localhost:3001/register body:{"username": "coolDude1","password": "password","email": "test@test.com"} =>   result = {status: "success",message: "The user has been added",}
app.post("/register", (req, res) => {
  let result;
  const data = req.body;
  let newUser = {
    username: data.username,
    password: data.password,
    email: data.email,
  };
  users.push(newUser);
  result = {
    status: "success",
    message: "The user has been added",
  };
  console.log(users);
  res.json(result);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
