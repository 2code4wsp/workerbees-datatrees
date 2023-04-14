USE employee_db;

INSERT INTO department (department_name) VALUES ("HR"), ("Finance"), ("Sales");
INSERT INTO role (title, salary, department_id) VALUES ("HR manager",80000, 1), ("CPA", 120000, 2), ("Sales lead", 100000, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Fred", "Truss", 1, NULL), ("Jen", "Hester", 2, 1), ("Harry", "John", 3, 1);
