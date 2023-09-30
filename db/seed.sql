INSERT INTO departments (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1,2),
       ('Mike', 'Chan', 2,1),
       ('Ashley', 'Rodriguez', 3,1),
       ('Kevin', 'Tupik', 4),1,
       ('Malia', 'Brown', 4,3),
       ('Sarah', 'Lourd', 3,3),
       ('Tom', 'Allen', 3),
       ('Tina', 'Lee', 2),
       ('Mark', 'Taylor', 1),
       ('John', 'Doe', 1);