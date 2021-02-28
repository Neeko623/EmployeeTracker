INSERT INTO department (name)
VALUES 
('Marketing'),
('Finance'),
('Doctors'),
('Sales');

-- ROLES --
INSERT INTO employeerole (title, salary, department_id) 
VALUES 
("Manager", 450000, 1);
INSERT INTO employeerole (title, salary, department_id) 
VALUES 
("Accountant", 350000, 2);
INSERT INTO employeerole (title, salary, department_id) 
VALUES 
("Beauty Consultant", 400000, 3);
INSERT INTO employeerole (title, salary, department_id) 
VALUES 
("Aesthetic Doctors", 650000, 4);


-- EMPLOYEES --
INSERT INTO employee (firstname, lastname, role_id, manager_id) 
VALUES 
('Mae', 'Campbell',1,100);
INSERT INTO employee (firstname, lastname, role_id, manager_id) 
VALUES 
('Danna', 'Gaveston',2,200);
INSERT INTO employee (firstname, lastname, role_id, manager_id) 
VALUES 
('Olive', 'Patterson',3,300);
INSERT INTO employee (firstname, lastname, role_id, manager_id) 
VALUES 
('Katherine', 'McKenzie',4,400);
-- SELECTING FOR CREATING 
--TABLES IN OUR SQL WORKBENCH 
SELECT * FROM department;
SELECT * FROM employeerole;
SELECT * FROM employee;

