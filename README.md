# Express_RestfulAPI

#Student Table

CREATE TABLE students( ID SERIAL PRIMARY KEY, studentID VARCHAR(30), name VARCHAR(30));

INSERT INTO students (studentID, name) VALUES ('1234','tim'), ('4321', 'mit');

#Grades Table

CREATE TABLE grades ( ID SERIAL PRIMARY KEY, studentID VARCHAR(30), grade VARCHAR(2));

INSERT INTO grades (studentID, grade) VALUES ('1234','A'), ('4321', 'F'),('1234','B');

#Users Table

CREATE TABLE users ( ID SERIAL PRIMARY KEY, email VARCHAR(30), password VARCHAR(30));
