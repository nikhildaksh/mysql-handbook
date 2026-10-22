const p = x => ({ t: 'p', x }), h = x => ({ t: 'h', x }), c = x => ({ t: 'code', x }), ul = (...x) => ({ t: 'ul', x })
const tb = (head, ...rows) => ({ t: 'table', head, rows, isData: false })
const dt = (title, head, ...rows) => ({ t: 'table', title, head, rows, isData: true })
const n = x => ({ t: 'note', x })
const q = (...items) => ({ t: 'practice', items })

export const lectures = [
{ id: 1, title: 'Introduction to SQL & Installing MySQL', sub: 'What is SQL, DBMS vs RDBMS, SQL vs MySQL, and setup', blocks: [
  h('What is SQL?'),
  p('SQL (Structured Query Language) is the universal language used to store, query, update, and manage data in relational databases.'),
  ul(
    'Declarative: You tell MySQL WHAT data you want; it figures out HOW to fetch it.',
    'Universal Standard: Works across MySQL, PostgreSQL, Oracle, SQLite, and SQL Server.',
    'CRUD: Powers Create (INSERT), Read (SELECT), Update (UPDATE), and Delete (DELETE).'
  ),
  h('SQL vs MySQL: The Quick Difference'),
  tb(['Feature', 'SQL', 'MySQL'],
    ['What is it?', 'The query language itself (like English)', 'The database software engine that executes SQL'],
    ['Role', 'Syntax rules & instructions to query data', 'Stores data on disk, manages memory, runs queries'],
    ['Storage', 'Cannot store data on its own', 'Stores physical databases, tables, and records']
  ),
  h('The 5 Categories of SQL Commands'),
  tb(['Category', 'Name', 'What it Does', 'Core Commands'],
    ['DDL', 'Data Definition', 'Creates & alters table structures', 'CREATE, ALTER, DROP, TRUNCATE'],
    ['DML', 'Data Manipulation', 'Modifies actual data rows', 'INSERT, UPDATE, DELETE'],
    ['DQL', 'Data Query', 'Retrieves and filters data', 'SELECT'],
    ['DCL', 'Data Control', 'Manages permissions & security', 'GRANT, REVOKE'],
    ['TCL', 'Transaction Control', 'Manages transaction integrity', 'COMMIT, ROLLBACK']
  ),
  h('What is a DBMS vs RDBMS?'),
  p('A DBMS manages raw data. An RDBMS (like MySQL) organizes data into related tables with rows and columns linked by keys.'),
  tb(['Term', 'Meaning', 'Example'],
    ['Database', 'A container holding multiple tables', 'school_db'],
    ['Table', 'A 2D grid of related data', 'students'],
    ['Row (Record)', 'A single data entry', 'ID 101: Alice Smith'],
    ['Column (Field)', 'A specific attribute of each record', 'name, email, salary']
  ),
  h('MySQL Workbench vs CLI'),
  tb(['Tool', 'Interface', 'Best For'],
    ['MySQL CLI', 'Terminal / Command Line', 'Automation, server scripts, production SSH'],
    ['Workbench', 'Visual GUI with tabs & grids', 'Designing schemas, learning, querying visually']
  ),
  h('Windows / macOS Quick Setup'),
  ul(
    'Download installer from https://dev.mysql.com/downloads/installer/',
    'Choose Developer Default (installs Server + Workbench)',
    'Set a strong Root password (save it!) and keep default port 3306',
    'Open Workbench -> click "Local Instance 3306" -> enter password to start.'
  ),
  n('Port conflict? If port 3306 is in use (e.g. by XAMPP), change it to 3307 during setup.')
]},

{ id: 2, title: 'Linux (Ubuntu) Installation', sub: 'Terminal setup, security configuration and user creation', blocks: [
  p('In production, MySQL usually runs on a Linux cloud server. Here is the fast terminal setup:'),
  h('Step 1: Install MySQL Server'),
  c('sudo apt update\nsudo apt install mysql-server -y\nsudo systemctl status mysql'),
  h('Step 2: Secure the Installation'),
  p('Run the security wizard to remove anonymous users and disable remote root login:'),
  c('sudo mysql_secure_installation'),
  h('Step 3: Create a Dedicated User'),
  p('Log into MySQL as root, create your application user, and grant privileges:'),
  c("sudo mysql\n\nCREATE USER 'harry'@'localhost' IDENTIFIED BY 'StrongPass!123';\nGRANT ALL PRIVILEGES ON *.* TO 'harry'@'localhost' WITH GRANT OPTION;\nFLUSH PRIVILEGES;\nEXIT;"),
  h('Step 4: Login as the New User'),
  c('mysql -u harry -p'),
  tb(['Linux Command', 'Purpose'],
    ['sudo systemctl start mysql', 'Start the MySQL server'],
    ['sudo systemctl stop mysql', 'Stop the MySQL server'],
    ['sudo systemctl restart mysql', 'Restart MySQL after config changes'],
    ['sudo systemctl enable mysql', 'Auto-start MySQL on server boot']
  )
]},

{ id: 3, title: 'Databases, Tables and Data Types', sub: 'CREATE DATABASE, CREATE TABLE, types and constraints', blocks: [
  h('What is a Database & Table?'),
  ul(
    'Database = Folder (e.g. startersql)',
    'Table = File / Spreadsheet inside that folder (e.g. users)',
    'Rows = Records inside the table'
  ),
  h('Step 1: Create & Select Database'),
  c('CREATE DATABASE startersql;\nUSE startersql;'),
  h('What is a Constraint?'),
  p('A rule enforced on a column to block invalid, duplicate, or blank data at the database level.'),
  tb(['Constraint', 'What it Does', 'Example'],
    ['PRIMARY KEY', 'Uniquely identifies each row; never NULL', 'id INT PRIMARY KEY'],
    ['AUTO_INCREMENT', 'Generates next sequential number automatically (1, 2, 3...)', 'id INT AUTO_INCREMENT'],
    ['NOT NULL', 'Ensures field cannot be left blank', 'name VARCHAR(100) NOT NULL'],
    ['UNIQUE', 'Blocks duplicate entries across all rows', 'email VARCHAR(100) UNIQUE'],
    ['DEFAULT', 'Fallback value when none is provided on insert', 'created_at DEFAULT CURRENT_TIMESTAMP'],
    ['CHECK', 'Validates a custom rule', 'CHECK (salary > 0)']
  ),
  h('Common Data Types'),
  tb(['Type', 'Category', 'Description', 'Example'],
    ['INT', 'Numeric', 'Whole numbers', '42, 1005'],
    ['DECIMAL(10, 2)', 'Numeric', 'Exact money values (10 digits, 2 decimals)', '15000.50'],
    ['VARCHAR(100)', 'Text', 'Variable text up to 100 characters', "'Alice Smith'"],
    ['ENUM(...)', 'Choice', 'Restricted list of allowed options', "'Male', 'Female', 'Other'"],
    ['DATE', 'Date', 'Calendar date (YYYY-MM-DD)', "'1995-05-14'"],
    ['TIMESTAMP', 'Date/Time', 'Exact date & time (auto-tracked)', "'2025-01-15 09:30:00'"],
    ['BOOLEAN', 'Flag', 'TRUE (1) or FALSE (0)', 'TRUE']
  ),
  h('Step 2: Create the users Table'),
  c("CREATE TABLE users (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) UNIQUE NOT NULL,\n    gender ENUM('Male', 'Female', 'Other'),\n    date_of_birth DATE,\n    salary INT,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);"),
  p('Inspect the table blueprint:'),
  c('DESCRIBE users;'),
  tb(['Field', 'Type', 'Null', 'Key', 'Default', 'Extra'],
    ['id', 'int', 'NO', 'PRI', 'NULL', 'auto_increment'],
    ['name', 'varchar(100)', 'NO', '', 'NULL', ''],
    ['email', 'varchar(100)', 'NO', 'UNI', 'NULL', ''],
    ['gender', "enum('Male','Female','Other')", 'YES', '', 'NULL', ''],
    ['date_of_birth', 'date', 'YES', '', 'NULL', ''],
    ['salary', 'int', 'YES', '', 'NULL', ''],
    ['created_at', 'timestamp', 'NO', '', 'CURRENT_TIMESTAMP', 'DEFAULT_GENERATED']
  ),
  h('Step 3: Drop Database (Delete Everything)'),
  c('DROP DATABASE startersql;'),
  n('Warning: DROP DATABASE permanently deletes all tables and records inside it!')
]},

{ id: 4, title: 'Working with Tables', sub: 'SELECT basics, sample data setup, RENAME and ALTER TABLE', blocks: [
  h('Step 1: Populate Sample Data'),
  p('Run this command to insert our starting 5 users:'),
  c("INSERT INTO users (name, email, gender, date_of_birth, salary)\nVALUES\n('Alice Smith', 'alice@example.com', 'Female', '1995-05-14', 65000),\n('Bob Jones', 'bob@example.com', 'Male', '1990-11-23', 52000),\n('Charlie Brown', 'charlie@example.com', 'Other', '1988-02-17', 72000),\n('David Miller', 'david@example.com', 'Male', '2000-08-09', 48000),\n('Eva Green', 'eva@example.com', 'Female', '1993-12-30', 81000);"),
  dt('Table: users (Initial Records)',
    ['id', 'name', 'email', 'gender', 'date_of_birth', 'salary'],
    ['1', 'Alice Smith', 'alice@example.com', 'Female', '1995-05-14', '65000'],
    ['2', 'Bob Jones', 'bob@example.com', 'Male', '1990-11-23', '52000'],
    ['3', 'Charlie Brown', 'charlie@example.com', 'Other', '1988-02-17', '72000'],
    ['4', 'David Miller', 'david@example.com', 'Male', '2000-08-09', '48000'],
    ['5', 'Eva Green', 'eva@example.com', 'Female', '1993-12-30', '81000']
  ),
  h('Reading Data with SELECT'),
  p('All columns (*):'),
  c('SELECT * FROM users;'),
  p('Specific columns only (faster & cleaner):'),
  c('SELECT name, email, salary FROM users;'),
  dt('Output: SELECT name, email, salary FROM users',
    ['name', 'email', 'salary'],
    ['Alice Smith', 'alice@example.com', '65000'],
    ['Bob Jones', 'bob@example.com', '52000'],
    ['Charlie Brown', 'charlie@example.com', '72000'],
    ['David Miller', 'david@example.com', '48000'],
    ['Eva Green', 'eva@example.com', '81000']
  ),
  h('Renaming a Table'),
  c('RENAME TABLE users TO customers;\nRENAME TABLE customers TO users;'),
  h('Altering Table Structure (ALTER TABLE)'),
  p('Modify active table columns without losing existing data:'),
  c("-- Add a new column with default value\nALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT TRUE;\n\n-- Drop a column\nALTER TABLE users DROP COLUMN is_active;\n\n-- Modify column type or length\nALTER TABLE users MODIFY COLUMN name VARCHAR(150) NOT NULL;\n\n-- Move a column position\nALTER TABLE users MODIFY COLUMN email VARCHAR(100) FIRST;\n\n-- Rename a column\nALTER TABLE users RENAME COLUMN salary TO monthly_salary;\nALTER TABLE users RENAME COLUMN monthly_salary TO salary;")
]},

{ id: 5, title: 'Inserting Data', sub: 'INSERT INTO, single and multiple rows, defaults and auto-increment', blocks: [
  p('INSERT INTO adds new rows to a table.'),
  h('1. Best Practice: Specify Column Names'),
  p('Explicitly state which columns you are inserting into. Columns with AUTO_INCREMENT or DEFAULT can be omitted:'),
  c("INSERT INTO users (name, email, gender, date_of_birth, salary)\nVALUES ('Frank Wright', 'frank@example.com', 'Male', '1992-04-18', 59000);"),
  p('MySQL auto-generates id = 6 and current timestamp for created_at.'),
  h('2. Multi-Row Bulk INSERT (Faster)'),
  p('Insert multiple rows in one single query by separating tuples with commas:'),
  c("INSERT INTO users (name, email, gender, date_of_birth, salary)\nVALUES\n('Grace Hopper', 'grace@example.com', 'Female', '1994-10-09', 95000),\n('Henry Ford', 'henry@example.com', 'Male', '1985-07-30', 67000),\n('Ishaan Patel', 'ishaan@example.com', 'Male', '1998-01-22', 54000);"),
  dt('Table: users (After Bulk Insert)',
    ['id', 'name', 'email', 'gender', 'date_of_birth', 'salary'],
    ['1', 'Alice Smith', 'alice@example.com', 'Female', '1995-05-14', '65000'],
    ['2', 'Bob Jones', 'bob@example.com', 'Male', '1990-11-23', '52000'],
    ['3', 'Charlie Brown', 'charlie@example.com', 'Other', '1988-02-17', '72000'],
    ['4', 'David Miller', 'david@example.com', 'Male', '2000-08-09', '48000'],
    ['5', 'Eva Green', 'eva@example.com', 'Female', '1993-12-30', '81000'],
    ['6', 'Frank Wright', 'frank@example.com', 'Male', '1992-04-18', '59000'],
    ['7', 'Grace Hopper', 'grace@example.com', 'Female', '1994-10-09', '95000'],
    ['8', 'Henry Ford', 'henry@example.com', 'Male', '1985-07-30', '67000'],
    ['9', 'Ishaan Patel', 'ishaan@example.com', 'Male', '1998-01-22', '54000']
  ),
  n('Avoid positional INSERT (without column names): If table structure changes later, positional queries crash!')
]},

{ id: 6, title: 'SELECT, WHERE, ORDER BY and LIMIT', sub: 'Filtering rows, pattern matching, sorting, and pagination', blocks: [
  p('Querying specific rows and sorting data in MySQL.'),
  h('1. Filtering with WHERE'),
  c("-- Equal to\nSELECT name, salary FROM users WHERE gender = 'Female';\n\n-- Greater than / Less than\nSELECT name, salary FROM users WHERE salary >= 70000;\n\n-- Range (inclusive)\nSELECT name, salary FROM users WHERE salary BETWEEN 55000 AND 75000;\n\n-- List matching\nSELECT name, gender FROM users WHERE gender IN ('Female', 'Other');"),
  dt("Result: WHERE gender = 'Female'",
    ['name', 'salary'],
    ['Alice Smith', '65000'],
    ['Eva Green', '81000'],
    ['Grace Hopper', '95000']
  ),
  h('2. Pattern Matching with LIKE'),
  ul(
    '% = matches any sequence of characters',
    '_ = matches exactly one single character'
  ),
  c("-- Starts with 'A'\nSELECT name FROM users WHERE name LIKE 'A%';\n\n-- Ends with 'n'\nSELECT name FROM users WHERE name LIKE '%n';\n\n-- Contains 'ar'\nSELECT name FROM users WHERE name LIKE '%ar%';"),
  dt("Result: WHERE name LIKE '%ar%'",
    ['name'],
    ['Charlie Brown']
  ),
  h('3. AND / OR Combinations'),
  c("SELECT name, gender, salary FROM users\nWHERE gender = 'Male' AND salary > 55000;"),
  dt("Result: WHERE gender = 'Male' AND salary > 55000",
    ['name', 'gender', 'salary'],
    ['Frank Wright', 'Male', '59000'],
    ['Henry Ford', 'Male', '67000']
  ),
  h('4. Sorting with ORDER BY'),
  c("-- Highest salary first (DESC)\nSELECT name, salary FROM users ORDER BY salary DESC;\n\n-- Alphabetical (ASC, default)\nSELECT name FROM users ORDER BY name ASC;"),
  dt('Result: ORDER BY salary DESC (Top 4)',
    ['name', 'salary'],
    ['Grace Hopper', '95000'],
    ['Eva Green', '81000'],
    ['Charlie Brown', '72000'],
    ['Henry Ford', '67000']
  ),
  h('5. Pagination: LIMIT & OFFSET'),
  c("-- Page 1: 3 items\nSELECT name, salary FROM users ORDER BY salary DESC LIMIT 3 OFFSET 0;\n\n-- Page 2: next 3 items\nSELECT name, salary FROM users ORDER BY salary DESC LIMIT 3 OFFSET 3;"),
  q(
    { q: 'Fetch the 3 youngest users in the table.', a: 'SELECT name, date_of_birth FROM users\nORDER BY date_of_birth DESC\nLIMIT 3;' },
    { q: 'Find users earning between 50,000 and 70,000 whose name starts with B, C or D.', a: "SELECT * FROM users\nWHERE salary BETWEEN 50000 AND 70000\nAND (name LIKE 'B%' OR name LIKE 'C%' OR name LIKE 'D%');" }
  )
]},

{ id: 7, title: 'UPDATE: Modifying Data', sub: 'Modifying existing rows safely with WHERE and visual diffs', blocks: [
  p('UPDATE changes values in existing records.'),
  c('UPDATE table_name\nSET col1 = val1, col2 = val2\nWHERE condition;'),
  h('Example: Single Column Update'),
  c('UPDATE users\nSET salary = 58000\nWHERE id = 2;'),
  dt('Table: users (After updating id = 2)',
    ['id', 'name', 'email', 'salary'],
    ['1', 'Alice Smith', 'alice@example.com', '65000'],
    ['2', 'Bob Jones', 'bob@example.com', '58000 (Updated from 52k)'],
    ['3', 'Charlie Brown', 'charlie@example.com', '72000']
  ),
  h('Example: Multiple Columns at Once'),
  c("UPDATE users\nSET name = 'Alicia Smith', email = 'alicia@example.com'\nWHERE id = 1;"),
  h('Example: Calculation Updates (e.g. 10% Raise)'),
  c('UPDATE users\nSET salary = ROUND(salary * 1.10)\nWHERE salary < 60000;'),
  n('DANGER: Always use WHERE! Without WHERE, UPDATE overwrites every single row in the entire table! (MySQL Safe Updates Mode blocks unkeyed updates by default).'),
  q(
    { q: 'Increase salary by 5,000 for charlie@example.com.', a: "UPDATE users\nSET salary = salary + 5000\nWHERE email = 'charlie@example.com';" }
  )
]},

{ id: 8, title: 'DELETE: Removing Data', sub: 'DELETE, TRUNCATE, DROP and safe data deletion habits', blocks: [
  p('Removing data from MySQL.'),
  h('1. DELETE: Removes Specific Rows'),
  c('DELETE FROM users WHERE id = 3;'),
  dt('Table: users (After DELETE id = 3)',
    ['id', 'name', 'salary'],
    ['1', 'Alicia Smith', '65000'],
    ['2', 'Bob Jones', '58000'],
    ['4', 'David Miller', '48000']
  ),
  p('Row id = 3 (Charlie Brown) is permanently removed.'),
  h('2. DELETE vs TRUNCATE vs DROP TABLE'),
  tb(['Command', 'What it Does', 'AUTO_INCREMENT', 'Rollback?'],
    ['DELETE FROM table WHERE ...', 'Removes specific matching rows', 'Keeps current count', 'Yes (in transaction)'],
    ['TRUNCATE TABLE table', 'Wipes all rows fast; recreates empty table', 'Resets back to 1', 'No'],
    ['DROP TABLE table', 'Destroys entire table & structure completely', 'Destroyed', 'No']
  ),
  n('Best Practice: Before running DELETE, always run SELECT with the exact same WHERE clause to verify which rows will be affected!')
]},

{ id: 9, title: 'Constraints in Depth', sub: 'PRIMARY KEY, UNIQUE, NOT NULL, CHECK, DEFAULT rules', blocks: [
  p('Constraints enforce data integrity at the database engine level.'),
  h('1. PRIMARY KEY'),
  p('Uniquely identifies each row. Must be UNIQUE and NOT NULL. Only one primary key per table.'),
  c('CREATE TABLE products (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL\n);'),
  h('2. NOT NULL'),
  p('Blocks empty (NULL) values:'),
  c('ALTER TABLE users MODIFY COLUMN name VARCHAR(100) NOT NULL;'),
  h('3. UNIQUE'),
  p('Prevents duplicate values (allows multiple unique columns per table):'),
  c('ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);'),
  h('4. CHECK'),
  p('Validates that data satisfies a boolean rule before saving:'),
  c("ALTER TABLE users ADD CONSTRAINT chk_salary CHECK (salary >= 10000);\nALTER TABLE users ADD CONSTRAINT chk_dob CHECK (date_of_birth > '1950-01-01');"),
  h('5. DEFAULT'),
  p('Fills a fallback value when none is passed on insert:'),
  c("ALTER TABLE users ALTER COLUMN is_active SET DEFAULT TRUE;"),
  h('Constraints Quick Reference'),
  tb(['Constraint', 'Allows NULL?', 'Limit per Table', 'Common Use'],
    ['PRIMARY KEY', 'NO', '1 per table', 'id, order_id'],
    ['UNIQUE', 'YES', 'Unlimited', 'email, username, phone'],
    ['NOT NULL', 'NO', 'Unlimited', 'first_name, password_hash'],
    ['CHECK', 'YES', 'Unlimited', 'salary > 0, age >= 18'],
    ['DEFAULT', 'N/A', 'Unlimited', 'status = "Active", created_at']
  )
]},

{ id: 10, title: 'SQL Functions', sub: 'Aggregate, string, date, math, and conditional IF/CASE functions', blocks: [
  p('Built-in functions to transform and summarize data.'),
  h('1. Aggregate Functions (Summarize multiple rows)'),
  c('SELECT\n    COUNT(*) AS total_users,\n    MIN(salary) AS lowest_salary,\n    MAX(salary) AS highest_salary,\n    AVG(salary) AS avg_salary,\n    SUM(salary) AS total_payroll\nFROM users;'),
  dt('Output: Aggregate Functions',
    ['total_users', 'lowest_salary', 'highest_salary', 'avg_salary', 'total_payroll'],
    ['5', '48000', '81000', '63600.00', '318000']
  ),
  h('2. String Functions'),
  c("SELECT\n    name,\n    UPPER(name) AS uppercase_name,\n    LENGTH(name) AS char_count,\n    CONCAT(name, ' (', email, ')') AS contact_card\nFROM users LIMIT 2;"),
  dt('Output: String Functions',
    ['name', 'uppercase_name', 'char_count', 'contact_card'],
    ['Alice Smith', 'ALICE SMITH', '11', 'Alice Smith (alice@example.com)'],
    ['Bob Jones', 'BOB JONES', '9', 'Bob Jones (bob@example.com)']
  ),
  h('3. Date Functions'),
  c("SELECT\n    name,\n    YEAR(date_of_birth) AS birth_year,\n    TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age\nFROM users LIMIT 2;"),
  h('4. Conditional Logic: IF() and CASE'),
  c("SELECT\n    name,\n    salary,\n    IF(salary >= 70000, 'Senior', 'Standard') AS tier,\n    CASE\n        WHEN salary >= 80000 THEN 'Executive'\n        WHEN salary >= 60000 THEN 'Mid-Level'\n        ELSE 'Associate'\n    END AS rank_title\nFROM users;"),
  dt('Output: Conditional Logic',
    ['name', 'salary', 'tier', 'rank_title'],
    ['Alice Smith', '65000', 'Standard', 'Mid-Level'],
    ['Bob Jones', '58000', 'Standard', 'Associate'],
    ['Eva Green', '81000', 'Senior', 'Executive']
  )
]},

{ id: 11, title: 'Transactions and AutoCommit', sub: 'ACID principles, COMMIT, ROLLBACK and safe multi-statement operations', blocks: [
  p('A Transaction groups multiple SQL statements into one all-or-nothing unit of work.'),
  h('The Bank Transfer Scenario'),
  p('Transfer $500 from Alice to Bob:'),
  ul(
    'Step 1: Deduct $500 from Alice',
    'Step 2: Add $500 to Bob',
    'If server crashes after Step 1, money disappears unless wrapped in a transaction!'
  ),
  h('The 4 ACID Rules'),
  tb(['Rule', 'Meaning'],
    ['Atomicity', "'All or Nothing' - either both updates succeed, or all changes undo"],
    ['Consistency', 'Database constraints remain valid before and after'],
    ['Isolation', 'Concurrent transactions do not interfere with each other'],
    ['Durability', 'Committed data survives system crashes and reboots']
  ),
  h('Using COMMIT and ROLLBACK'),
  c("START TRANSACTION;\n\nUPDATE accounts SET balance = balance - 500 WHERE id = 101;\nUPDATE accounts SET balance = balance + 500 WHERE id = 102;\n\n-- If all good:\nCOMMIT;\n\n-- If an error happens:\nROLLBACK;"),
  dt('Initial Table: accounts',
    ['id', 'holder', 'balance'],
    ['101', 'Alice', '1500.00'],
    ['102', 'Bob', '800.00']
  ),
  p('With ROLLBACK, any uncommitted updates are canceled and original values are restored!'),
  n('AutoCommit: MySQL saves each query immediately by default (autocommit = 1). Use START TRANSACTION to control saves.')
]},

{ id: 12, title: 'PRIMARY KEY in Depth', sub: 'Surrogate vs natural keys, composite keys, and PRIMARY KEY vs UNIQUE', blocks: [
  p('A Primary Key uniquely identifies each row in a table.'),
  h('Surrogate Key vs Natural Key'),
  tb(['Type', 'Definition', 'Example', 'Verdict'],
    ['Surrogate Key', 'Artificial integer ID made purely for DB', 'id INT AUTO_INCREMENT', 'Best Practice (fast & immutable)'],
    ['Natural Key', 'Real-world identifier', 'Email, SSN, Passport No', 'Fragile (if user changes email, FKs break)']
  ),
  h('Composite Primary Key (Multi-Column)'),
  p('A primary key made of two or more columns combined together:'),
  c("CREATE TABLE enrollments (\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    enrolled_at DATE,\n    PRIMARY KEY (student_id, course_id)\n);"),
  p('Student 101 can enroll in Course 501, but cannot enroll in Course 501 twice!'),
  h('PRIMARY KEY vs UNIQUE'),
  tb(['Feature', 'PRIMARY KEY', 'UNIQUE'],
    ['How many?', 'Strictly 1 per table', 'Unlimited per table'],
    ['Allows NULL?', 'Never (NOT NULL)', 'Yes (unless marked NOT NULL)'],
    ['Purpose', 'Identifies the row entity', 'Prevents duplicate values']
  )
]},

{ id: 13, title: 'Foreign Keys', sub: 'Linking tables, referential integrity and ON DELETE actions', blocks: [
  p('A Foreign Key links a column in a child table to the primary key of a parent table.'),
  h('Step 1: Create Linked Tables'),
  c("CREATE TABLE users (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE addresses (\n    address_id INT AUTO_INCREMENT PRIMARY KEY,\n    user_id INT NOT NULL,\n    city VARCHAR(100) NOT NULL,\n    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\n);"),
  dt('Parent: users',
    ['id', 'name'],
    ['1', 'Aarav Sharma'],
    ['2', 'Sneha Patel']
  ),
  dt('Child: addresses (user_id points to users.id)',
    ['address_id', 'user_id', 'city'],
    ['101', '1 (Aarav)', 'Mumbai'],
    ['102', '1 (Aarav)', 'Bengaluru'],
    ['103', '2 (Sneha)', 'Kolkata']
  ),
  h('ON DELETE Actions'),
  tb(['Strategy', 'When Parent User is Deleted', 'Use Case'],
    ['CASCADE', 'Automatically deletes related child rows', 'User -> User Addresses, Order -> Order Items'],
    ['SET NULL', 'Keeps child rows, sets user_id to NULL', 'Employee -> Manager ID'],
    ['RESTRICT (Default)', 'Blocks deleting parent if children exist', 'Customer with active unpaid invoices']
  )
]},

{ id: 14, title: 'SQL JOINs', sub: 'INNER, LEFT, RIGHT and FULL OUTER JOIN with visual Venn comparisons', blocks: [
  p('JOIN combines rows from two tables using related columns.'),
  h('Source Tables'),
  dt('Table A: users',
    ['id', 'name'],
    ['1', 'Aarav'],
    ['2', 'Sneha'],
    ['3', 'Rajesh (No address)']
  ),
  dt('Table B: addresses',
    ['address_id', 'user_id', 'city'],
    ['101', '1', 'Mumbai'],
    ['102', '2', 'Kolkata'],
    ['103', '4 (user 4 does not exist in users)', 'Delhi']
  ),
  h('1. INNER JOIN (Matches Only)'),
  c('SELECT users.name, addresses.city\nFROM users\nINNER JOIN addresses ON users.id = addresses.user_id;'),
  dt('Result: INNER JOIN',
    ['name', 'city'],
    ['Aarav', 'Mumbai'],
    ['Sneha', 'Kolkata']
  ),
  h('2. LEFT JOIN (All Left + Matched Right)'),
  c('SELECT users.name, addresses.city\nFROM users\nLEFT JOIN addresses ON users.id = addresses.user_id;'),
  dt('Result: LEFT JOIN (Rajesh has NULL address)',
    ['name', 'city'],
    ['Aarav', 'Mumbai'],
    ['Sneha', 'Kolkata'],
    ['Rajesh', 'NULL']
  ),
  h('3. RIGHT JOIN (All Right + Matched Left)'),
  c('SELECT users.name, addresses.city\nFROM users\nRIGHT JOIN addresses ON users.id = addresses.user_id;'),
  dt('Result: RIGHT JOIN (Delhi has NULL user)',
    ['name', 'city'],
    ['Aarav', 'Mumbai'],
    ['Sneha', 'Kolkata'],
    ['NULL', 'Delhi']
  ),
  n('Memory trick: INNER = both sides match. LEFT = all left rows kept. RIGHT = all right rows kept.')
]},

{ id: 15, title: 'UNION and UNION ALL', sub: 'Combining query result sets vertically and rules of set operations', blocks: [
  h('JOIN vs UNION'),
  ul(
    'JOIN combines columns horizontally from related tables.',
    'UNION combines rows vertically from two query result sets.'
  ),
  h('Source Tables'),
  dt('Table: users (3 rows)',
    ['name', 'salary'],
    ['Alice Smith', '65000'],
    ['Bob Jones', '52000'],
    ['Charlie Brown', '72000']
  ),
  dt('Table: admin_users (3 rows)',
    ['name', 'salary'],
    ['Anil Kumar', '95000'],
    ['Pooja Sharma', '88000'],
    ['Alice Smith (Duplicate)', '90000']
  ),
  h('1. UNION (Removes Duplicates)'),
  c('SELECT name FROM users\nUNION\nSELECT name FROM admin_users;'),
  p('Alice Smith appears only once in the combined output.'),
  h('2. UNION ALL (Keeps Duplicates - Faster)'),
  c('SELECT name, salary, "User" AS role FROM users\nUNION ALL\nSELECT name, salary, "Admin" AS role FROM admin_users;'),
  dt('Result: UNION ALL with Role Tag',
    ['name', 'salary', 'role'],
    ['Alice Smith', '65000', 'User'],
    ['Bob Jones', '52000', 'User'],
    ['Charlie Brown', '72000', 'User'],
    ['Anil Kumar', '95000', 'Admin'],
    ['Pooja Sharma', '88000', 'Admin'],
    ['Alice Smith', '90000', 'Admin']
  ),
  n('Rules: Both queries must return the same number of columns with compatible data types.')
]},

{ id: 16, title: 'Self JOIN', sub: 'Joining a table to itself for hierarchical and referral data', blocks: [
  p('A Self JOIN joins a table with itself to query hierarchical relationships (referrals, managers, subcategories).'),
  h('Referral Data in users Table'),
  c("-- User 1 referred User 2 and User 3; User 2 referred User 4\nUPDATE users SET referred_by_id = 1 WHERE id IN (2, 3);\nUPDATE users SET referred_by_id = 2 WHERE id = 4;"),
  dt('Table: users with referred_by_id',
    ['id', 'name', 'referred_by_id'],
    ['1', 'Aarav', 'NULL (Direct signup)'],
    ['2', 'Sneha', '1 (Referred by Aarav)'],
    ['3', 'Rajesh', '1 (Referred by Aarav)'],
    ['4', 'David', '2 (Referred by Sneha)']
  ),
  h('The Query Using Aliases (u and ref)'),
  c("SELECT\n    u.id,\n    u.name AS user_name,\n    COALESCE(ref.name, 'Direct Signup') AS referred_by\nFROM users u\nLEFT JOIN users ref ON u.referred_by_id = ref.id;"),
  dt('Result: Self JOIN Referral Report',
    ['id', 'user_name', 'referred_by'],
    ['1', 'Aarav', 'Direct Signup'],
    ['2', 'Sneha', 'Aarav'],
    ['3', 'Rajesh', 'Aarav'],
    ['4', 'David', 'Sneha']
  )
]},

{ id: 17, title: 'Views', sub: 'Virtual tables, security masking, simplifying complex queries', blocks: [
  h('What is a View?'),
  p('A View is a saved SELECT query that behaves like a virtual table. It stores no physical data on disk and reads live data from the base tables.'),
  tb(['Benefit', 'Explanation'],
    ['Security / Data Masking', 'Exposes public columns while hiding passwords and salaries'],
    ['Query Simplification', 'Replaces 4-table complex joins with a simple SELECT * FROM view_name'],
    ['Reusable Logic', 'Ensures all developers calculate metrics the exact same way']
  ),
  h('Create & Query a View'),
  c("CREATE VIEW high_earners AS\nSELECT id, name, salary\nFROM users\nWHERE salary >= 70000;\n\n-- Query it just like a table\nSELECT * FROM high_earners;"),
  dt('Output: high_earners View',
    ['id', 'name', 'salary'],
    ['3', 'Charlie Brown', '72000'],
    ['5', 'Eva Green', '81000'],
    ['7', 'Grace Hopper', '95000']
  ),
  p('If you update salary in the users table, the view reflects the update live without recreation!'),
  c('DROP VIEW IF EXISTS high_earners;')
]},

{ id: 18, title: 'Indexes', sub: 'B-Trees, performance optimization, composite indexes and leftmost prefix', blocks: [
  h('What is an Index?'),
  p('Like an index at the back of a book, a database index (B+Tree) provides fast O(log N) lookups instead of scanning every row from 1 to 1,000,000 (Full Table Scan).'),
  tb(['Operation', 'Without Index', 'With B-Tree Index'],
    ['Search user by email in 1,000,000 rows', 'Reads 1,000,000 rows (~800ms)', 'Reads ~4 index nodes (~2ms)'],
    ['ORDER BY created_at', 'Slow in-memory filesort', 'Instant (reads pre-sorted index)']
  ),
  h('1. Single-Column Index'),
  c("CREATE INDEX idx_users_email ON users(email);\nSELECT * FROM users WHERE email = 'bob@example.com';"),
  h('2. Composite Index & The Leftmost Prefix Rule'),
  c("CREATE INDEX idx_gender_sal ON users(gender, salary);"),
  tb(['Query WHERE Clause', 'Uses Index?', 'Reason'],
    ["WHERE gender = 'Male' AND salary > 60000", 'YES', 'Uses both columns in order'],
    ["WHERE gender = 'Female'", 'YES', 'Matches leftmost column (gender)'],
    ['WHERE salary > 60000', 'NO', 'Missing leftmost column (gender); index ignored!']
  ),
  n('Trade-off: Indexes speed up SELECT, but slow down INSERT/UPDATE/DELETE because indexes must be updated on disk. Index only columns frequently used in WHERE, JOIN, and ORDER BY.')
]},

{ id: 19, title: 'Subqueries', sub: 'Scalar subqueries, multi-row IN, correlated subqueries and derived tables', blocks: [
  p('A subquery is a query nested inside another query: (SELECT ...). The inner query executes first.'),
  h('1. Scalar Subquery (Single Value)'),
  p('Find users earning above the company average:'),
  c('SELECT name, salary\nFROM users\nWHERE salary > (SELECT AVG(salary) FROM users);'),
  dt('Output: Above Average Earners',
    ['name', 'salary'],
    ['Charlie Brown', '72000'],
    ['Eva Green', '81000'],
    ['Grace Hopper', '95000']
  ),
  h('2. Multi-Row Subquery with IN'),
  p('Find users referred by someone earning 80,000+:'),
  c('SELECT name, referred_by_id\nFROM users\nWHERE referred_by_id IN (\n    SELECT id FROM users WHERE salary >= 80000\n);'),
  h('3. Subquery in SELECT (Computed Column)'),
  c('SELECT name, salary,\n    (SELECT ROUND(AVG(salary)) FROM users) AS company_avg\nFROM users;')
]},

{ id: 20, title: 'GROUP BY and HAVING', sub: 'Bucketing records, aggregate calculations, HAVING vs WHERE, ROLLUP', blocks: [
  p('GROUP BY collapses rows sharing identical values into summary buckets, then calculates aggregate metrics.'),
  dt('Sample: users with departments',
    ['name', 'dept', 'salary'],
    ['Aarav', 'Engineering', '80000'],
    ['Sneha', 'Engineering', '75000'],
    ['Rajesh', 'Marketing', '72000'],
    ['David', 'Marketing', '48000'],
    ['Eva', 'Engineering', '85000']
  ),
  h('1. Grouping with Aggregates'),
  c('SELECT dept, COUNT(*) AS count, AVG(salary) AS avg_sal\nFROM users\nGROUP BY dept;'),
  dt('Result: GROUP BY dept',
    ['dept', 'count', 'avg_sal'],
    ['Engineering', '3', '80000.00'],
    ['Marketing', '2', '60000.00']
  ),
  h('2. WHERE vs HAVING (Golden Rule)'),
  tb(['Clause', 'When it Filters', 'Can use aggregate functions (AVG, COUNT)?'],
    ['WHERE', 'Filters individual rows BEFORE grouping', 'NO'],
    ['HAVING', 'Filters aggregated groups AFTER grouping', 'YES']
  ),
  c("-- Keep only departments where average salary exceeds 70,000:\nSELECT dept, AVG(salary) AS avg_sal\nFROM users\nGROUP BY dept\nHAVING AVG(salary) > 70000;"),
  dt('Result: HAVING avg_sal > 70000',
    ['dept', 'avg_sal'],
    ['Engineering', '80000.00']
  ),
  h('3. WITH ROLLUP (Subtotals & Grand Total)'),
  c('SELECT dept, COUNT(*), SUM(salary) FROM users GROUP BY dept WITH ROLLUP;')
]},

{ id: 21, title: 'Stored Procedures', sub: 'Reusable server-side SQL programs, parameters and DELIMITER', blocks: [
  p('A Stored Procedure is a compiled, reusable SQL program stored directly on the database server.'),
  ul(
    'Efficiency: 1 CALL command executes multiple queries without network round-trips.',
    'Security: Grant users EXECUTE rights without direct table access.'
  ),
  h('Why DELIMITER //?'),
  p('MySQL normally stops at the first semicolon (;). Changing the delimiter temporarily lets MySQL parse the whole procedure block as one unit:'),
  c("DELIMITER //\n\nCREATE PROCEDURE AddUser(\n    IN p_name VARCHAR(100),\n    IN p_email VARCHAR(100),\n    IN p_salary INT\n)\nBEGIN\n    INSERT INTO users (name, email, salary)\n    VALUES (p_name, p_email, p_salary);\nEND //\n\nDELIMITER ;"),
  h('Calling & Dropping'),
  c("CALL AddUser('Kiran Sharma', 'kiran@example.com', 72000);\n\n-- Drop procedure\nDROP PROCEDURE IF EXISTS AddUser;")
]},

{ id: 22, title: 'Triggers', sub: 'Automated event-driven database execution, audit logs and NEW vs OLD', blocks: [
  p('A Trigger runs automatically in response to an INSERT, UPDATE, or DELETE event on a table.'),
  h('NEW vs OLD Keywords'),
  tb(['Event', 'NEW (New values)', 'OLD (Original values)'],
    ['INSERT', 'Available (NEW.col)', 'NULL'],
    ['UPDATE', 'Available (NEW.col)', 'Available (OLD.col)'],
    ['DELETE', 'NULL', 'Available (OLD.col)']
  ),
  h('Practical Example: Automatic Audit Log'),
  c("-- Step 1: Create audit table\nCREATE TABLE audit_log (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    user_name VARCHAR(100),\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Step 2: Create trigger\nDELIMITER //\nCREATE TRIGGER after_user_register\nAFTER INSERT ON users\nFOR EACH ROW\nBEGIN\n    INSERT INTO audit_log (user_name) VALUES (NEW.name);\nEND //\nDELIMITER ;"),
  p('Now, whenever a user is inserted into users, a record is logged to audit_log automatically!'),
  c('DROP TRIGGER IF EXISTS after_user_register;')
]},

{ id: 23, title: 'More on MySQL', sub: 'Logical operators, LIKE wildcards, DISTINCT, TRUNCATE and ALTER options', blocks: [
  h('1. Logical Operators'),
  tb(['Operator', 'Condition for TRUE', 'Example'],
    ['AND', 'All conditions must be TRUE', "gender = 'Male' AND salary > 60000"],
    ['OR', 'At least one condition TRUE', "gender = 'Male' OR gender = 'Other'"],
    ['NOT', 'Reverses condition', "NOT gender = 'Female'"]
  ),
  h('2. LIKE Wildcards'),
  tb(['Wildcard', 'Meaning', 'Pattern', 'Matches'],
    ['%', '0 or more characters', "'A%'", "'Alice', 'Alex'"],
    ['_', 'Exactly 1 character', "'_a%'", "'David', 'Sarah' (second letter is a)"]
  ),
  h('3. DISTINCT (Remove Duplicates)'),
  c('SELECT DISTINCT gender FROM users;'),
  dt('Result: DISTINCT gender',
    ['gender'],
    ['Female'],
    ['Male'],
    ['Other']
  ),
  h('4. Master Comparison: TRUNCATE vs DELETE vs DROP'),
  tb(['Feature', 'DELETE', 'TRUNCATE', 'DROP'],
    ['Command Type', 'DML (Data)', 'DDL (Structure)', 'DDL (Structure)'],
    ['WHERE clause?', 'YES (selective)', 'NO (wipes all)', 'NO (destroys table)'],
    ['AUTO_INCREMENT', 'Keeps counter', 'Resets to 1', 'Destroyed'],
    ['Speed', 'Slow (row by row)', 'Instant', 'Instant']
  ),
  h('5. MODIFY vs CHANGE vs RENAME'),
  tb(['Clause', 'Can Rename?', 'Can Change Type?', 'Example'],
    ['RENAME COLUMN', 'YES', 'NO', 'ALTER TABLE users RENAME COLUMN phone TO mobile;'],
    ['MODIFY COLUMN', 'NO', 'YES', 'ALTER TABLE users MODIFY COLUMN salary BIGINT;'],
    ['CHANGE COLUMN', 'YES', 'YES', 'ALTER TABLE users CHANGE COLUMN city location VARCHAR(150);']
  )
]}
]
