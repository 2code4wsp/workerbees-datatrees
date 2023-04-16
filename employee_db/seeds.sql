USE employee_db;

INSERT INTO department (department_name) 
VALUES ("HR"), ("Finance"), ("Sales"), ("Legal"), ("Engineering"), ("Marketing");

INSERT INTO role (title, salary, department_id) 
VALUES ("HR manager",160000, 1), ("CPA", 120000, 2), ("Sales lead", 80000, 3), ("Lawyer", 120000, 4), ("Lead Engineer", 160000, 5), ("Marketing Consultant", 45000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Fred", "Truss", 1, NULL), ("Jen", "Hester", 2, 1), ("Harry", "Troon", 3, 1), ("Sebastian", "Pruitt", 4, 1), ("Kelley", "Stewart", 5, 1), ("Anthony", "Spencer", 6, 1);
