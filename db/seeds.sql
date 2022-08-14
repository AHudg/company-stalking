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
        ('Jayci', 'Potts', 1, 1, 3),
        ('Connor', 'Dusek', 1, 1, 3),
        ('Erin', 'Culler', 2, 1, 1),
        ('Karen', 'Johnston', 3, 2, 6),
        ('Ishmael', 'Blackwood', 3, 2, 6),
        ('Katie', 'Kubes', 4, 2, 1),
        ('Aaliya', 'Johnson', 5, 3, 9),
        ('Mikey', 'Argeta', 5, 3, 9),
        ('Francesco', 'Gianetti', 6, 3, 1),
        ('Asia', 'Kucera', 7, 4, 12),
        ('Brian', 'Barta', 7, 4, 12),
        ('Rachel', 'Polak', 8, 4, 1),
        ('Zachary', 'Stavinoha', 9, 5, 15),
        ('Lissa', 'Blackert', 9, 5, 15),
        ('Andrew', 'Hudgins', 10, 5, 1);
