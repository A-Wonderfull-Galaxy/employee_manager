--populate tables created from schema.sql --
INSERT INTO department(department_name)
VALUES
    ("DELIVERY")
    ("WAREHOUSE")
    ("ENGINEERING")
    ("SALES")
    ("LEGAL")
    ("MANAGMENT")
;

INSERT INTO roles(tile, salary, department_id)
VALUES
    ("FULFILLMENT DELIVERY", 50000, 1),
    ("FULFILLMENT SCHEDUALER", 60000, 1),
    ("FULFILLMENT PACKER", 45000, 2),
    ("FULFILLMENT PICKER", 50000, 2),
    ("FULFILLMENT LEAD", 55000, 2),
    ("ENGINEERING WORKER", 55000, 3),
    ("ENGINEERING LEAD", 75000, 3),
    ("SALES ACCOUNTING", 55000, 4),
    ("SALES CUSTOMER SERVICE", 40000, 4),
    ("SALES LEAD", 65000, 4),
    ("LEGAL WORKER", 75000, 5),
    ("LEGAL INTERN", 60000, 5),
    ("LEGAL LEAD", 95000, 5),
    ("WAREHOUSE MANAGER", 95000, 6),
    ("OFFICE MANAGER", 95000, 6),
    ("PLANT MANAGER", 120000, 6)
;

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
    ("Terry", "Reese", 1, null)
    ("Virgil", "Chapman", 2, null)
    ("Kadie", "Collier", 3, null)
    ("Daniela", "Hinton", 4, null)
    ("Andrew", "Haley", 5, null)
    ("Monica", "Larsen", 6, null)
    ("Becky", "Callahhan", 7, null)
    ("Aubrey", "Ratliff", 8, null)
    ("Andreas", "Devlin", 9, null)
    ("Wren", "Russo", 10, null)
    ("Sam", "Stewart", 11, null)
    ("Mabel", "Franks", 12, null)
    ("Yamato", "Booker", 13, null)
    ("Sami", "Buchanan", 14, 1)
    ("Aadil", "Kaur", 15, 2)
    ("Lawson", "Handley", 16, 3)
;