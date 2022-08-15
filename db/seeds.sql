INSERT INTO department (dept_name)
VALUES
    ('Finance'),
    ('Marketing'),
    ('Sales'),
    ('Human Resources'),
    ('Engineering');

INSERT INTO roles (title, salary, dept_id)
VALUES
    ('Assistant Accountant', 80000, 1),
    ('Senior Accounts Manager', 120000, 1),
    ('Market Analyst', 60000, 2),
    ('Marketing Manager', 75000, 2),
    ('Sales Representative', 50000, 3),
    ('District Sales Manager', 75000, 3),
    ('Staffing Coordinator', 45000, 4),
    ('HR Director', 90000, 4),
    ('Software Engineer', 75000, 5),
    ('VP of Engineering', 130000, 5);

    INSERT INTO employee (first_name, last_name, role_id, dept_id, manager_id)
    VALUES
        ('Erin', 'Culler', 2, 1, NULL),
        ('Katie', 'Kubes', 4, 2, NULL),
        ('Francesco', 'Gianetti', 6, 3, NULL),
        ('Rachel', 'Polak', 8, 4, NULL),
        ('Andrew', 'Hudgins', 10, 5, NULL),
        ('Jayci', 'Potts', 1, 1, 1),
        ('Connor', 'Dusek', 1, 1, 1),
        ('Karen', 'Johnston', 3, 2, 2),
        ('Ishmael', 'Blackwood', 3, 2, 2),
        ('Aaliya', 'Johnson', 5, 3, 3),
        ('Mikey', 'Argeta', 5, 3, 3),
        ('Asia', 'Kucera', 7, 4, 4),
        ('Brian', 'Barta', 7, 4, 4),
        ('Zachary', 'Stavinoha', 9, 5, 5),
        ('Lissa', 'Blackert', 9, 5, 5);