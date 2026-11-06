const p = x => ({ t: 'p', x }), h = x => ({ t: 'h', x }), c = x => ({ t: 'code', x }), ul = (...x) => ({ t: 'ul', x })
const tb = (head, ...rows) => ({ t: 'table', head, rows, isData: false })
const dt = (title, head, ...rows) => ({ t: 'table', title, head, rows, isData: true })
const n = x => ({ t: 'note', x })
const q = (...items) => ({ t: 'practice', items })

export const lectures = [

// =====================================================================
{ id: 1, title: `Introduction to SQL & Installing MySQL`, sub: `Why databases exist, SQL vs MySQL, DBMS vs RDBMS, and setup`, blocks: [

  h(`First, the Problem: Why Do We Need a Database?`),
  p(`Imagine you run a coaching institute. At first you note down 20 students in a notebook or an Excel sheet. Easy.`),
  p(`Now you have 50,000 students. You want to find one student by roll number, change a phone number, see who has not paid fees, and let 10 teachers do this at the same time. A notebook or Excel will become slow, messy and risky.`),
  p(`A database solves this. It stores a huge amount of data in an organised way, finds things in milliseconds, lets many people use it at once, and keeps the data safe.`),

  h(`Basic Terms (Theory)`),
  tb([`Term`, `Meaning in simple words`, `Example`],
    [`Data`, `Raw facts`, `Alice, 25, alice@example.com`],
    [`Database`, `A container that stores related data (like a folder)`, `school_db`],
    [`DBMS`, `Database Management System: software that lets you create, store, organise, find and manage data. It acts as a bridge between you and the database.`, `File-based systems, MySQL`],
    [`RDBMS`, `A DBMS that stores data in tables that are linked to each other using keys`, `MySQL, PostgreSQL, Oracle`],
    [`SQL`, `The language you use to talk to the database`, `SELECT * FROM students;`],
    [`MySQL`, `A popular free RDBMS software that understands SQL`, `Used by many websites and apps`]
  ),

  h(`What is SQL?`),
  p(`SQL (Structured Query Language) is the language used to store, read, change and delete data in a relational database.`),
  ul(
    `Declarative: you tell MySQL WHAT data you want, not HOW to find it. MySQL figures out the HOW.`,
    `Universal: the same basic SQL works in MySQL, PostgreSQL, Oracle, SQLite and SQL Server.`,
    `CRUD: it covers Create (INSERT), Read (SELECT), Update (UPDATE) and Delete (DELETE).`
  ),

  h(`SQL vs MySQL: The Quick Difference`),
  p(`Think of SQL as the language (like Hindi or English) and MySQL as the person who understands that language and does the work for you.`),
  tb([`Feature`, `SQL`, `MySQL`],
    [`What is it?`, `The query language itself`, `The database software that runs your SQL`],
    [`Role`, `Rules and instructions to talk to data`, `Stores data on disk, manages memory, executes queries`],
    [`Storage`, `Cannot store data by itself`, `Stores the actual databases, tables and rows`]
  ),

  h(`Features of MySQL`),
  ul(
    `Open source and free to use.`,
    `High performance and reliable.`,
    `Works on Windows, Linux and macOS.`,
    `Strong security and user authentication.`
  ),

  h(`How Data Looks Inside MySQL`),
  p(`Data is stored in tables, just like an Excel sheet. A database holds many tables.`),
  dt(`Table: students`,
    [`id`, `name`, `email`],
    [`101`, `Alice Smith`, `alice@example.com`],
    [`102`, `Bob Jones`, `bob@example.com`]
  ),
  tb([`Term`, `Meaning`, `In the table above`],
    [`Database`, `Container of tables`, `school_db (the whole thing)`],
    [`Table`, `A grid of related data`, `students`],
    [`Row (Record)`, `One single entry`, `101, Alice Smith, alice@example.com`],
    [`Column (Field)`, `One attribute of every record`, `name`]
  ),

  h(`The 5 Categories of SQL Commands`),
  p(`SQL commands are grouped by the type of work they do. You do not need to memorise all commands now, just understand the groups.`),
  tb([`Category`, `Full Name`, `What it does`, `Commands`],
    [`DDL`, `Data Definition`, `Creates or changes the structure (tables, columns)`, `CREATE, ALTER, DROP, TRUNCATE`],
    [`DML`, `Data Manipulation`, `Adds, changes or deletes the data inside tables`, `INSERT, UPDATE, DELETE`],
    [`DQL`, `Data Query`, `Reads and filters data`, `SELECT`],
    [`DCL`, `Data Control`, `Controls who is allowed to do what`, `GRANT, REVOKE`],
    [`TCL`, `Transaction Control`, `Saves or undoes a group of changes`, `COMMIT, ROLLBACK`]
  ),
  n(`Easy way to remember: DDL = the structure (the empty shelves), DML = the things placed on the shelves, DQL = looking at the shelves.`),

  h(`What is MySQL Workbench?`),
  p(`MySQL Workbench is a visual tool for working with MySQL. You can design databases, write SQL queries, manage servers, take backups and monitor performance, all with a graphical interface instead of only typing in a black terminal.`),
  tb([`Tool`, `Interface`, `Best for`],
    [`MySQL CLI`, `Terminal / command line`, `Automation, servers, working over SSH`],
    [`Workbench`, `Visual app with tabs and grids`, `Learning, designing tables, running queries visually`]
  ),

  h(`Installing on Windows / macOS`),
  ul(
    `Download the installer from https://dev.mysql.com/downloads/installer/`,
    `Run it and choose Developer Default (this installs the Server and Workbench together).`,
    `Follow the setup wizard.`,
    `Set a root password when asked. Save it somewhere, you will need it every time.`,
    `Keep the default port 3306.`,
    `Finish the installation and open MySQL Workbench.`,
    `Click on "Local Instance 3306" and enter your password to connect.`
  ),
  n(`Port conflict? If port 3306 is already used (for example by XAMPP), choose 3307 during setup.`),

  h(`Your Very First Query`),
  p(`Open a new query tab in Workbench, type this and press the lightning button:`),
  c(`SELECT VERSION();\nSELECT 'Hello SQL';`),
  p(`If you see the MySQL version and the text Hello SQL, your setup works.`),

  h(`Quick Recap`),
  ul(
    `A database stores data safely and finds it fast.`,
    `SQL is the language, MySQL is the software that runs it.`,
    `MySQL is an RDBMS: data lives in tables made of rows and columns.`,
    `SQL commands are grouped as DDL, DML, DQL, DCL and TCL.`
  ),
  q(
    { q: `Which category does the UPDATE command belong to?`, a: `DML (Data Manipulation Language), because it changes data inside a table.` },
    { q: `Is MySQL a language or software?`, a: `Software (an RDBMS). The language is SQL.` },
    { q: `What do we call one horizontal entry in a table?`, a: `A row (record).` }
  )
]},

// =====================================================================
{ id: 2, title: `Linux (Ubuntu) Installation`, sub: `Install MySQL on a Linux server, secure it and create a user`, blocks: [

  h(`Why Learn This?`),
  p(`On your laptop you used an installer with Next, Next, Finish. But real websites run on Linux servers in the cloud, where there is no mouse and no installer. Everything is done by typing commands in a terminal. This lecture shows the same setup the server way.`),
  n(`If you only use Windows or macOS, you can skip this lecture and come back later.`),

  h(`Step 1: Update the Package List`),
  p(`This refreshes the list of software that Ubuntu can install.`),
  c(`sudo apt update`),

  h(`Step 2: Install MySQL Server`),
  c(`sudo apt install mysql-server -y\nsudo systemctl status mysql`),
  p(`The second command checks if MySQL is running. You should see the word active (running).`),

  h(`Step 3: Secure the Installation`),
  p(`This wizard asks a few questions and removes unsafe defaults (like anonymous users and remote root login). Choose the security options that you prefer.`),
  c(`sudo mysql_secure_installation`),

  h(`Step 4: Log into MySQL`),
  c(`sudo mysql`),
  p(`This opens the MySQL prompt as the administrator (root).`),

  h(`Step 5: Create Your Own User`),
  p(`It is not good practice to use root for everyday work, so we create a new user called harry.`),
  c(`CREATE USER 'harry'@'localhost'\nIDENTIFIED BY 'password';\n\nGRANT ALL PRIVILEGES ON *.* TO 'harry'@'localhost'\nWITH GRANT OPTION;\n\nFLUSH PRIVILEGES;\n\nEXIT;`),
  tb([`Line`, `Meaning`],
    [`CREATE USER 'harry'@'localhost'`, `Make a user named harry who can log in from this same machine`],
    [`IDENTIFIED BY 'password'`, `Set the password`],
    [`GRANT ALL PRIVILEGES ON *.*`, `Give permission to do everything on every database and table`],
    [`WITH GRANT OPTION`, `This user can also give permissions to other users`],
    [`FLUSH PRIVILEGES`, `Reload the permissions so they apply immediately`]
  ),
  n(`Replace 'password' with a strong password of your own. Giving ALL privileges is fine for learning, but in real projects give only the permissions that are needed.`),

  h(`Step 6: Test the Login`),
  c(`mysql -u harry -p`),
  p(`It will ask for the password. Type it and you are in.`),

  h(`Useful Linux Commands for MySQL`),
  tb([`Command`, `Purpose`],
    [`sudo systemctl start mysql`, `Start the MySQL server`],
    [`sudo systemctl stop mysql`, `Stop the MySQL server`],
    [`sudo systemctl restart mysql`, `Restart after changing settings`],
    [`sudo systemctl enable mysql`, `Start MySQL automatically when the server boots`]
  ),

  h(`Quick Recap`),
  ul(
    `apt update, then apt install mysql-server.`,
    `Run mysql_secure_installation.`,
    `Log in with sudo mysql, create a user, grant privileges.`,
    `Log in again with mysql -u username -p to test.`
  )
]},

// =====================================================================
{ id: 3, title: `Databases, Tables and Data Types`, sub: `CREATE DATABASE, CREATE TABLE, data types and constraints`, blocks: [

  h(`The Idea First`),
  p(`Before storing any data, MySQL needs to know where to store it and what shape it has. That means we first create a database, then a table inside it, then decide what kind of data every column can hold.`),
  ul(
    `Folder analogy: a database is a folder, each table is a file inside it, and the rows are the content of that file.`,
    `Excel analogy: a database is a workbook, each table is a sheet, and each row is a row of that sheet.`
  ),

  h(`Step 1: Create and Select a Database`),
  c(`CREATE DATABASE startersql;\nUSE startersql;`),
  ul(
    `CREATE DATABASE makes a new empty database.`,
    `USE tells MySQL "from now on, work inside this database". In Workbench you can also right-click the database and choose Set as Default Schema.`
  ),
  c(`-- Handy commands\nSHOW DATABASES;   -- list all databases\nSHOW TABLES;      -- list tables of the selected database`),

  h(`Step 2: Understand Data Types`),
  p(`A data type decides what kind of value a column can store. Choosing the right type saves space and prevents wrong data.`),
  tb([`Type`, `Category`, `What it stores`, `Example`],
    [`INT`, `Number`, `Whole numbers`, `42, 1005`],
    [`DECIMAL(10, 2)`, `Number`, `Exact numbers, good for money. 10 = total digits, 2 = digits after the point`, `15000.50`],
    [`VARCHAR(100)`, `Text`, `Text of variable length, up to 100 characters`, `'Alice Smith'`],
    [`ENUM(...)`, `Choice`, `One value from a fixed list`, `'Male', 'Female', 'Other'`],
    [`DATE`, `Date`, `A calendar date (YYYY-MM-DD)`, `'1995-05-14'`],
    [`TIMESTAMP`, `Date and time`, `Exact date and time, can be set automatically`, `'2025-01-15 09:30:00'`],
    [`BOOLEAN`, `Flag`, `TRUE (1) or FALSE (0)`, `TRUE`]
  ),

  h(`Step 3: Understand Constraints`),
  p(`A constraint is a rule on a column. If someone tries to insert data that breaks the rule, MySQL refuses it. It is like a security guard at the door of the column.`),
  tb([`Constraint`, `What it does`, `Example`],
    [`PRIMARY KEY`, `Uniquely identifies each row, never NULL`, `id INT PRIMARY KEY`],
    [`AUTO_INCREMENT`, `Automatically gives the next number (1, 2, 3...)`, `id INT AUTO_INCREMENT`],
    [`NOT NULL`, `The field cannot be left empty`, `name VARCHAR(100) NOT NULL`],
    [`UNIQUE`, `No two rows can have the same value`, `email VARCHAR(100) UNIQUE`],
    [`DEFAULT`, `Used when no value is given`, `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`],
    [`CHECK`, `Value must satisfy a condition`, `CHECK (salary > 0)`]
  ),
  p(`You will learn constraints in more depth in lecture 9.`),

  h(`Step 4: Create the users Table`),
  p(`We will use this users table throughout the next lectures.`),
  c(`CREATE TABLE users (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) UNIQUE NOT NULL,\n    gender ENUM('Male', 'Female', 'Other'),\n    date_of_birth DATE,\n    salary INT,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);`),
  tb([`Column`, `Why it is written this way`],
    [`id INT AUTO_INCREMENT PRIMARY KEY`, `A whole number, MySQL fills it automatically, and it identifies each user`],
    [`name VARCHAR(100) NOT NULL`, `Text up to 100 characters and it cannot be empty`],
    [`email ... UNIQUE NOT NULL`, `Two users cannot share an email, and it cannot be empty`],
    [`gender ENUM(...)`, `Only Male, Female or Other is allowed`],
    [`date_of_birth DATE`, `Stores a date`],
    [`salary INT`, `Stores the salary as a whole number`],
    [`created_at ... DEFAULT CURRENT_TIMESTAMP`, `If we do not give a value, MySQL stores the current date and time`]
  ),
  n(`We added the salary column here because the next lectures use it.`),

  h(`Step 5: Look at the Table Structure`),
  c(`DESCRIBE users;`),
  dt(`Output of DESCRIBE users`,
    [`Field`, `Type`, `Null`, `Key`, `Default`, `Extra`],
    [`id`, `int`, `NO`, `PRI`, `NULL`, `auto_increment`],
    [`name`, `varchar(100)`, `NO`, ``, `NULL`, ``],
    [`email`, `varchar(100)`, `NO`, `UNI`, `NULL`, ``],
    [`gender`, `enum('Male','Female','Other')`, `YES`, ``, `NULL`, ``],
    [`date_of_birth`, `date`, `YES`, ``, `NULL`, ``],
    [`salary`, `int`, `YES`, ``, `NULL`, ``],
    [`created_at`, `timestamp`, `NO`, ``, `CURRENT_TIMESTAMP`, `DEFAULT_GENERATED`]
  ),
  p(`How to read it: Null = YES means the column may be empty. Key = PRI means primary key, UNI means unique.`),

  h(`Step 6: Drop (Delete) the Database`),
  p(`This deletes the entire database with all its tables.`),
  c(`DROP DATABASE startersql;`),
  n(`Warning: DROP DATABASE permanently deletes everything inside it. There is no undo. Do not run it now, we still need the users table.`),

  h(`Quick Recap`),
  ul(
    `CREATE DATABASE, then USE it.`,
    `CREATE TABLE defines columns, their data types and constraints.`,
    `DESCRIBE shows the structure of a table.`,
    `DROP DATABASE deletes everything, so be careful.`
  ),
  q(
    { q: `Which data type is best for storing prices like 499.99?`, a: `DECIMAL(10, 2), because it stores exact values (FLOAT can give small rounding errors).` },
    { q: `Write a table products with id (auto number, primary key), title (text, required) and price (decimal).`, a: `CREATE TABLE products (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    title VARCHAR(100) NOT NULL,\n    price DECIMAL(10, 2)\n);` }
  )
]},

// =====================================================================
{ id: 4, title: `Working with Tables`, sub: `SELECT basics, RENAME TABLE and ALTER TABLE`, blocks: [

  h(`The Idea First`),
  p(`A table is not frozen after you create it. Real projects change all the time: a new column is needed, a name is wrong, a table needs a better name. MySQL lets you change the table without losing the data already inside it.`),

  h(`Step 1: Put Some Sample Data in the Table`),
  p(`We need some rows to practice on. Insert these 5 users (you will learn INSERT properly in the next lecture, for now just run it):`),
  c(`INSERT INTO users (name, email, gender, date_of_birth, salary)\nVALUES\n('Alice Smith', 'alice@example.com', 'Female', '1995-05-14', 65000),\n('Bob Jones', 'bob@example.com', 'Male', '1990-11-23', 52000),\n('Charlie Brown', 'charlie@example.com', 'Other', '1988-02-17', 72000),\n('David Miller', 'david@example.com', 'Male', '2000-08-09', 48000),\n('Eva Green', 'eva@example.com', 'Female', '1993-12-30', 81000);`),
  dt(`Table: users`,
    [`id`, `name`, `email`, `gender`, `date_of_birth`, `salary`],
    [`1`, `Alice Smith`, `alice@example.com`, `Female`, `1995-05-14`, `65000`],
    [`2`, `Bob Jones`, `bob@example.com`, `Male`, `1990-11-23`, `52000`],
    [`3`, `Charlie Brown`, `charlie@example.com`, `Other`, `1988-02-17`, `72000`],
    [`4`, `David Miller`, `david@example.com`, `Male`, `2000-08-09`, `48000`],
    [`5`, `Eva Green`, `eva@example.com`, `Female`, `1993-12-30`, `81000`]
  ),

  h(`Step 2: Read Data with SELECT`),
  p(`SELECT means "show me the data". The star * means all columns.`),
  c(`SELECT * FROM users;`),
  p(`This fetches every column and every row of the users table.`),
  p(`To get only the columns you need (cleaner and faster), write their names:`),
  c(`SELECT name, email, salary FROM users;`),
  dt(`Output`,
    [`name`, `email`, `salary`],
    [`Alice Smith`, `alice@example.com`, `65000`],
    [`Bob Jones`, `bob@example.com`, `52000`],
    [`Charlie Brown`, `charlie@example.com`, `72000`],
    [`David Miller`, `david@example.com`, `48000`],
    [`Eva Green`, `eva@example.com`, `81000`]
  ),
  n(`In real projects avoid SELECT * on big tables. Ask only for the columns you need.`),

  h(`Step 3: Rename a Table`),
  c(`RENAME TABLE users TO customers;\n\n-- Rename it back\nRENAME TABLE customers TO users;`),

  h(`Step 4: Change the Structure with ALTER TABLE`),
  p(`Analogy: ALTER TABLE is like renovating a house while people are still living in it. The people (your data) stay, only the rooms (columns) change.`),

  h(`Add a Column`),
  c(`ALTER TABLE users\nADD COLUMN is_active BOOLEAN DEFAULT TRUE;`),
  p(`Existing rows automatically get the default value TRUE.`),

  h(`Drop (Remove) a Column`),
  c(`ALTER TABLE users\nDROP COLUMN is_active;`),
  n(`Dropping a column also deletes all the data stored in that column.`),

  h(`Modify a Column (change type or length)`),
  c(`ALTER TABLE users\nMODIFY COLUMN name VARCHAR(150) NOT NULL;`),

  h(`Move a Column`),
  c(`-- Move email to the first position\nALTER TABLE users\nMODIFY COLUMN email VARCHAR(100) FIRST;\n\n-- Move gender right after name\nALTER TABLE users\nMODIFY COLUMN gender ENUM('Male', 'Female', 'Other')\nAFTER name;`),
  n(`Column order is only about how the table looks. Use these just for practice, it does not change how your queries work.`),

  h(`Add Multiple Columns in One Query`),
  c(`ALTER TABLE users\nADD COLUMN phone VARCHAR(15),\nADD COLUMN city VARCHAR(100);`),

  h(`Rename a Column`),
  c(`ALTER TABLE users\nRENAME COLUMN phone TO mobile_number;\n\n-- Rename it back\nALTER TABLE users\nRENAME COLUMN mobile_number TO phone;`),

  h(`Summary of ALTER TABLE`),
  tb([`What you want`, `Command`],
    [`Add a column`, `ADD COLUMN`],
    [`Remove a column`, `DROP COLUMN`],
    [`Change type or length`, `MODIFY COLUMN`],
    [`Change position`, `FIRST or AFTER column_name`],
    [`Rename a column`, `RENAME COLUMN old TO new`]
  ),

  h(`Quick Recap`),
  ul(
    `SELECT reads data, * means all columns.`,
    `RENAME TABLE changes the table name.`,
    `ALTER TABLE changes the structure but keeps the data.`,
    `DROP COLUMN deletes the column and its data.`
  ),
  q(
    { q: `Add a column country (text up to 50 characters) to users.`, a: `ALTER TABLE users\nADD COLUMN country VARCHAR(50);` },
    { q: `Show only the name and email of every user.`, a: `SELECT name, email FROM users;` }
  )
]},

// =====================================================================
{ id: 5, title: `Inserting Data`, sub: `INSERT INTO: single row, multiple rows, defaults and common errors`, blocks: [

  h(`The Idea First`),
  p(`A table without data is like an empty register. INSERT INTO is the command that writes new rows into it. Each INSERT adds one or more complete rows.`),

  h(`Basic Syntax`),
  c(`INSERT INTO table_name (column1, column2, ...)\nVALUES (value1, value2, ...);`),
  p(`The values must be in the same order as the columns you list.`),

  h(`Method 1: Specify Column Names (Best Practice)`),
  p(`You list the columns you want to fill. Columns with AUTO_INCREMENT or DEFAULT can be skipped, MySQL fills them for you.`),
  c(`INSERT INTO users (name, email, gender, date_of_birth, salary)\nVALUES ('Frank Wright', 'frank@example.com', 'Male', '1992-04-18', 59000);`),
  p(`MySQL automatically sets id = 6 and created_at = the current time.`),

  h(`Method 2: Without Column Names (Full Row Insert)`),
  p(`Here you must give a value for every column, in table order. For AUTO_INCREMENT or DEFAULT columns you can write NULL or DEFAULT.`),
  c(`-- Only to understand. Do not run it, it adds an extra user.\nINSERT INTO users VALUES\n(NULL, 'Test User', 'test@example.com',\n'Male', '1999-01-01', 50000, DEFAULT);`),
  n(`Not recommended. If a new column is added to the table later, this kind of query breaks. Always write the column names.`),

  h(`Method 3: Insert Multiple Rows at Once (Faster)`),
  p(`Separate the rows with commas. This is one query instead of many, so it is faster and is used when importing lots of data.`),
  c(`INSERT INTO users (name, email, gender, date_of_birth, salary)\nVALUES\n('Grace Hopper', 'grace@example.com', 'Female', '1994-10-09', 95000),\n('Henry Ford', 'henry@example.com', 'Male', '1985-07-30', 67000),\n('Ishaan Patel', 'ishaan@example.com', 'Male', '1998-01-22', 54000);`),

  h(`What the Table Looks Like Now`),
  dt(`Table: users (9 rows)`,
    [`id`, `name`, `email`, `gender`, `date_of_birth`, `salary`],
    [`1`, `Alice Smith`, `alice@example.com`, `Female`, `1995-05-14`, `65000`],
    [`2`, `Bob Jones`, `bob@example.com`, `Male`, `1990-11-23`, `52000`],
    [`3`, `Charlie Brown`, `charlie@example.com`, `Other`, `1988-02-17`, `72000`],
    [`4`, `David Miller`, `david@example.com`, `Male`, `2000-08-09`, `48000`],
    [`5`, `Eva Green`, `eva@example.com`, `Female`, `1993-12-30`, `81000`],
    [`6`, `Frank Wright`, `frank@example.com`, `Male`, `1992-04-18`, `59000`],
    [`7`, `Grace Hopper`, `grace@example.com`, `Female`, `1994-10-09`, `95000`],
    [`8`, `Henry Ford`, `henry@example.com`, `Male`, `1985-07-30`, `67000`],
    [`9`, `Ishaan Patel`, `ishaan@example.com`, `Male`, `1998-01-22`, `54000`]
  ),
  n(`This 9-row table is our main practice data for lectures 6 to 13.`),

  h(`Common Errors While Inserting`),
  tb([`Error situation`, `Why it happens`, `Fix`],
    [`Duplicate entry for key 'email'`, `The email already exists and the column is UNIQUE`, `Use a different email`],
    [`Field 'name' doesn't have a default value`, `You skipped a NOT NULL column`, `Give a value for it`],
    [`Data truncated for column 'gender'`, `Value is not in the ENUM list`, `Use Male, Female or Other`],
    [`Column count doesn't match value count`, `Number of columns and values are different`, `Count them again`]
  ),

  h(`Quick Recap`),
  ul(
    `INSERT INTO adds new rows.`,
    `Always specify column names.`,
    `You can insert many rows in one query.`,
    `AUTO_INCREMENT and DEFAULT columns are filled by MySQL.`
  ),
  q(
    { q: `Insert a user named Jiya (email jiya@example.com, Female, born 1999-03-03, salary 61000). Delete her afterwards so later outputs match.`, a: `INSERT INTO users (name, email, gender, date_of_birth, salary)\nVALUES ('Jiya', 'jiya@example.com', 'Female', '1999-03-03', 61000);` }
  )
]},

// =====================================================================
{ id: 6, title: `SELECT, WHERE, ORDER BY and LIMIT`, sub: `Filtering rows, pattern matching, sorting and pagination`, blocks: [

  h(`The Idea First`),
  p(`SELECT * FROM users gives you everything. But usually you want only some rows: "only women", "only people earning above 70,000", "the top 3 earners". For that we add filters and sorting after SELECT.`),
  tb([`Clause`, `Question it answers`],
    [`WHERE`, `Which rows do I want?`],
    [`ORDER BY`, `In what order should they appear?`],
    [`LIMIT`, `How many rows do I want?`]
  ),
  n(`In this lecture all outputs are for the 9-user table from lecture 5, before any UPDATE or DELETE.`),

  h(`Basic Syntax`),
  c(`SELECT column1, column2 FROM table_name;\nSELECT * FROM users;`),

  h(`1. Filtering Rows with WHERE`),
  p(`WHERE keeps only the rows that match your condition.`),
  h(`Equal to`),
  c(`SELECT name, salary FROM users\nWHERE gender = 'Female';`),
  dt(`Result`,
    [`name`, `salary`],
    [`Alice Smith`, `65000`],
    [`Eva Green`, `81000`],
    [`Grace Hopper`, `95000`]
  ),
  h(`Not equal to`),
  c(`SELECT * FROM users WHERE gender != 'Female';\n\n-- same thing\nSELECT * FROM users WHERE gender <> 'Female';`),
  h(`Greater than, less than`),
  c(`SELECT * FROM users WHERE date_of_birth < '1995-01-01';\nSELECT * FROM users WHERE id > 5;\nSELECT name, salary FROM users WHERE salary >= 70000;`),
  dt(`Result: salary >= 70000`,
    [`name`, `salary`],
    [`Charlie Brown`, `72000`],
    [`Eva Green`, `81000`],
    [`Grace Hopper`, `95000`]
  ),
  tb([`Operator`, `Meaning`],
    [`=`, `Equal to`],
    [`!=  or  <>`, `Not equal to`],
    [`>   <`, `Greater than, less than`],
    [`>=   <=`, `Greater than or equal, less than or equal`]
  ),

  h(`2. Working with NULL`),
  p(`NULL means "no value / unknown". It is not zero and not an empty text. You cannot use = with it, you must use IS NULL.`),
  c(`SELECT * FROM users WHERE date_of_birth IS NULL;\nSELECT * FROM users WHERE date_of_birth IS NOT NULL;`),
  n(`WHERE date_of_birth = NULL will never work. Always write IS NULL.`),

  h(`3. BETWEEN (a range)`),
  c(`SELECT name, salary FROM users\nWHERE salary BETWEEN 55000 AND 75000;`),
  dt(`Result (both ends are included)`,
    [`name`, `salary`],
    [`Alice Smith`, `65000`],
    [`Charlie Brown`, `72000`],
    [`Frank Wright`, `59000`],
    [`Henry Ford`, `67000`]
  ),
  p(`It also works with dates:`),
  c(`SELECT * FROM users\nWHERE date_of_birth BETWEEN '1990-01-01' AND '2000-12-31';`),

  h(`4. IN (match any value from a list)`),
  c(`SELECT name, gender FROM users\nWHERE gender IN ('Female', 'Other');`),
  dt(`Result`,
    [`name`, `gender`],
    [`Alice Smith`, `Female`],
    [`Charlie Brown`, `Other`],
    [`Eva Green`, `Female`],
    [`Grace Hopper`, `Female`]
  ),
  p(`IN is a shorter way to write gender = 'Female' OR gender = 'Other'.`),

  h(`5. Pattern Matching with LIKE`),
  p(`Use LIKE when you know only a part of the text. Two special symbols are used:`),
  ul(
    `% means any number of characters (even none)`,
    `_ means exactly one character`
  ),
  c(`-- Starts with A\nSELECT name FROM users WHERE name LIKE 'A%';\n\n-- Ends with n\nSELECT name FROM users WHERE name LIKE '%n';\n\n-- Contains 'ar'\nSELECT name FROM users WHERE name LIKE '%ar%';`),
  dt(`Result: LIKE '%ar%'`,
    [`name`],
    [`Charlie Brown`]
  ),
  tb([`Pattern`, `Meaning`],
    [`'A%'`, `Starts with A`],
    [`'%a'`, `Ends with a`],
    [`'%li%'`, `Contains li anywhere`],
    [`'_a%'`, `Second letter is a`]
  ),

  h(`6. AND / OR`),
  p(`AND: all conditions must be true. OR: at least one must be true.`),
  c(`SELECT name, gender, salary FROM users\nWHERE gender = 'Male' AND salary > 55000;`),
  dt(`Result`,
    [`name`, `gender`, `salary`],
    [`Frank Wright`, `Male`, `59000`],
    [`Henry Ford`, `Male`, `67000`]
  ),
  c(`SELECT * FROM users\nWHERE gender = 'Male' OR gender = 'Other';`),
  n(`When you mix AND with OR, use brackets to be clear: WHERE salary > 50000 AND (gender = 'Male' OR gender = 'Other').`),

  h(`7. Sorting with ORDER BY`),
  p(`By default rows come in no guaranteed order. ORDER BY sorts them. ASC = small to large (default), DESC = large to small.`),
  c(`-- Highest salary first\nSELECT name, salary FROM users ORDER BY salary DESC;\n\n-- Alphabetical\nSELECT name FROM users ORDER BY name ASC;\n\n-- Oldest users first\nSELECT * FROM users ORDER BY date_of_birth ASC;`),
  dt(`Result: ORDER BY salary DESC (first 4 rows)`,
    [`name`, `salary`],
    [`Grace Hopper`, `95000`],
    [`Eva Green`, `81000`],
    [`Charlie Brown`, `72000`],
    [`Henry Ford`, `67000`]
  ),

  h(`8. LIMIT and OFFSET (Pagination)`),
  p(`LIMIT decides how many rows to return. OFFSET skips some rows first. Together they create pages, like Page 1, Page 2 on a shopping website.`),
  c(`-- Top 5 rows\nSELECT * FROM users LIMIT 5;\n\n-- Page 1: first 3 rows\nSELECT name, salary FROM users ORDER BY salary DESC LIMIT 3 OFFSET 0;\n\n-- Page 2: skip 3, next 3\nSELECT name, salary FROM users ORDER BY salary DESC LIMIT 3 OFFSET 3;\n\n-- Short form: LIMIT offset, count\nSELECT * FROM users LIMIT 5, 10;   -- skip 5, give 10`),
  dt(`Page 1 and Page 2`,
    [`Page`, `Rows returned`],
    [`Page 1 (OFFSET 0)`, `Grace Hopper, Eva Green, Charlie Brown`],
    [`Page 2 (OFFSET 3)`, `Henry Ford, Alice Smith, Frank Wright`]
  ),
  p(`The latest 10 registered users:`),
  c(`SELECT * FROM users\nORDER BY created_at DESC\nLIMIT 10;`),

  h(`Order of Writing a Query`),
  c(`SELECT columns\nFROM table\nWHERE condition\nORDER BY column\nLIMIT number;`),
  n(`The order matters: WHERE comes before ORDER BY, and LIMIT comes last.`),

  h(`Quick Recap`),
  ul(
    `WHERE filters rows, ORDER BY sorts them, LIMIT cuts the result.`,
    `Use IS NULL for empty values, never = NULL.`,
    `BETWEEN includes both end values.`,
    `LIKE with % and _ is for partial text search.`
  ),
  q(
    { q: `Fetch the 3 youngest users.`, a: `SELECT name, date_of_birth FROM users\nORDER BY date_of_birth DESC\nLIMIT 3;\n\n-- Result: David Miller, Ishaan Patel, Alice Smith` },
    { q: `Find users earning between 50,000 and 70,000 whose name starts with B, C or D.`, a: `SELECT * FROM users\nWHERE salary BETWEEN 50000 AND 70000\nAND (name LIKE 'B%' OR name LIKE 'C%' OR name LIKE 'D%');` },
    { q: `What does this do? SELECT * FROM users WHERE salary > 60000 ORDER BY created_at DESC LIMIT 5;`, a: `It takes users earning more than 60,000, sorts them with the newest registered first, and returns only the first 5.` },
    { q: `What does this do? SELECT * FROM users ORDER BY salary DESC;`, a: `It returns all users sorted from the highest salary to the lowest.` },
    { q: `What does this do? SELECT * FROM users WHERE salary BETWEEN 50000 AND 70000;`, a: `It returns users whose salary is from 50,000 to 70,000, both included.` }
  )
]},

// =====================================================================
{ id: 7, title: `UPDATE: Modifying Data`, sub: `Changing existing rows safely with WHERE`, blocks: [

  h(`The Idea First`),
  p(`Data changes. A user gets a raise, someone corrects the spelling of a name, an email changes. You do not delete the row and insert it again. You use UPDATE to change just the values you want.`),

  h(`Basic Syntax`),
  c(`UPDATE table_name\nSET column1 = value1, column2 = value2\nWHERE condition;`),
  ul(
    `UPDATE: which table`,
    `SET: which columns get which new values`,
    `WHERE: which rows to change (very important!)`
  ),

  h(`Example 1: Update One Column`),
  c(`UPDATE users\nSET salary = 58000\nWHERE id = 2;`),
  dt(`Before and After (id = 2)`,
    [`id`, `name`, `salary`],
    [`2 (Before)`, `Bob Jones`, `52000`],
    [`2 (After)`, `Bob Jones`, `58000`]
  ),

  h(`Example 2: Update Multiple Columns`),
  c(`UPDATE users\nSET name = 'Alicia Smith', email = 'alicia@example.com'\nWHERE id = 1;`),

  h(`Example 3: Update Using a Calculation`),
  p(`The new value can be based on the old value. Example: give a 10% raise to everyone earning below 60,000.`),
  c(`UPDATE users\nSET salary = ROUND(salary * 1.10)\nWHERE salary < 60000;`),
  p(`Or add a fixed amount:`),
  c(`UPDATE users\nSET salary = salary + 5000\nWHERE email = 'charlie@example.com';`),

  h(`The Biggest Danger: UPDATE Without WHERE`),
  c(`UPDATE users\nSET gender = 'Other';`),
  p(`This changes the gender of EVERY user in the table. Be very careful when you leave out WHERE.`),
  n(`MySQL Workbench has Safe Updates mode on by default. It blocks UPDATE or DELETE that do not use a key column in WHERE (error 1175). Do not switch it off while learning, it protects you.`),

  h(`A Safe Habit`),
  p(`Before you run an UPDATE, run a SELECT with the same WHERE. Check that the rows shown are exactly the rows you want to change.`),
  c(`-- 1. Check first\nSELECT * FROM users WHERE salary < 60000;\n\n-- 2. Then update\nUPDATE users SET salary = salary + 10000 WHERE salary < 60000;`),

  h(`Quick Recap`),
  ul(
    `UPDATE changes existing rows.`,
    `SET says what to change, WHERE says which rows.`,
    `No WHERE means all rows change.`,
    `First SELECT, then UPDATE.`
  ),
  q(
    { q: `Update the salary of the user with id = 5 to 70,000.`, a: `UPDATE users\nSET salary = 70000\nWHERE id = 5;` },
    { q: `Change the name of the user with email aisha@example.com to Aisha Khan.`, a: `UPDATE users\nSET name = 'Aisha Khan'\nWHERE email = 'aisha@example.com';` },
    { q: `Increase salary by 10,000 for all users whose salary is less than 60,000.`, a: `UPDATE users\nSET salary = salary + 10000\nWHERE salary < 60000;` },
    { q: `Set the gender of the user Ishaan to Other.`, a: `UPDATE users\nSET gender = 'Other'\nWHERE name = 'Ishaan Patel';` },
    { q: `Reset the salary of all users to 50,000. What should you remember?`, a: `UPDATE users SET salary = 50000;\n\nThere is no WHERE, so it overwrites the salary of every user. Use with great caution.` }
  )
]},

// =====================================================================
{ id: 8, title: `DELETE: Removing Data`, sub: `DELETE, TRUNCATE, DROP and safe deleting habits`, blocks: [

  h(`The Idea First`),
  p(`Sometimes data must go: a user closes the account, test data needs cleaning. MySQL gives you three ways to remove things, and they remove very different amounts.`),
  tb([`Command`, `What gets removed`, `Easy picture`],
    [`DELETE`, `Only the rows you select`, `Tearing out some pages of a notebook`],
    [`TRUNCATE`, `All rows, the table stays`, `Erasing every page, notebook remains`],
    [`DROP TABLE`, `The whole table`, `Throwing the notebook away`]
  ),

  h(`1. DELETE: Remove Specific Rows`),
  c(`DELETE FROM table_name\nWHERE condition;`),
  h(`Delete one row`),
  c(`DELETE FROM users WHERE id = 3;`),
  p(`The row with id = 3 (Charlie Brown) is removed. The other rows stay as they are.`),
  h(`Delete multiple rows`),
  c(`DELETE FROM users WHERE gender = 'Other';`),
  h(`Delete all rows but keep the table`),
  c(`DELETE FROM users;`),
  n(`DELETE without WHERE removes every row. Always double check your WHERE.`),

  h(`2. TRUNCATE: Wipe the Whole Table Quickly`),
  c(`TRUNCATE TABLE users;`),
  ul(
    `Removes all rows but keeps the table structure.`,
    `Much faster than DELETE FROM users.`,
    `Resets AUTO_INCREMENT back to 1.`,
    `Cannot be rolled back in most cases.`
  ),

  h(`3. DROP TABLE: Destroy the Table Itself`),
  c(`DROP TABLE users;`),
  p(`This removes the table structure and all data permanently.`),

  h(`DELETE vs TRUNCATE vs DROP`),
  tb([`Command`, `What it does`, `AUTO_INCREMENT`, `Rollback?`],
    [`DELETE FROM t WHERE ...`, `Removes the matching rows`, `Keeps counting`, `Yes (inside a transaction)`],
    [`TRUNCATE TABLE t`, `Removes all rows, table stays`, `Resets to 1`, `No`],
    [`DROP TABLE t`, `Removes the table and data`, `Gone with the table`, `No`]
  ),

  h(`Best Practices`),
  ul(
    `Always use WHERE unless you really want to delete everything.`,
    `Run a SELECT with the same condition first.`,
    `Take a backup before any destructive operation.`
  ),
  c(`-- Step 1: check which rows will be deleted\nSELECT * FROM users WHERE id = 3;\n\n-- Step 2: delete them\nDELETE FROM users WHERE id = 3;`),

  h(`Quick Recap`),
  ul(
    `DELETE removes chosen rows, TRUNCATE removes all rows, DROP removes the table.`,
    `Use SELECT before DELETE.`,
    `TRUNCATE and DROP cannot be undone.`
  ),
  q(
    { q: `What will this do? DELETE FROM users WHERE salary < 50000;`, a: `It deletes every user whose salary is below 50,000.` },
    { q: `What will this do? DELETE FROM users WHERE salary IS NULL;`, a: `It deletes the users who have no salary value (NULL).` },
    { q: `What will this do? DELETE FROM users WHERE gender = 'Male' AND salary > 100000;`, a: `It deletes only the male users earning more than 100,000. Both conditions must be true.` },
    { q: `What will this do? DELETE FROM users WHERE created_at > '2025-01-01';`, a: `It deletes the users created after 1 January 2025.` }
  )
]},

// =====================================================================
{ id: 9, title: `Constraints in Depth`, sub: `UNIQUE, NOT NULL, CHECK, DEFAULT, PRIMARY KEY and AUTO_INCREMENT`, blocks: [

  h(`The Idea First`),
  p(`If your table allows anything, bad data enters: two users with the same email, a user with no name, a salary of minus 500. Constraints are rules written into the table so MySQL itself blocks bad data. This is much safer than hoping every programmer remembers to check.`),
  p(`Constraints are rules applied to table columns to ensure the accuracy, validity and integrity of the data.`),
  n(`You can add a constraint while creating the table (CREATE TABLE) or later (ALTER TABLE).`),

  h(`1. UNIQUE`),
  p(`All values in the column must be different. Example: no two users can share one email.`),
  c(`-- During table creation\nCREATE TABLE users (\n    id INT PRIMARY KEY,\n    email VARCHAR(100) UNIQUE\n);\n\n-- Add later\nALTER TABLE users\nADD CONSTRAINT unique_email\nUNIQUE (email);`),
  p(`What happens if you break it: inserting an existing email gives the error Duplicate entry.`),

  h(`2. NOT NULL`),
  p(`The column cannot be left empty.`),
  c(`-- During table creation\nCREATE TABLE users (\n    id INT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL\n);\n\n-- Make an existing column NOT NULL\nALTER TABLE users\nMODIFY COLUMN name VARCHAR(100) NOT NULL;\n\n-- Make it nullable again\nALTER TABLE users\nMODIFY COLUMN name VARCHAR(100) NULL;`),

  h(`3. CHECK`),
  p(`The value must satisfy a condition. Example: only allow dates of birth after 1 Jan 2000, or salary of at least 10,000.`),
  c(`ALTER TABLE users\nADD CONSTRAINT chk_dob\nCHECK (date_of_birth > '2000-01-01');\n\nALTER TABLE users\nADD CONSTRAINT chk_salary\nCHECK (salary >= 10000);`),
  p(`Giving the constraint a name (chk_dob) helps you drop it later:`),
  c(`ALTER TABLE users DROP CHECK chk_dob;`),
  n(`Adding a CHECK on a table that already has rows fails if any existing row breaks the rule.`),

  h(`4. DEFAULT`),
  p(`Gives a fallback value if nothing is provided during insert.`),
  c(`-- During table creation\nCREATE TABLE users (\n    id INT PRIMARY KEY,\n    is_active BOOLEAN DEFAULT TRUE\n);\n\n-- Add later\nALTER TABLE users\nALTER COLUMN is_active\nSET DEFAULT TRUE;`),

  h(`5. PRIMARY KEY`),
  p(`Uniquely identifies each row. It must be NOT NULL and UNIQUE. A table can have only one primary key.`),
  c(`-- During table creation\nCREATE TABLE users (\n    id INT PRIMARY KEY,\n    name VARCHAR(100)\n);\n\n-- Add later\nALTER TABLE users\nADD PRIMARY KEY (id);`),

  h(`6. AUTO_INCREMENT`),
  p(`Used together with PRIMARY KEY to automatically give the next number to every new row.`),
  c(`CREATE TABLE users (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(100)\n);`),

  h(`Summary Table`),
  tb([`Constraint`, `Purpose`, `Allows NULL?`, `How many per table?`],
    [`UNIQUE`, `Prevents duplicate values`, `Yes`, `Many`],
    [`NOT NULL`, `Value must be present`, `No`, `Many`],
    [`CHECK`, `Value must satisfy a condition`, `Yes`, `Many`],
    [`DEFAULT`, `Fallback value`, `Not applicable`, `Many`],
    [`PRIMARY KEY`, `Identifies each row`, `No`, `Only 1`],
    [`AUTO_INCREMENT`, `Generates numbers automatically`, `Not applicable`, `Only 1 column`]
  ),

  h(`Quick Recap`),
  ul(
    `Constraints are rules that protect your data.`,
    `UNIQUE, NOT NULL, CHECK, DEFAULT, PRIMARY KEY and AUTO_INCREMENT are the main ones.`,
    `Name your constraints so you can drop them later.`
  ),
  q(
    { q: `Make sure no one can insert a salary below 10,000 into users.`, a: `ALTER TABLE users\nADD CONSTRAINT chk_salary\nCHECK (salary >= 10000);` },
    { q: `Make the email column unique.`, a: `ALTER TABLE users\nADD CONSTRAINT unique_email\nUNIQUE (email);` }
  )
]},

// =====================================================================
{ id: 10, title: `SQL Functions`, sub: `Aggregate, string, date, math and conditional functions`, blocks: [

  h(`The Idea First`),
  p(`Sometimes you do not want raw rows, you want an answer: "How many users do we have?", "What is the average salary?", "Show names in capital letters". Functions are ready-made tools in MySQL that calculate or transform data for you.`),
  p(`We use the users table with: id, name, email, gender, date_of_birth, salary, created_at. Outputs are for the 9-user table of lecture 5.`),

  h(`1. Aggregate Functions`),
  p(`They look at many rows and return ONE result.`),
  tb([`Function`, `Purpose`],
    [`COUNT()`, `Counts rows`],
    [`SUM()`, `Total of a column`],
    [`AVG()`, `Average`],
    [`MIN() / MAX()`, `Lowest / highest value`]
  ),
  h(`COUNT()`),
  c(`SELECT COUNT(*) FROM users;\n\n-- Count only female users\nSELECT COUNT(*) FROM users\nWHERE gender = 'Female';`),
  h(`MIN(), MAX(), SUM(), AVG()`),
  c(`SELECT\n    MIN(salary) AS min_salary,\n    MAX(salary) AS max_salary,\n    SUM(salary) AS total_payroll,\n    AVG(salary) AS avg_salary\nFROM users;`),
  dt(`Output`,
    [`min_salary`, `max_salary`, `total_payroll`, `avg_salary`],
    [`48000`, `95000`, `593000`, `65888.8889`]
  ),
  p(`AS gives a temporary nicer name (alias) to a result column.`),
  h(`Aggregates with GROUP BY (preview)`),
  c(`SELECT gender, AVG(salary) AS avg_salary\nFROM users\nGROUP BY gender;`),
  dt(`Output: average salary by gender`,
    [`gender`, `avg_salary`],
    [`Female`, `80333.3333`],
    [`Male`, `56000.0000`],
    [`Other`, `72000.0000`]
  ),
  p(`GROUP BY is explained fully in lecture 20.`),

  h(`2. String Functions`),
  tb([`Function`, `Purpose`, `Example`],
    [`LENGTH(x)`, `Length of text`, `LENGTH('Bob Jones') = 9`],
    [`UPPER(x)`, `Capital letters`, `UPPER('bob') = BOB`],
    [`LOWER(x)`, `Small letters`, `LOWER('BOB') = bob`],
    [`CONCAT(a, b, ...)`, `Joins texts together`, `CONCAT('a', 'b') = ab`]
  ),
  c(`SELECT\n    name,\n    LENGTH(name) AS name_length,\n    LOWER(name) AS lowercase_name,\n    UPPER(name) AS uppercase_name,\n    CONCAT(name, ' <', email, '>') AS user_contact\nFROM users\nLIMIT 2;`),
  dt(`Output`,
    [`name`, `name_length`, `lowercase_name`, `uppercase_name`, `user_contact`],
    [`Alice Smith`, `11`, `alice smith`, `ALICE SMITH`, `Alice Smith <alice@example.com>`],
    [`Bob Jones`, `9`, `bob jones`, `BOB JONES`, `Bob Jones <bob@example.com>`]
  ),

  h(`3. Date Functions`),
  tb([`Function`, `Purpose`],
    [`NOW()`, `Current date and time`],
    [`CURDATE()`, `Current date only`],
    [`YEAR(), MONTH(), DAY()`, `Pick a part of a date`],
    [`DATEDIFF(a, b)`, `Number of days between two dates`],
    [`TIMESTAMPDIFF(unit, a, b)`, `Difference in years, months, etc.`]
  ),
  c(`SELECT NOW();\n\nSELECT name, YEAR(date_of_birth) AS birth_year\nFROM users LIMIT 2;`),
  dt(`Output: birth year`,
    [`name`, `birth_year`],
    [`Alice Smith`, `1995`],
    [`Bob Jones`, `1990`]
  ),
  c(`-- Days lived\nSELECT name, DATEDIFF(CURDATE(), date_of_birth) AS days_lived\nFROM users;\n\n-- Age in years\nSELECT name, TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age\nFROM users;`),
  n(`The age and days values depend on today's date, so your output will be different from a book.`),

  h(`4. Mathematical Functions`),
  tb([`Function`, `Purpose`, `Example`],
    [`ROUND(x)`, `Nearest whole number`, `ROUND(15.75) = 16`],
    [`FLOOR(x)`, `Round down`, `FLOOR(15.75) = 15`],
    [`CEIL(x)`, `Round up`, `CEIL(15.25) = 16`],
    [`MOD(a, b)`, `Remainder after dividing`, `MOD(7, 2) = 1`]
  ),
  c(`SELECT ROUND(15.75), FLOOR(15.75), CEIL(15.25);\n\n-- Find even or odd ids (remainder 0 = even)\nSELECT id, MOD(id, 2) AS remainder FROM users;`),

  h(`5. Conditional Functions: IF() and CASE`),
  p(`These work like if-else in programming.`),
  c(`-- IF(condition, value_if_true, value_if_false)\nSELECT name, gender,\n    IF(gender = 'Female', 'Yes', 'No') AS is_female\nFROM users;`),
  c(`-- CASE for more than two outcomes\nSELECT name, salary,\n    CASE\n        WHEN salary >= 80000 THEN 'Executive'\n        WHEN salary >= 60000 THEN 'Mid-Level'\n        ELSE 'Associate'\n    END AS rank_title\nFROM users;`),
  dt(`Output: CASE (first 4 rows)`,
    [`name`, `salary`, `rank_title`],
    [`Alice Smith`, `65000`, `Mid-Level`],
    [`Bob Jones`, `52000`, `Associate`],
    [`Charlie Brown`, `72000`, `Mid-Level`],
    [`Eva Green`, `81000`, `Executive`]
  ),

  h(`Summary Table`),
  tb([`Function`, `Purpose`],
    [`COUNT()`, `Count rows`],
    [`SUM()`, `Total of a column`],
    [`AVG()`, `Average of values`],
    [`MIN() / MAX()`, `Lowest / highest value`],
    [`LENGTH()`, `String length`],
    [`CONCAT()`, `Merge strings`],
    [`YEAR() / DATEDIFF()`, `Date breakdown / age`],
    [`ROUND()`, `Rounding numbers`],
    [`IF() / CASE`, `Conditional logic`]
  ),

  h(`Quick Recap`),
  ul(
    `Aggregate functions turn many rows into one answer.`,
    `String, date and math functions change how a value is shown.`,
    `IF and CASE give if-else behaviour inside a query.`
  ),
  q(
    { q: `Find the highest and the lowest salary.`, a: `SELECT MAX(salary), MIN(salary) FROM users;` },
    { q: `Show each user's name in capital letters along with the length of the name.`, a: `SELECT UPPER(name), LENGTH(name) FROM users;` },
    { q: `Show each user's age in years.`, a: `SELECT name, TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age\nFROM users;` }
  )
]},

// =====================================================================
{ id: 11, title: `Transactions and AutoCommit`, sub: `ACID, COMMIT, ROLLBACK and safe multi-step changes`, blocks: [

  h(`First, the Problem`),
  p(`Think of sending 500 rupees from Alice to Bob. It needs two steps:`),
  ul(
    `Step 1: Deduct 500 from Alice's account.`,
    `Step 2: Add 500 to Bob's account.`
  ),
  p(`What if the server crashes or the power goes after Step 1? Alice lost 500 and Bob never got it. The money has vanished! We need a way to say: "do both steps, or do nothing at all." That is a transaction.`),

  h(`What is a Transaction? (Theory)`),
  p(`A transaction groups several SQL statements into one all-or-nothing unit. Either all of them are saved (COMMIT), or all of them are cancelled (ROLLBACK).`),
  n(`Transactions work with the InnoDB storage engine, which is the default in MySQL.`),

  h(`The 4 ACID Rules`),
  p(`These four rules are what make transactions reliable.`),
  tb([`Rule`, `Meaning`, `Bank example`],
    [`Atomicity`, `All or nothing`, `Both updates happen, or neither`],
    [`Consistency`, `Database rules stay valid before and after`, `Total money in the bank stays the same`],
    [`Isolation`, `Transactions running together do not disturb each other`, `Two transfers at once do not mix up`],
    [`Durability`, `Committed data survives crashes`, `Once done, the transfer stays even after a restart`]
  ),

  h(`AutoCommit: The Default Behaviour`),
  p(`By default MySQL is in AutoCommit mode. Every single SQL statement is treated as its own transaction and is saved immediately. That is why a normal UPDATE is permanent as soon as you run it.`),
  p(`To control when changes are saved, you can turn AutoCommit off.`),

  h(`1. Disable AutoCommit`),
  c(`SET autocommit = 0;`),
  p(`Now your changes will not be permanent until you run COMMIT.`),

  h(`2. COMMIT: Save the Changes`),
  c(`COMMIT;`),
  p(`This saves everything done since the last COMMIT or ROLLBACK. After this the changes are permanent.`),

  h(`3. ROLLBACK: Undo the Changes`),
  c(`ROLLBACK;`),
  p(`This cancels everything done since the last COMMIT or ROLLBACK, and brings back the old values.`),

  h(`4. Enable AutoCommit Again`),
  c(`SET autocommit = 1;`),

  h(`Example Workflow`),
  c(`-- 1. Turn off AutoCommit\nSET autocommit = 0;\n\n-- 2. Make a change\nUPDATE users\nSET salary = 80000\nWHERE id = 5;\n\n-- 3a. Happy with it? Save it\nCOMMIT;\n\n-- 3b. Not happy? Undo it\nROLLBACK;`),
  p(`You only run one of 3a or 3b.`),

  h(`The Bank Transfer with START TRANSACTION`),
  p(`Another way is START TRANSACTION. It begins a transaction just for the statements that follow, without changing the AutoCommit setting for the whole session.`),
  c(`CREATE TABLE accounts (\n    id INT PRIMARY KEY,\n    holder VARCHAR(100),\n    balance DECIMAL(10, 2)\n);\n\nINSERT INTO accounts VALUES\n(101, 'Alice', 1500.00),\n(102, 'Bob', 800.00);`),
  dt(`Table: accounts (start)`,
    [`id`, `holder`, `balance`],
    [`101`, `Alice`, `1500.00`],
    [`102`, `Bob`, `800.00`]
  ),
  c(`START TRANSACTION;\n\nUPDATE accounts SET balance = balance - 500 WHERE id = 101;\nUPDATE accounts SET balance = balance + 500 WHERE id = 102;\n\n-- If everything looks right:\nCOMMIT;\n\n-- If something went wrong, run this instead:\n-- ROLLBACK;`),
  dt(`After COMMIT`,
    [`id`, `holder`, `balance`],
    [`101`, `Alice`, `1000.00`],
    [`102`, `Bob`, `1300.00`]
  ),
  p(`If you run ROLLBACK instead of COMMIT, the balances go back to 1500 and 800.`),

  h(`Best Practices`),
  ul(
    `Use COMMIT when you want to make changes permanent.`,
    `Use ROLLBACK to discard changes if something goes wrong.`,
    `Use transactions for complex, multi-step updates so you never save half-finished work.`,
    `Test transaction queries carefully before using them in production.`
  ),
  n(`Commands like CREATE, ALTER, DROP and TRUNCATE save the transaction automatically (an implicit commit). You cannot roll them back.`),

  h(`Quick Recap`),
  ul(
    `Transaction = a group of statements that succeed or fail together.`,
    `AutoCommit is ON by default, every statement is saved at once.`,
    `COMMIT saves, ROLLBACK undoes.`,
    `ACID: Atomicity, Consistency, Isolation, Durability.`
  ),
  q(
    { q: `Why is a transaction needed for a money transfer?`, a: `Because it has two steps (deduct and add). A transaction makes sure either both happen or none happen, so money is never lost.` },
    { q: `You ran an UPDATE with AutoCommit off and realised it was wrong. What do you do?`, a: `Run ROLLBACK; to undo it, as long as you have not run COMMIT yet.` }
  )
]},

// =====================================================================
{ id: 12, title: `PRIMARY KEY in Depth`, sub: `Surrogate vs natural keys, composite keys, PRIMARY KEY vs UNIQUE`, blocks: [

  h(`First, the Problem`),
  p(`Imagine two users are both named Rahul Sharma. If you want to update "Rahul Sharma's" salary, which one gets changed? Names can repeat, so names cannot identify a row. We need a value that is different for every row. In real life this is like your Aadhaar number or a roll number. In a table it is the primary key.`),

  h(`What is a Primary Key? (Theory)`),
  p(`A PRIMARY KEY is a constraint that uniquely identifies each row in a table. It is one of the most important ideas in database design.`),
  ul(
    `Must be unique`,
    `Cannot be NULL`,
    `Is used to identify rows`,
    `Can be one column or a combination of columns`,
    `Each table can have only one primary key`
  ),
  c(`CREATE TABLE users (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(100)\n);`),

  h(`Surrogate Key vs Natural Key`),
  tb([`Type`, `Meaning`, `Example`, `Verdict`],
    [`Surrogate key`, `An artificial number created only for the database`, `id INT AUTO_INCREMENT`, `Best practice: short, fast and never changes`],
    [`Natural key`, `A real-world value`, `Email, passport number`, `Risky: if a user changes email, everything linked to it breaks`]
  ),
  p(`Tip: always choose a stable and unique column for the primary key. That is why we use id.`),

  h(`Composite Primary Key`),
  p(`Sometimes one column is not enough. A primary key made from two or more columns together is called a composite key.`),
  c(`CREATE TABLE enrollments (\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    enrolled_at DATE,\n    PRIMARY KEY (student_id, course_id)\n);`),
  p(`Student 101 can join course 501 and course 502, but cannot join course 501 twice, because the pair (101, 501) must be unique.`),

  h(`PRIMARY KEY vs UNIQUE`),
  p(`At first glance they look the same because both prevent duplicates. But there are differences.`),
  tb([`Feature`, `PRIMARY KEY`, `UNIQUE`],
    [`Values must be unique`, `Yes`, `Yes`],
    [`Allows NULL`, `No`, `Yes (NULLs are allowed)`],
    [`How many per table`, `Only one`, `Can have many`],
    [`Required by table`, `Recommended, often required`, `Optional`],
    [`Dropping`, `More restricted`, `Can be dropped anytime`]
  ),
  c(`CREATE TABLE users (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    email VARCHAR(100) UNIQUE,\n    name VARCHAR(100)\n);`),
  ul(
    `id is the identifier of each row.`,
    `email must be unique, but it is not the primary key.`
  ),

  h(`Dropping Keys`),
  p(`You can drop a primary key, but it may fail if it is being used elsewhere (for example in a foreign key, or by an auto_increment column).`),
  c(`ALTER TABLE users\nDROP PRIMARY KEY;`),
  p(`To drop a UNIQUE constraint you drop its index:`),
  c(`ALTER TABLE users\nDROP INDEX email;`),

  h(`Controlling AUTO_INCREMENT`),
  p(`If you want new ids to start from a different number:`),
  c(`ALTER TABLE users\nAUTO_INCREMENT = 1000;`),
  p(`The next inserted user will get id 1000.`),

  h(`Key Takeaways`),
  ul(
    `Use PRIMARY KEY for the main identifier of a row.`,
    `Use UNIQUE for other columns that must not repeat (email, phone).`,
    `Only one primary key per table, but many unique constraints.`,
    `Combine AUTO_INCREMENT with PRIMARY KEY for automatic ids.`
  ),
  q(
    { q: `Why is a name a bad primary key?`, a: `Because two people can have the same name, and primary keys must be unique.` },
    { q: `Create a table likes where one user can like a post only once.`, a: `CREATE TABLE likes (\n    user_id INT NOT NULL,\n    post_id INT NOT NULL,\n    PRIMARY KEY (user_id, post_id)\n);` }
  )
]},

// =====================================================================
{ id: 13, title: `Foreign Keys`, sub: `Linking tables, referential integrity and ON DELETE actions`, blocks: [

  h(`First, the Problem`),
  p(`You have a users table. Now you want to store each user's address. A user can have many addresses (home, office, parents' house).`),
  p(`If you put address columns inside the users table, you would need columns like address1, address2, address3 and the table becomes messy. The clean way is a separate addresses table, and each address says which user it belongs to by storing that user's id.`),
  p(`But what if someone adds an address for user id 999, who does not exist? We need MySQL to block this. That is the job of a foreign key.`),

  h(`What is a Foreign Key? (Theory)`),
  p(`A foreign key is a column that creates a link between two tables. It makes sure that the value in one table must match a value in another table. This protects data integrity between related data.`),
  tb([`Term`, `Meaning`, `Here`],
    [`Parent table`, `The table being pointed to`, `users`],
    [`Child table`, `The table that holds the foreign key`, `addresses`],
    [`Foreign key`, `Column in the child that points to the parent's primary key`, `addresses.user_id points to users.id`]
  ),

  h(`Step 1: Create the Parent Table`),
  c(`CREATE TABLE users (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL\n);`),

  h(`Step 2: Create the Child Table with a Foreign Key`),
  c(`CREATE TABLE addresses (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    user_id INT,\n    street VARCHAR(255),\n    city VARCHAR(100),\n    state VARCHAR(100),\n    pincode VARCHAR(10),\n    FOREIGN KEY (user_id)\n    REFERENCES users(id)\n);`),
  ul(
    `user_id is a foreign key.`,
    `It references the id column of the users table.`,
    `So every address must be linked to a valid user.`
  ),
  dt(`Parent: users`,
    [`id`, `name`],
    [`1`, `Aarav Sharma`],
    [`2`, `Sneha Patel`]
  ),
  dt(`Child: addresses (user_id points to users.id)`,
    [`id`, `user_id`, `city`],
    [`101`, `1 (Aarav)`, `Mumbai`],
    [`102`, `1 (Aarav)`, `Bengaluru`],
    [`103`, `2 (Sneha)`, `Kolkata`]
  ),

  h(`What the Foreign Key Protects`),
  tb([`You try to...`, `Result`],
    [`Insert an address with user_id = 99 (no such user)`, `Error: cannot add or update a child row`],
    [`Delete a user who still has addresses`, `Error: cannot delete or update a parent row (by default)`],
    [`Insert an address with a valid user_id`, `Works`]
  ),
  n(`Create the parent table first. The child table can only point to a table that already exists.`),

  h(`Naming and Dropping a Foreign Key`),
  p(`To drop a foreign key you need its constraint name. MySQL generates one if you do not give it, or you can name it yourself.`),
  c(`CREATE TABLE addresses (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    user_id INT,\n    CONSTRAINT fk_user\n    FOREIGN KEY (user_id)\n    REFERENCES users(id)\n);\n\n-- To drop it\nALTER TABLE addresses\nDROP FOREIGN KEY fk_user;`),

  h(`Adding a Foreign Key Later`),
  p(`If you forgot to define it while creating the table:`),
  c(`ALTER TABLE addresses\nADD CONSTRAINT fk_user\nFOREIGN KEY (user_id)\nREFERENCES users(id);`),

  h(`ON DELETE Actions`),
  p(`By default, if you delete a user that has related addresses, MySQL throws an error. With ON DELETE you decide what should happen to the children.`),
  c(`CREATE TABLE addresses (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    user_id INT,\n    street VARCHAR(255),\n    city VARCHAR(100),\n    state VARCHAR(100),\n    pincode VARCHAR(10),\n    CONSTRAINT fk_user\n    FOREIGN KEY (user_id)\n    REFERENCES users(id)\n    ON DELETE CASCADE\n);\n\n-- Or add it later\nALTER TABLE addresses\nADD CONSTRAINT fk_user\nFOREIGN KEY (user_id)\nREFERENCES users(id)\nON DELETE CASCADE;`),
  tb([`ON DELETE option`, `What happens when the parent user is deleted`, `Good for`],
    [`CASCADE`, `Related child rows are deleted automatically`, `User and their addresses`],
    [`SET NULL`, `Child rows stay, the foreign key becomes NULL (column must allow NULL)`, `Employee and manager`],
    [`RESTRICT`, `Deleting the parent is blocked while children exist (default)`, `Customer with unpaid invoices`]
  ),
  p(`Example with CASCADE: if you delete user 1 (Aarav), his addresses 101 and 102 are deleted too, and only Sneha's address 103 remains.`),

  h(`Quick Recap`),
  ul(
    `A foreign key links a child table to a parent table.`,
    `It stops invalid references (like an address for a user who does not exist).`,
    `You can create, name, add later and drop foreign keys.`,
    `ON DELETE decides what happens to children: CASCADE, SET NULL or RESTRICT.`
  ),
  q(
    { q: `Which table holds the foreign key, the parent or the child?`, a: `The child table (for example addresses holds user_id).` },
    { q: `You want orders to be deleted automatically when a customer is deleted. Which option?`, a: `ON DELETE CASCADE.` }
  )
]},

// =====================================================================
{ id: 14, title: `SQL JOINs`, sub: `INNER, LEFT and RIGHT JOIN with simple pictures`, blocks: [

  h(`First, the Problem`),
  p(`In the last lecture we split data into two tables: users and addresses. Good design, but now a question: "Show me each user's name along with their city."`),
  p(`The name is in users and the city is in addresses. A single SELECT on one table cannot give both. We need to combine the two tables, and that is what a JOIN does.`),
  p(`A JOIN combines rows from two or more tables based on a related column. Usually a foreign key in one table points to a primary key in another.`),
  n(`From this lecture on, example tables are small and fresh so results are easy to follow. It is a good idea to practice them in a separate practice database.`),

  h(`Our Two Tables`),
  c(`CREATE TABLE users (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(100)\n);\n\nCREATE TABLE addresses (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    user_id INT,\n    city VARCHAR(100)\n);\n\nINSERT INTO users (name) VALUES ('Aarav'), ('Sneha'), ('Raj');\nINSERT INTO addresses (user_id, city)\nVALUES (1, 'Mumbai'), (2, 'Kolkata'), (4, 'Delhi');`),
  dt(`users`,
    [`id`, `name`],
    [`1`, `Aarav`],
    [`2`, `Sneha`],
    [`3`, `Raj`]
  ),
  dt(`addresses`,
    [`id`, `user_id`, `city`],
    [`1`, `1`, `Mumbai`],
    [`2`, `2`, `Kolkata`],
    [`3`, `4`, `Delhi`]
  ),
  ul(
    `user_id in addresses refers to users.id.`,
    `Raj (id 3) has no address.`,
    `Delhi belongs to user_id 4, but there is no user 4.`
  ),
  n(`We created addresses without a foreign key on purpose. With a foreign key, MySQL would refuse the Delhi row. We want it here to see how each JOIN behaves.`),

  h(`The Basic Pattern`),
  c(`SELECT columns\nFROM table1\nJOIN_TYPE table2\nON table1.column = table2.column;`),
  p(`ON tells MySQL which column of one table matches which column of the other.`),

  h(`1. INNER JOIN (only matching rows)`),
  p(`Returns only the rows that have a match in both tables.`),
  c(`SELECT users.name, addresses.city\nFROM users\nINNER JOIN addresses\nON users.id = addresses.user_id;`),
  dt(`Result: INNER JOIN`,
    [`name`, `city`],
    [`Aarav`, `Mumbai`],
    [`Sneha`, `Kolkata`]
  ),
  ul(
    `Raj is excluded because he has no matching address.`,
    `Delhi is excluded because its user_id (4) is not in users.`
  ),
  c(`users       addresses\n-----       ---------\n| 1 |  <->  | 1 |\n| 2 |  <->  | 2 |\n| 3 |       |   |      (no match)\n            | 4 |      (no match)\n\n=> only the matching pairs`),

  h(`2. LEFT JOIN (everything from the left table)`),
  p(`Returns all rows from the left table (users) and the matching rows from the right table (addresses). If there is no match, the right side shows NULL.`),
  c(`SELECT users.name, addresses.city\nFROM users\nLEFT JOIN addresses\nON users.id = addresses.user_id;`),
  dt(`Result: LEFT JOIN`,
    [`name`, `city`],
    [`Aarav`, `Mumbai`],
    [`Sneha`, `Kolkata`],
    [`Raj`, `NULL`]
  ),
  p(`Raj is shown even though he does not have an address.`),
  c(`=> all users + matched addresses (or NULL)`),

  h(`3. RIGHT JOIN (everything from the right table)`),
  p(`Returns all rows from the right table (addresses) and the matching rows from the left table (users). If there is no match, the left side shows NULL.`),
  c(`SELECT users.name, addresses.city\nFROM users\nRIGHT JOIN addresses\nON users.id = addresses.user_id;`),
  dt(`Result: RIGHT JOIN`,
    [`name`, `city`],
    [`Aarav`, `Mumbai`],
    [`Sneha`, `Kolkata`],
    [`NULL`, `Delhi`]
  ),
  p(`Delhi is shown even though it points to a user_id that does not exist.`),
  c(`=> all addresses + matched users (or NULL)`),

  h(`Summary Table`),
  tb([`JOIN`, `What you get`, `In our example`],
    [`INNER JOIN`, `Only rows that match in both tables`, `Aarav, Sneha`],
    [`LEFT JOIN`, `All left rows + matches from the right`, `Aarav, Sneha, Raj`],
    [`RIGHT JOIN`, `All right rows + matches from the left`, `Aarav, Sneha, Delhi's row`]
  ),
  n(`Memory trick: INNER = both sides must match. LEFT = keep every left row. RIGHT = keep every right row.`),

  h(`Handy Tips`),
  p(`1. Use short aliases so the query is easier to read:`),
  c(`SELECT u.name, a.city\nFROM users u\nINNER JOIN addresses a\nON u.id = a.user_id;`),
  p(`2. Find users who have no address (a very common question):`),
  c(`SELECT u.name\nFROM users u\nLEFT JOIN addresses a\nON u.id = a.user_id\nWHERE a.id IS NULL;`),
  p(`Result: Raj.`),
  p(`3. MySQL has no FULL OUTER JOIN keyword. If you ever need everything from both sides, combine a LEFT and a RIGHT JOIN with UNION (you will see UNION in the next lecture):`),
  c(`SELECT u.name, a.city FROM users u LEFT JOIN addresses a ON u.id = a.user_id\nUNION\nSELECT u.name, a.city FROM users u RIGHT JOIN addresses a ON u.id = a.user_id;`),

  h(`Common Mistakes`),
  tb([`Mistake`, `What happens`],
    [`Forgetting the ON condition`, `Every row is matched with every other row (a huge, wrong result)`],
    [`Using INNER JOIN when you wanted all users`, `Users without a match disappear`],
    [`Writing just id or name when both tables have it`, `Error: column is ambiguous. Write users.id or u.id.`]
  ),

  h(`Quick Recap`),
  ul(
    `JOIN combines rows of two tables using a related column.`,
    `INNER = matches only, LEFT = all left rows, RIGHT = all right rows.`,
    `Non-matching sides show NULL.`
  ),
  q(
    { q: `Show every address with the name of its user, keeping addresses even if the user does not exist.`, a: `SELECT u.name, a.city\nFROM users u\nRIGHT JOIN addresses a\nON u.id = a.user_id;` },
    { q: `List the users who do not have any address.`, a: `SELECT u.name\nFROM users u\nLEFT JOIN addresses a\nON u.id = a.user_id\nWHERE a.id IS NULL;` }
  )
]},

// =====================================================================
{ id: 15, title: `UNION and UNION ALL`, sub: `Combining the results of two queries into one list`, blocks: [

  h(`First, the Problem`),
  p(`You have a users table for normal users and another table, admin_users, for admins. Your manager says: "Give me one single list of all names."`),
  p(`A JOIN will not help here, because JOIN places columns side by side. You need to place the second list below the first one, like stacking two lists of names. That is UNION.`),

  h(`JOIN vs UNION`),
  tb([`JOIN`, `UNION`],
    [`Combines columns, side by side`, `Combines rows, one below the other`],
    [`Works on related tables`, `Works on any two queries with the same number of columns`]
  ),

  h(`Step 1: Create the admin_users Table`),
  c(`CREATE TABLE admin_users (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    email VARCHAR(100),\n    gender ENUM('Male', 'Female', 'Other'),\n    date_of_birth DATE,\n    salary INT\n);`),

  h(`Step 2: Insert Sample Data`),
  c(`INSERT INTO admin_users\n(id, name, email, gender, date_of_birth, salary)\nVALUES\n(101, 'Anil Kumar', 'anil@example.com', 'Male', '1985-04-12', 60000),\n(102, 'Pooja Sharma', 'pooja@example.com', 'Female', '1992-09-20', 58000),\n(103, 'Rakesh Yadav', 'rakesh@example.com', 'Male', '1989-11-05', 54000),\n(104, 'Fatima Begum', 'fatima@example.com', 'Female', '1990-06-30', 62000);`),

  h(`Step 3: UNION (removes duplicates)`),
  c(`SELECT name FROM users\nUNION\nSELECT name FROM admin_users;`),
  p(`This returns a single list of unique names from both tables.`),

  h(`UNION vs UNION ALL: See the Difference`),
  p(`Imagine two small lists of names:`),
  tb([`List 1 (users)`, `List 2 (admin_users)`],
    [`Alice`, `Anil`],
    [`Bob`, `Pooja`],
    [`Charlie`, `Alice`]
  ),
  tb([`Command`, `Result`, `Rows`],
    [`UNION`, `Alice, Bob, Charlie, Anil, Pooja`, `5 (Alice appears once)`],
    [`UNION ALL`, `Alice, Bob, Charlie, Anil, Pooja, Alice`, `6 (Alice appears twice)`]
  ),
  c(`-- Keeps duplicates, and it is faster\nSELECT name FROM users\nUNION ALL\nSELECT name FROM admin_users;`),
  n(`UNION has to check for duplicates, so it is slower. If you know there are no duplicates, or you want to keep them, use UNION ALL.`),

  h(`Selecting More Than One Column`),
  p(`Both queries must return the same number of columns with compatible types.`),
  c(`SELECT name, salary FROM users\nUNION\nSELECT name, salary FROM admin_users;`),

  h(`Adding a Role Label`),
  p(`A fixed text column helps you see which table each row came from.`),
  c(`SELECT name, 'User' AS role\nFROM users\nUNION\nSELECT name, 'Admin' AS role\nFROM admin_users;`),
  p(`Because the role is different, the same person in both tables is no longer a duplicate. UNION compares the whole row, not just the name.`),

  h(`Sorting the Combined Result`),
  p(`Put ORDER BY once, at the very end:`),
  c(`SELECT name FROM users\nUNION\nSELECT name FROM admin_users\nORDER BY name;`),

  h(`Rules of UNION`),
  ul(
    `The number of columns must be the same in all SELECT statements.`,
    `The data types must be compatible.`,
    `Column names of the result come from the first SELECT.`,
    `UNION removes duplicates, UNION ALL keeps them.`
  ),
  n(`If the column counts are different, MySQL shows: The used SELECT statements have a different number of columns.`),

  h(`When to Use UNION`),
  ul(
    `Two similar tables, like current and archived data.`,
    `Combining filtered results from different sources.`,
    `Reports that cover multiple categories.`
  ),

  h(`Summary`),
  tb([`Operator`, `Behaviour`],
    [`UNION`, `Combines results, removes duplicates`],
    [`UNION ALL`, `Combines results, keeps duplicates`]
  ),
  q(
    { q: `Get one list of all emails from users and admin_users, including duplicates.`, a: `SELECT email FROM users\nUNION ALL\nSELECT email FROM admin_users;` },
    { q: `Why does this give an error? SELECT name FROM users UNION SELECT name, salary FROM admin_users;`, a: `The first query has 1 column and the second has 2. Both SELECTs in a UNION must have the same number of columns.` }
  )
]},

// =====================================================================
{ id: 16, title: `Self JOIN`, sub: `Joining a table with itself, explained step by step with simple examples`, blocks: [

  h(`First, the Problem (Why do we even need it?)`),
  p(`Imagine a referral app. When a new person signs up, they can say "Aarav told me about this app". We want to save WHO referred them.`),
  p(`Where do we save the referrer? In the same users table, in a column called referred_by_id. Aarav is also a user, so he already has his own row and his own id in the table.`),
  dt(`Table: users`,
    [`id`, `name`, `referred_by_id`],
    [`1`, `Aarav`, `NULL`],
    [`2`, `Sneha`, `1`],
    [`3`, `Raj`, `1`],
    [`4`, `Fatima`, `2`],
    [`5`, `Priya`, `NULL`]
  ),
  n(`To practice, use a fresh users table with just id and name, and insert these 5 names (Aarav, Sneha, Raj, Fatima, Priya). Step 1 below adds the referred_by_id column.`),
  p(`Now suppose someone asks: "Show me every user along with the NAME of the person who referred them."`),
  p(`The problem: the table only shows numbers (1, 1, 2). The names of the referrers are sitting in other rows of the same table. So we need to look into the same table again to find them. This is exactly what a Self JOIN does.`),

  h(`Real-Life Analogy`),
  p(`Think of a class register. Every student has a roll number and a "buddy roll number". To find the buddy's name, you go back to the same register and search for that roll number.`),
  p(`One register, used two times = Self JOIN.`),

  h(`What is a Self JOIN? (Theory)`),
  p(`A Self JOIN is NOT a new command. There is no keyword called SELF JOIN. It is just a normal JOIN where both sides are the same table.`),
  ul(
    `Normal JOIN: Table A joined with Table B.`,
    `Self JOIN: users joined with users.`,
    `Problem: MySQL gets confused if the same table name appears twice.`,
    `Solution: give the table two different nicknames (called aliases), like a and b.`
  ),
  tb([`Alias`, `Role in our example`, `Think of it as`],
    [`a`, `The user we are looking at`, `The person`],
    [`b`, `The person who referred that user`, `The referrer`]
  ),
  n(`Remember: there is still only ONE real table. a and b are just two names for the same table, so MySQL can tell the two roles apart.`),

  h(`Where is Self JOIN Used?`),
  p(`Whenever a table has a column that points to the id of the SAME table, you need a Self JOIN to read it.`),
  tb([`Case`, `Table`, `Column that points to the same table`],
    [`Referrals`, `users`, `referred_by_id`],
    [`Employee and Manager`, `employees`, `manager_id`],
    [`Category and Sub-category`, `categories`, `parent_id`],
    [`Comment and Reply`, `comments`, `parent_comment_id`]
  ),

  h(`Step 1: Setup (Add the Referral Column)`),
  c(`ALTER TABLE users\nADD COLUMN referred_by_id INT;\n\n-- User 1 referred Users 2 and 3\nUPDATE users SET referred_by_id = 1 WHERE id IN (2, 3);\n\n-- User 2 referred User 4\nUPDATE users SET referred_by_id = 2 WHERE id = 4;`),
  ul(
    `referred_by_id is NULL for users who joined on their own (nobody referred them).`,
    `Otherwise it holds the id of the user who referred them.`
  ),

  h(`Step 2: Imagine Two Copies of the Table`),
  p(`Before writing the query, just picture two copies of users side by side:`),
  dt(`Copy a (the user)`,
    [`a.id`, `a.name`, `a.referred_by_id`],
    [`1`, `Aarav`, `NULL`],
    [`2`, `Sneha`, `1`],
    [`3`, `Raj`, `1`],
    [`4`, `Fatima`, `2`],
    [`5`, `Priya`, `NULL`]
  ),
  dt(`Copy b (the referrer)`,
    [`b.id`, `b.name`],
    [`1`, `Aarav`],
    [`2`, `Sneha`],
    [`3`, `Raj`],
    [`4`, `Fatima`],
    [`5`, `Priya`]
  ),
  p(`The matching rule is: take a.referred_by_id and find the row in copy b whose b.id is the same number.`),
  tb([`User (a.name)`, `a.referred_by_id`, `Matching b.id`, `Referrer (b.name)`],
    [`Aarav`, `NULL`, `No match`, `-`],
    [`Sneha`, `1`, `1`, `Aarav`],
    [`Raj`, `1`, `1`, `Aarav`],
    [`Fatima`, `2`, `2`, `Sneha`],
    [`Priya`, `NULL`, `No match`, `-`]
  ),
  p(`Notice: Aarav and Priya have NULL, and NULL matches nothing. Keep this in mind, it matters in the next step.`),

  h(`Step 3: First Query (INNER JOIN)`),
  c(`SELECT\n    a.name AS user_name,\n    b.name AS referred_by\nFROM users a\nINNER JOIN users b\n    ON a.referred_by_id = b.id;`),
  dt(`Result: INNER JOIN`,
    [`user_name`, `referred_by`],
    [`Sneha`, `Aarav`],
    [`Raj`, `Aarav`],
    [`Fatima`, `Sneha`]
  ),
  p(`It works, but Aarav and Priya are missing! INNER JOIN keeps only the rows that have a match, and they have no referrer.`),

  h(`Step 4: Fix it with LEFT JOIN`),
  p(`If we want ALL users, even those without a referrer, we use LEFT JOIN. It keeps every row from the left side (a) and fills NULL when there is no match.`),
  c(`SELECT\n    a.id,\n    a.name AS user_name,\n    b.name AS referred_by\nFROM users a\nLEFT JOIN users b\n    ON a.referred_by_id = b.id;`),
  dt(`Result: LEFT JOIN`,
    [`id`, `user_name`, `referred_by`],
    [`1`, `Aarav`, `NULL`],
    [`2`, `Sneha`, `Aarav`],
    [`3`, `Raj`, `Aarav`],
    [`4`, `Fatima`, `Sneha`],
    [`5`, `Priya`, `NULL`]
  ),

  h(`How to Read This Query (line by line)`),
  tb([`Line`, `Meaning in simple words`],
    [`FROM users a`, `Take the users table and call it a (the person)`],
    [`LEFT JOIN users b`, `Take the same table again and call it b (the referrer). Keep all rows of a.`],
    [`ON a.referred_by_id = b.id`, `The number stored in a.referred_by_id is the id of a row in b`],
    [`a.name AS user_name`, `Name of the person`],
    [`b.name AS referred_by`, `Name of the referrer`]
  ),

  h(`Step 5 (Optional): Make NULL Look Nice`),
  p(`COALESCE gives a replacement text when the value is NULL:`),
  c(`SELECT\n    a.id,\n    a.name AS user_name,\n    COALESCE(b.name, 'Direct Signup') AS referred_by\nFROM users a\nLEFT JOIN users b\n    ON a.referred_by_id = b.id;`),
  dt(`Result: with COALESCE`,
    [`id`, `user_name`, `referred_by`],
    [`1`, `Aarav`, `Direct Signup`],
    [`2`, `Sneha`, `Aarav`],
    [`3`, `Raj`, `Aarav`],
    [`4`, `Fatima`, `Sneha`],
    [`5`, `Priya`, `Direct Signup`]
  ),

  h(`More Examples`),
  p(`Example A: Who did Aarav refer? (add a WHERE condition on b)`),
  c(`SELECT a.name AS referred_user\nFROM users a\nINNER JOIN users b\n    ON a.referred_by_id = b.id\nWHERE b.name = 'Aarav';`),
  dt(`Result: users referred by Aarav`,
    [`referred_user`],
    [`Sneha`],
    [`Raj`]
  ),
  p(`Example B: Employee and Manager. Same pattern, different table. Here manager_id stores the id of the employee's manager.`),
  dt(`Table: employees`,
    [`id`, `name`, `manager_id`],
    [`1`, `Rohan (CEO)`, `NULL`],
    [`2`, `Priya`, `1`],
    [`3`, `Amit`, `1`],
    [`4`, `Neha`, `2`]
  ),
  c(`SELECT\n    e.name AS employee,\n    m.name AS manager\nFROM employees e\nLEFT JOIN employees m\n    ON e.manager_id = m.id;`),
  dt(`Result: employee and manager`,
    [`employee`, `manager`],
    [`Rohan (CEO)`, `NULL`],
    [`Priya`, `Rohan (CEO)`],
    [`Amit`, `Rohan (CEO)`],
    [`Neha`, `Priya`]
  ),
  n(`See the pattern? In both examples it is the same: first alias = the row we start from, second alias = the row it points to, and ON connects the "pointer column" with id.`),

  h(`Common Mistakes`),
  tb([`Mistake`, `What happens`, `Fix`],
    [`Not using aliases (FROM users JOIN users ...)`, `Error: Not unique table/alias`, `Always write users a and users b`],
    [`Writing ON a.id = b.referred_by_id (swapped)`, `Roles get reversed, you show the wrong person as the referrer`, `The pointer column goes with the person: a.referred_by_id = b.id`],
    [`Using INNER JOIN when you want everyone`, `Rows with NULL (like Aarav) disappear`, `Use LEFT JOIN`],
    [`Writing just name in SELECT`, `Error: Column is ambiguous`, `Write a.name or b.name`]
  ),

  h(`Quick Recap`),
  ul(
    `Self JOIN = joining a table with itself.`,
    `Use it when a column in a table points to the id of the same table.`,
    `Give two aliases (a and b) so MySQL can tell the two copies apart.`,
    `INNER JOIN = only matched rows. LEFT JOIN = everyone, with NULL where there is no match.`,
    `Common uses: referrals, employee-manager, category-subcategory, comment-reply.`
  ),
  q(
    { q: `Show only the users who WERE referred by someone (no NULL rows).`, a: `SELECT a.name AS user_name, b.name AS referred_by\nFROM users a\nINNER JOIN users b\n    ON a.referred_by_id = b.id;` },
    { q: `Find all users referred by Sneha.`, a: `SELECT a.name\nFROM users a\nINNER JOIN users b\n    ON a.referred_by_id = b.id\nWHERE b.name = 'Sneha';\n\n-- Result: Fatima` },
    { q: `Show every employee with their manager. If there is no manager, show 'No Manager'.`, a: `SELECT e.name AS employee,\n    COALESCE(m.name, 'No Manager') AS manager\nFROM employees e\nLEFT JOIN employees m\n    ON e.manager_id = m.id;` },
    { q: `Show each referrer and the person they referred (referrer first, then the new user).`, a: `SELECT b.name AS referrer, a.name AS referred_user\nFROM users a\nINNER JOIN users b\n    ON a.referred_by_id = b.id;` }
  )
]},

// =====================================================================
{ id: 17, title: `Views`, sub: `Virtual tables: simplify queries, hide columns, reuse logic`, blocks: [

  h(`First, the Problem`),
  p(`Suppose you often run this query: "show users earning more than 70,000". Every time you type the same SELECT with the same WHERE. Now imagine a bigger query with 3 or 4 joins. Typing it again and again is boring and risky, because someone may write it slightly differently.`),
  p(`Another problem: you want to let an intern see names but not salaries. You cannot hide a single column of a table directly.`),
  p(`A view solves both.`),

  h(`What is a View? (Theory)`),
  p(`A view is a virtual table based on the result of a SELECT query. It does not store data itself. It always reflects the current data in the base tables.`),
  p(`Analogy: a view is like a window. You are not copying the room, you are just looking at a part of it. If something changes in the room, you see the change through the window.`),
  tb([`Benefit`, `Explanation`],
    [`Simplify complex queries`, `A long join becomes SELECT * FROM view_name`],
    [`Reuse logic`, `Everybody uses the same definition`],
    [`Hide columns (security)`, `Show only safe columns, hide salary, password, etc.`],
    [`Live snapshot`, `Always up to date, nothing to refresh`]
  ),
  n(`In this lecture we use the small users table with salary: Aarav 80000, Sneha 75000, Raj 72000, Fatima 85000, Priya 70000 (ids 1 to 5).`),

  h(`Creating a View`),
  p(`A view that lists all users earning more than 70,000:`),
  c(`CREATE VIEW high_salary_users AS\nSELECT id, name, salary\nFROM users\nWHERE salary > 70000;`),

  h(`Querying a View`),
  p(`Use it exactly like a table:`),
  c(`SELECT * FROM high_salary_users;`),
  dt(`Output`,
    [`id`, `name`, `salary`],
    [`1`, `Aarav`, `80000`],
    [`2`, `Sneha`, `75000`],
    [`3`, `Raj`, `72000`],
    [`4`, `Fatima`, `85000`]
  ),

  h(`How Views Stay Updated`),
  p(`Priya earns 70000, so she is not in the view. Let us give her a raise:`),
  c(`UPDATE users\nSET salary = 72000\nWHERE name = 'Priya';\n\nSELECT * FROM high_salary_users;`),
  dt(`New Output`,
    [`id`, `name`, `salary`],
    [`1`, `Aarav`, `80000`],
    [`2`, `Sneha`, `75000`],
    [`3`, `Raj`, `72000`],
    [`4`, `Fatima`, `85000`],
    [`5`, `Priya`, `72000`]
  ),
  p(`Priya is now included. We did not touch the view. This is because a view always shows live data from the original table.`),

  h(`Use 2: Hiding Sensitive Columns`),
  c(`CREATE VIEW public_users AS\nSELECT id, name\nFROM users;\n\nSELECT * FROM public_users;`),
  p(`Anyone who can only use public_users never sees salary or other private columns.`),

  h(`Use 3: Saving a Long Join`),
  c(`CREATE VIEW user_cities AS\nSELECT u.name, a.city\nFROM users u\nINNER JOIN addresses a\nON u.id = a.user_id;\n\n-- Now the long join is just this:\nSELECT * FROM user_cities;`),

  h(`Managing Views`),
  c(`-- Change a view\nCREATE OR REPLACE VIEW high_salary_users AS\nSELECT id, name, salary\nFROM users\nWHERE salary > 75000;\n\n-- See views along with tables\nSHOW FULL TABLES WHERE Table_type = 'VIEW';\n\n-- Remove a view\nDROP VIEW high_salary_users;`),
  p(`Dropping a view deletes only the saved query. The real table and its data are not touched.`),

  h(`Summary`),
  ul(
    `Views act like saved SELECT queries.`,
    `Views are not duplicated data.`,
    `Changes in the base tables are reflected automatically.`,
    `Great for simplifying complex queries and giving filtered access.`
  ),
  q(
    { q: `Create a view female_users with id, name and salary of female users.`, a: `CREATE VIEW female_users AS\nSELECT id, name, salary\nFROM users\nWHERE gender = 'Female';` },
    { q: `Does a view store its own copy of the data?`, a: `No. It only stores the SELECT query and reads the live data from the base table every time.` }
  )
]},

// =====================================================================
{ id: 18, title: `Indexes`, sub: `Faster searching: single-column and multi-column indexes`, blocks: [

  h(`First, the Problem`),
  p(`You have 10 lakh users and you run:`),
  c(`SELECT * FROM users WHERE email = 'bob@example.com';`),
  p(`Without any help, MySQL checks row 1, row 2, row 3 ... all the way until it finds the email. This is called a full table scan. It is like finding a word in a 1000-page book by reading every page.`),
  p(`In a real book you would open the index at the back, find the page number and jump straight there. A database index does exactly this.`),

  h(`What is an Index? (Theory)`),
  p(`Indexes speed up data retrieval. They work like the index of a book, helping MySQL find rows faster, especially for searches, filters and joins.`),
  tb([`Operation`, `Without index`, `With index`],
    [`Find one user by email in 1,000,000 rows`, `Checks rows one by one (slow)`, `Jumps almost directly to it (fast)`],
    [`ORDER BY on a column`, `Has to sort every time`, `Can read the already sorted index`]
  ),
  n(`Your PRIMARY KEY and UNIQUE columns already get an index automatically.`),

  h(`Viewing Indexes on a Table`),
  c(`SHOW INDEXES FROM users;`),
  p(`This shows all indexes on the users table, including the automatically created primary key index.`),

  h(`Creating a Single-Column Index`),
  p(`If you search users by email all the time, index the email column.`),
  c(`CREATE INDEX idx_email ON users(email);`),
  p(`This creates an index named idx_email and speeds up queries like:`),
  c(`SELECT * FROM users WHERE email = 'example@example.com';`),

  h(`Creating a Multi-Column (Composite) Index`),
  p(`If you often filter using both gender and salary, one combined index is better than two separate ones.`),
  c(`CREATE INDEX idx_gender_salary ON users(gender, salary);\n\nSELECT * FROM users\nWHERE gender = 'Female' AND salary > 70000;`),

  h(`Index Order Matters (Leftmost Rule)`),
  p(`For an index on (gender, salary), MySQL can use it only from the left side. Think of a phone book sorted by last name and then first name. You can search by last name, but you cannot easily search only by first name.`),
  tb([`Query WHERE clause`, `Uses the index?`, `Reason`],
    [`gender = 'Female' AND salary > 70000`, `Yes`, `Uses both columns in order`],
    [`gender = 'Female'`, `Yes`, `Uses the first (leftmost) column`],
    [`salary > 70000`, `Not effectively`, `The first column (gender) is missing`]
  ),

  h(`Dropping an Index`),
  c(`DROP INDEX idx_email ON users;`),

  h(`The Trade-off: Do Not Index Everything`),
  ul(
    `Indexes consume extra disk space.`,
    `They slow down INSERT, UPDATE and DELETE slightly, because the index must be updated as well.`,
    `Index only the columns you use often in WHERE, JOIN and ORDER BY.`
  ),

  h(`Summary`),
  tb([`Feature`, `Description`],
    [`SHOW INDEXES`, `View current indexes of a table`],
    [`CREATE INDEX`, `Create single or multi-column indexes`],
    [`DROP INDEX`, `Remove an index`],
    [`Use when`, `Searching on large tables is slow`],
    [`Avoid on`, `Columns that are rarely searched, or tiny tables`]
  ),
  q(
    { q: `Create an index to speed up searching users by name.`, a: `CREATE INDEX idx_name ON users(name);` },
    { q: `Will an index on (gender, salary) help the query WHERE salary > 60000?`, a: `Not effectively, because the leftmost column (gender) is missing from the filter.` }
  )
]},

// =====================================================================
{ id: 19, title: `Subqueries`, sub: `A query inside a query: scalar, IN and derived tables`, blocks: [

  h(`First, the Problem`),
  p(`"Show me all users who earn more than the average salary." To answer this you need two steps: first find the average, then compare every salary with it.`),
  p(`Can you do it in one query? You cannot write WHERE salary > AVG(salary) directly. The solution is to put the first step inside the second one. That is a subquery.`),

  h(`What is a Subquery? (Theory)`),
  p(`A subquery is a query written inside another query, in brackets. The inner query runs first and gives its result to the outer query. It helps to break a complex problem into smaller parts.`),
  p(`It can be used in:`),
  ul(
    `WHERE clauses`,
    `SELECT lists`,
    `FROM clauses`
  ),
  dt(`Table used in this lecture: users`,
    [`id`, `name`, `salary`, `referred_by_id`],
    [`1`, `Aarav`, `80000`, `NULL`],
    [`2`, `Sneha`, `75000`, `1`],
    [`3`, `Raj`, `72000`, `1`],
    [`4`, `Fatima`, `85000`, `2`],
    [`5`, `Priya`, `70000`, `NULL`]
  ),

  h(`1. Scalar Subquery (returns a single value)`),
  p(`Find users who earn more than the average salary of all users.`),
  c(`SELECT id, name, salary\nFROM users\nWHERE salary > (\n    SELECT AVG(salary) FROM users\n);`),
  ul(
    `The inner query SELECT AVG(salary) FROM users returns one value: 76400.`,
    `The outer query selects users with salary greater than 76400.`
  ),
  dt(`Output`,
    [`id`, `name`, `salary`],
    [`1`, `Aarav`, `80000`],
    [`4`, `Fatima`, `85000`]
  ),

  h(`2. Subquery with IN (returns many values)`),
  p(`Find users who were referred by someone who earns more than 75,000.`),
  c(`SELECT id, name, referred_by_id\nFROM users\nWHERE referred_by_id IN (\n    SELECT id FROM users WHERE salary > 75000\n);`),
  ul(
    `The inner query returns the ids of users earning more than 75,000: 1 (Aarav) and 4 (Fatima).`,
    `The outer query selects users whose referred_by_id is in that list.`
  ),
  dt(`Output`,
    [`id`, `name`, `referred_by_id`],
    [`2`, `Sneha`, `1`],
    [`3`, `Raj`, `1`]
  ),

  h(`3. Subquery in SELECT (a calculated column)`),
  c(`SELECT name, salary,\n    (SELECT AVG(salary) FROM users) AS average_salary\nFROM users;`),
  p(`This shows each user's salary along with the overall average, side by side.`),

  h(`4. Subquery in FROM (a derived table)`),
  p(`The result of the inner query acts like a temporary table. It must have an alias.`),
  c(`SELECT name, salary\nFROM (\n    SELECT name, salary FROM users WHERE salary > 72000\n) AS rich_users;`),
  dt(`Output`,
    [`name`, `salary`],
    [`Aarav`, `80000`],
    [`Sneha`, `75000`],
    [`Fatima`, `85000`]
  ),
  n(`A subquery in FROM must always have an alias (AS rich_users), otherwise MySQL gives an error.`),

  h(`Summary`),
  tb([`Subquery type`, `Use case`],
    [`Scalar subquery`, `Returns one value (e.g. AVG, MAX)`],
    [`Subquery with IN`, `Returns multiple values`],
    [`Subquery in SELECT`, `Shows a related calculated value`],
    [`Subquery in FROM`, `Acts as a temporary virtual table`]
  ),
  p(`Subqueries are powerful when filtering based on computed or dynamic conditions.`),
  q(
    { q: `Find the user(s) with the highest salary using a subquery.`, a: `SELECT name, salary\nFROM users\nWHERE salary = (SELECT MAX(salary) FROM users);` },
    { q: `Find users who earn less than the average salary.`, a: `SELECT name, salary\nFROM users\nWHERE salary < (SELECT AVG(salary) FROM users);\n\n-- Result: Sneha, Raj, Priya` }
  )
]},

// =====================================================================
{ id: 20, title: `GROUP BY and HAVING`, sub: `Bucketing rows, summary calculations, HAVING vs WHERE, ROLLUP`, blocks: [

  h(`First, the Problem`),
  p(`Aggregate functions like AVG(salary) give one answer for the whole table. But your boss asks: "What is the average salary for men and for women separately?" or "How many users did each person refer?"`),
  p(`You need to put rows into groups first, then calculate for each group. That is GROUP BY.`),
  p(`Analogy: a teacher asks all students to stand in groups by their class, then counts how many are in each group.`),

  h(`What are GROUP BY and HAVING? (Theory)`),
  ul(
    `GROUP BY collects rows that have the same value in the chosen column(s) into one group. It is normally used with COUNT, SUM, AVG, MIN or MAX.`,
    `HAVING filters the groups after the calculation, in the same way WHERE filters individual rows.`
  ),
  dt(`Table used: users`,
    [`id`, `name`, `gender`, `salary`, `referred_by_id`],
    [`1`, `Aarav`, `Male`, `80000`, `NULL`],
    [`2`, `Sneha`, `Female`, `75000`, `1`],
    [`3`, `Raj`, `Male`, `72000`, `1`],
    [`4`, `Fatima`, `Female`, `85000`, `2`],
    [`5`, `Priya`, `Female`, `70000`, `NULL`]
  ),

  h(`1. GROUP BY: Average Salary by Gender`),
  c(`SELECT gender, AVG(salary) AS average_salary\nFROM users\nGROUP BY gender;`),
  ul(
    `MySQL puts users into groups by gender (Male group, Female group).`,
    `Then it calculates the average salary of each group.`
  ),
  dt(`Output`,
    [`gender`, `average_salary`],
    [`Male`, `76000.0000`],
    [`Female`, `76666.6667`]
  ),
  p(`Counting users in each group:`),
  c(`SELECT gender, COUNT(*) AS total_users\nFROM users\nGROUP BY gender;`),
  dt(`Output`,
    [`gender`, `total_users`],
    [`Male`, `2`],
    [`Female`, `3`]
  ),

  h(`2. GROUP BY with COUNT: How Many Users Did Each Person Refer?`),
  c(`SELECT referred_by_id, COUNT(*) AS total_referred\nFROM users\nWHERE referred_by_id IS NOT NULL\nGROUP BY referred_by_id;`),
  dt(`Output`,
    [`referred_by_id`, `total_referred`],
    [`1`, `2`],
    [`2`, `1`]
  ),

  h(`3. HAVING: Filtering the Groups`),
  p(`Show only genders where the average salary is greater than 76,000.`),
  c(`SELECT gender, AVG(salary) AS avg_salary\nFROM users\nGROUP BY gender\nHAVING AVG(salary) > 76000;`),
  dt(`Output`,
    [`gender`, `avg_salary`],
    [`Female`, `76666.6667`]
  ),
  p(`Another example: users who referred more than 1 person.`),
  c(`SELECT referred_by_id, COUNT(*) AS total_referred\nFROM users\nWHERE referred_by_id IS NOT NULL\nGROUP BY referred_by_id\nHAVING COUNT(*) > 1;`),
  dt(`Output`,
    [`referred_by_id`, `total_referred`],
    [`1`, `2`]
  ),

  h(`WHERE vs HAVING (The Golden Rule)`),
  p(`Why not use WHERE for AVG(salary) > 76000? Because WHERE works before the groups are formed, so averages do not exist yet. HAVING works after the groups are formed.`),
  tb([`Clause`, `When it filters`, `Can use aggregates (AVG, COUNT)?`],
    [`WHERE`, `Individual rows, BEFORE grouping`, `No`],
    [`GROUP BY`, `Makes the groups`, `Not applicable`],
    [`HAVING`, `Groups, AFTER grouping`, `Yes`]
  ),
  p(`Order of writing a full query:`),
  c(`SELECT ...\nFROM ...\nWHERE ...        -- filter rows\nGROUP BY ...    -- make groups\nHAVING ...      -- filter groups\nORDER BY ...    -- sort\nLIMIT ...;      -- cut`),

  h(`4. WITH ROLLUP (Subtotals and Grand Total)`),
  c(`SELECT gender, COUNT(*) AS total_users\nFROM users\nGROUP BY gender WITH ROLLUP;`),
  dt(`Output`,
    [`gender`, `total_users`],
    [`Female`, `3`],
    [`Male`, `2`],
    [`NULL`, `5`]
  ),
  p(`The last row (gender = NULL) is the grand total for all users.`),

  h(`Common Mistake`),
  p(`Selecting a column that is not in GROUP BY and is not inside an aggregate function. Example: SELECT name, gender, AVG(salary) ... GROUP BY gender. MySQL does not know which name to show for a group, so it gives an error. Only show the grouped column(s) and aggregates.`),

  h(`Summary`),
  ul(
    `GROUP BY groups rows, aggregates calculate per group.`,
    `WHERE filters rows before grouping, HAVING filters groups after.`,
    `WITH ROLLUP adds subtotals and a grand total.`
  ),
  q(
    { q: `Find the highest salary for each gender.`, a: `SELECT gender, MAX(salary) AS highest\nFROM users\nGROUP BY gender;` },
    { q: `Show only genders that have more than 2 users.`, a: `SELECT gender, COUNT(*) AS total\nFROM users\nGROUP BY gender\nHAVING COUNT(*) > 2;\n\n-- Result: Female (3)` }
  )
]},

// =====================================================================
{ id: 21, title: `Stored Procedures`, sub: `Reusable saved SQL programs, parameters and DELIMITER`, blocks: [

  h(`First, the Problem`),
  p(`Every time a new user registers, you run the same INSERT query. Many parts of your app do the same task, and each one has its own copy of the query. If the logic changes, you must fix it everywhere.`),
  p(`Better idea: save the logic once inside MySQL, give it a name, and just say CALL name whenever you need it. That is a stored procedure. It is like a function in programming, or a saved recipe in your kitchen.`),

  h(`What is a Stored Procedure? (Theory)`),
  p(`A stored procedure is a saved block of SQL stored in the database that can be executed later. It is useful for logic that is reused many times, such as queries, updates or conditional operations.`),
  ul(
    `Reusable: write once, call many times.`,
    `Efficient: one CALL runs many statements.`,
    `Secure: you can give a user permission to EXECUTE the procedure without giving direct access to the tables.`
  ),

  h(`Why Change the Delimiter?`),
  p(`MySQL normally treats a semicolon (;) as the end of a statement. But a procedure has many statements inside, each ending with ;. MySQL would stop at the first one and get confused.`),
  p(`So we temporarily change the delimiter to something else (like $$ or //), create the procedure, then change it back to ;.`),

  h(`Basic Syntax`),
  c(`DELIMITER $$\n\nCREATE PROCEDURE procedure_name()\nBEGIN\n    -- SQL statements go here\nEND$$\n\nDELIMITER ;`),

  h(`Example 1: A Simple Procedure (no input)`),
  c(`DELIMITER $$\n\nCREATE PROCEDURE GetAllUsers()\nBEGIN\n    SELECT * FROM users;\nEND$$\n\nDELIMITER ;\n\nCALL GetAllUsers();`),

  h(`Example 2: A Procedure with Input Parameters`),
  p(`Let us create a procedure that inserts a new user.`),
  c(`DELIMITER $$\n\nCREATE PROCEDURE AddUser(\n    IN p_name VARCHAR(100),\n    IN p_email VARCHAR(100),\n    IN p_gender ENUM('Male', 'Female', 'Other'),\n    IN p_dob DATE,\n    IN p_salary INT\n)\nBEGIN\n    INSERT INTO users (name, email, gender, date_of_birth, salary)\n    VALUES (p_name, p_email, p_gender, p_dob, p_salary);\nEND$$\n\nDELIMITER ;`),
  ul(
    `This creates a procedure named AddUser that accepts five input parameters.`,
    `Input parameters are declared with the IN keyword.`,
    `Names start with p_ only to avoid mixing with column names.`
  ),

  h(`Calling the Procedure`),
  c(`CALL AddUser('Kiran Sharma', 'kiran@example.com',\n'Female', '1994-06-15', 72000);`),
  p(`This inserts the new user into the users table.`),

  h(`Viewing and Dropping Procedures`),
  c(`-- See procedures of a database\nSHOW PROCEDURE STATUS WHERE Db = 'startersql';\n\n-- Remove a procedure\nDROP PROCEDURE IF EXISTS AddUser;`),

  h(`Summary`),
  tb([`Command`, `Purpose`],
    [`DELIMITER $$`, `Temporarily change the statement delimiter`],
    [`CREATE PROCEDURE`, `Defines a new stored procedure`],
    [`CALL procedure_name(...)`, `Executes a stored procedure`],
    [`DROP PROCEDURE`, `Removes an existing procedure`]
  ),
  q(
    { q: `Why do we write DELIMITER $$ before creating a procedure?`, a: `Because the procedure body contains semicolons. Changing the delimiter lets MySQL read the whole procedure as one unit.` },
    { q: `Write a procedure GetUsersAbove that takes a salary and shows users earning more than that.`, a: `DELIMITER $$\n\nCREATE PROCEDURE GetUsersAbove(IN p_salary INT)\nBEGIN\n    SELECT * FROM users WHERE salary > p_salary;\nEND$$\n\nDELIMITER ;\n\nCALL GetUsersAbove(70000);` }
  )
]},

// =====================================================================
{ id: 22, title: `Triggers`, sub: `Automatic actions on INSERT, UPDATE or DELETE, with NEW and OLD`, blocks: [

  h(`First, the Problem`),
  p(`You want to keep a log of every new user who registers. You could write extra code in your app everywhere users are added, but someone may forget it, or a user may be added directly in the database.`),
  p(`You want MySQL itself to say: "Whenever a user is inserted, automatically write a line in the log." That is a trigger. Analogy: an automatic door. You do not press any button, the sensor notices you and opens it.`),

  h(`What is a Trigger? (Theory)`),
  p(`A trigger is a special stored program that is automatically executed when an event happens on a table: INSERT, UPDATE or DELETE.`),
  p(`Triggers are commonly used for:`),
  ul(
    `Logging changes`,
    `Enforcing extra business rules`,
    `Automatically updating related data`
  ),
  p(`A trigger can run BEFORE or AFTER the event.`),
  c(`CREATE TRIGGER trigger_name\nAFTER INSERT ON table_name\nFOR EACH ROW\nBEGIN\n    -- statements to execute\nEND;`),

  h(`NEW and OLD`),
  p(`Inside a trigger you can read the row's values. NEW means the new values being saved. OLD means the old values that existed before.`),
  tb([`Event`, `NEW (new values)`, `OLD (original values)`],
    [`INSERT`, `Available (NEW.column)`, `Not available`],
    [`UPDATE`, `Available (NEW.column)`, `Available (OLD.column)`],
    [`DELETE`, `Not available`, `Available (OLD.column)`]
  ),

  h(`Scenario: Log Every New User`),
  h(`Step 1: Create the Log Table`),
  c(`CREATE TABLE user_log (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    user_id INT,\n    name VARCHAR(100),\n    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);`),

  h(`Step 2: Create the Trigger`),
  c(`DELIMITER $$\n\nCREATE TRIGGER after_user_insert\nAFTER INSERT ON users\nFOR EACH ROW\nBEGIN\n    INSERT INTO user_log (user_id, name)\n    VALUES (NEW.id, NEW.name);\nEND$$\n\nDELIMITER ;`),
  ul(
    `AFTER INSERT means the trigger fires after the user is inserted.`,
    `NEW refers to the new row being added to users.`,
    `We insert the new user's id and name into user_log.`
  ),

  h(`Step 3: Test the Trigger`),
  c(`CALL AddUser('Ritika Jain', 'ritika@example.com',\n'Female', '1996-03-12', 74000);\n\nSELECT * FROM user_log;`),
  p(`You should see Ritika's info logged automatically, without writing any insert into user_log yourself.`),

  h(`Another Example: Using OLD and NEW`),
  p(`Keep a history whenever someone's salary changes:`),
  c(`CREATE TABLE salary_log (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    user_id INT,\n    old_salary INT,\n    new_salary INT,\n    changed_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nDELIMITER $$\n\nCREATE TRIGGER before_salary_update\nBEFORE UPDATE ON users\nFOR EACH ROW\nBEGIN\n    IF OLD.salary <> NEW.salary THEN\n        INSERT INTO salary_log (user_id, old_salary, new_salary)\n        VALUES (OLD.id, OLD.salary, NEW.salary);\n    END IF;\nEND$$\n\nDELIMITER ;`),
  p(`Now if you run UPDATE users SET salary = 90000 WHERE id = 1; the old and new salary are saved in salary_log.`),

  h(`Viewing and Dropping Triggers`),
  c(`SHOW TRIGGERS;\n\nDROP TRIGGER IF EXISTS after_user_insert;`),

  h(`Summary`),
  tb([`Trigger component`, `Description`],
    [`BEFORE / AFTER`, `When the trigger runs`],
    [`INSERT / UPDATE / DELETE`, `What kind of action fires it`],
    [`NEW.column`, `The new row (for INSERT, UPDATE)`],
    [`OLD.column`, `The old row (for UPDATE, DELETE)`],
    [`FOR EACH ROW`, `Runs once for every affected row`]
  ),
  n(`Triggers run silently in the background, so use them carefully. Too many triggers make it hard to understand what is happening in the database.`),
  q(
    { q: `Which keyword gives you the new name in an INSERT trigger?`, a: `NEW.name` },
    { q: `When should you use OLD in a trigger?`, a: `In UPDATE or DELETE triggers, to read the values that existed before the change.` }
  )
]},

// =====================================================================
{ id: 23, title: `More on MySQL`, sub: `Logical operators, wildcards, LIMIT, DISTINCT, TRUNCATE and CHANGE vs MODIFY`, blocks: [

  h(`About This Lecture`),
  p(`This lecture collects some useful features and operators that help you write more powerful and flexible queries. Most of them you have already met, so this is a revision with a few new things.`),

  h(`1. Logical Operators`),
  p(`They combine multiple conditions in a WHERE clause.`),
  tb([`Operator`, `Description`, `Example`],
    [`AND`, `All conditions must be true`, `salary > 50000 AND gender = 'Male'`],
    [`OR`, `At least one condition is true`, `gender = 'Male' OR gender = 'Other'`],
    [`NOT`, `Reverses a condition`, `NOT gender = 'Female'`]
  ),

  h(`2. Add a Column to an Existing Table`),
  c(`ALTER TABLE users\nADD COLUMN city VARCHAR(100);`),
  p(`This adds a new column named city to the users table.`),

  h(`3. Wildcard Operators`),
  p(`Wildcards are used with LIKE for pattern matching in text.`),
  tb([`Wildcard`, `Description`, `Example`],
    [`%`, `Matches any sequence of characters`, `WHERE name LIKE 'A%' (starts with A)`],
    [`_`, `Matches exactly one character`, `WHERE name LIKE '_a%' (second letter is a)`]
  ),

  h(`4. LIMIT with OFFSET`),
  p(`LIMIT limits the number of rows returned. OFFSET skips rows before returning results.`),
  c(`SELECT * FROM users\nORDER BY id\nLIMIT 5 OFFSET 10;`),
  p(`This skips the first 10 rows and returns the next 5. The shorter way to write the same thing is LIMIT offset, count:`),
  c(`SELECT * FROM users\nORDER BY id\nLIMIT 10, 5;`),

  h(`5. DISTINCT (Remove Duplicates)`),
  p(`DISTINCT returns only unique values.`),
  c(`SELECT DISTINCT gender FROM users;`),
  dt(`Result`,
    [`gender`],
    [`Female`],
    [`Male`],
    [`Other`]
  ),

  h(`6. TRUNCATE`),
  p(`TRUNCATE removes all rows from a table but keeps the table structure.`),
  c(`TRUNCATE TABLE users;`),
  ul(
    `Faster than DELETE FROM users.`,
    `Cannot be rolled back in most cases.`,
    `Resets AUTO_INCREMENT to 1.`
  ),
  tb([`Feature`, `DELETE`, `TRUNCATE`, `DROP`],
    [`Type of command`, `DML (data)`, `DDL (structure)`, `DDL (structure)`],
    [`WHERE clause`, `Yes (selective)`, `No (wipes all)`, `No (destroys table)`],
    [`AUTO_INCREMENT`, `Keeps the counter`, `Resets to 1`, `Destroyed`],
    [`Speed`, `Slower (row by row)`, `Fast`, `Fast`]
  ),

  h(`7. CHANGE vs MODIFY vs RENAME (for columns)`),
  p(`All three change an existing column, but they do different things.`),
  c(`-- CHANGE: rename AND change the datatype\nALTER TABLE users\nCHANGE COLUMN city location VARCHAR(150);\n\n-- MODIFY: only change the datatype\nALTER TABLE users\nMODIFY COLUMN salary BIGINT;\n\n-- RENAME COLUMN: only rename\nALTER TABLE users\nRENAME COLUMN location TO town;`),
  tb([`Clause`, `Can rename?`, `Can change type?`, `Example`],
    [`RENAME COLUMN`, `Yes`, `No`, `ALTER TABLE users RENAME COLUMN phone TO mobile;`],
    [`MODIFY COLUMN`, `No`, `Yes`, `ALTER TABLE users MODIFY COLUMN salary BIGINT;`],
    [`CHANGE COLUMN`, `Yes`, `Yes`, `ALTER TABLE users CHANGE COLUMN city location VARCHAR(150);`]
  ),

  h(`Congratulations!`),
  p(`You have gone through MySQL from installation to joins, views, indexes, subqueries, procedures and triggers. Keep practising: open Workbench, create your own tables, and try every query yourself. SQL is learned by typing it.`),
  q(
    { q: `Which clause removes duplicate values from the result?`, a: `DISTINCT.` },
    { q: `You want to rename a column and change its type in one go. Which clause?`, a: `CHANGE COLUMN.` }
  )
]}

]