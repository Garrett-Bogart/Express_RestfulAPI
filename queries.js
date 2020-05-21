const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "students",
  password: "1234",
  port: 5432,
});

const getStudents = (request, response) => {
  pool.query("SELECT * FROM students ORDER BY id ASC;", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getGrades = (request, response) => {
  pool.query("SELECT * FROM grades ORDER BY id ASC;", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const studentSearch = (request, response) => {
  const id = request.params.id;
  pool.query("SELECT * FROM students WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    let filtered = response.status(200).json(results.rows);
  });
};

const gradeSearch = (request, response) => {
  const id = request.params.id;
  pool.query(
    "SELECT * FROM grades WHERE studentID = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      let filtered = response.status(200).json(results.rows);
    }
  );
};

const insertGrade = (request, response) => {
  const { id, grade } = request.body;
  pool.query(
    "INSERT INTO grades (studentID, grade) VALUES ($1, $2)",
    [id, grade],
    (error, results) => {
      if (error) {
        throw error;
      }
      let filtered = response.status(200).json("Grade added");
    }
  );
};

const createUser = (request, response) => {
  const { email, password } = request.body;
  pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2)",
    [email, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      let filtered = response.status(200).json("user added");
    }
  );
};

module.exports = {
  getStudents,
  getGrades,
  studentSearch,
  gradeSearch,
  insertGrade,
  createUser,
};
