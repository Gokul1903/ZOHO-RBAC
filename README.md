# Zoho RBAC – Role Based Access Control System

A full-stack "Role-Based Access Control (RBAC)" application inspired by Zoho-style permission handling.

This project demonstrates "dynamic permission-based access" at:
- "Table level"
- "Field (column) level"
- "UI + Backend enforcement"

The system is designed so that "no table name, column name, or permission logic is hardcoded in the frontend".


## What This Project Does

# Key Features

- Authentication using JWT (stored in HTTP-only cookies)
- Role management (ADMIN, HR, USER)
- Permission management (grant / revoke dynamically)
- Dynamic data tables (Employees, Projects, etc.)
- Sensitive field protection (salary, budget, leave balance)
- Edit access controlled at **table + column level**
- Backend-driven UI (frontend renders only allowed data)
- Easily extensible – add a new table without frontend changes



#  How It Works (High Level)

1. "User logs in"
2. Backend issues JWT containing user permissions
3. Frontend requests:
   - available tables
   - table data
4. Backend:
   - filters rows
   - removes restricted columns
   - sends metadata about editable fields
5. Frontend:
   - renders UI based only on backend response
   - never guesses permissions

> Security Rule:  
> Frontend never decides permissions. Backend is the single source of truth.

# Permissions & Adding a New Table

## Permission Design & Naming Convention

This project follows a strict, predictable permission naming strategy so that permissions can be resolved dynamically without hardcoding logic.

Permission Pattern
- view_< table >(table level)
- edit_< table >(table level)
- view_< table >_< column >(field level)
- edit_< table >_< column >(field level)

Example: projects table

INSERT INTO permissions (slug, description) VALUES
('view_projects', 'View projects') ,
('edit_projects', 'Edit projects') ,
('view_projects_budget', 'View project budget') ,
('edit_projects_budget', 'Edit project budget');

# Meaning of Each Permission

## Permission

- view_projects	=> Allows viewing the projects table
- edit_projects	=> Allows editing non-sensitive project fields
- view_projects_budget	=> Allows viewing the budget column
- edit_projects_budget	=> Allows editing the budget column
- view_tables	=> Allows table names to appear in dashboard

# Sensitive Columns Handling

## Sensitive columns must be registered in the backend, not the frontend.

INSERT INTO sensitive_fields (table_name, column_name) VALUES
('projects', 'budget'),
('employees', 'salary'),
('employees', 'leave_balance');

How It Works

- Backend removes sensitive columns automatically if permission is missing
- Frontend never checks sensitive rules manually
- Editing is blocked again during UPDATE (double protection)

# Adding a New Table (Zero Frontend Changes)

## To add a new table (example: invoices):

#### Step 1 Create the table

CREATE TABLE invoices (

  invoice_id INT PRIMARY KEY AUTO_INCREMENT,

  client_name VARCHAR(150),

  amount DECIMAL(10,2),

  status VARCHAR(50)
);

#### Step 2 Register table for UI visibility

INSERT INTO data_tables (table_name, display_name)
VALUES ('invoices', 'Invoices');

#### Step 3️ Define permissions

INSERT INTO permissions (slug, description) VALUES

('view_invoices', 'View invoices'),

('edit_invoices', 'Edit invoices'),

('view_invoices_amount', 'View invoice amount'),

('edit_invoices_amount', 'Edit invoice amount');

#### Step 4️ Mark sensitive fields (if any)

INSERT INTO sensitive_fields (table_name, column_name)
VALUES ('invoices', 'amount');

#### Step 5️ Assign permissions to roles

INSERT INTO role_permissions (role_id, permission_id)
VALUES (1, < permission_id >);

The table will now:

- Appear automatically in dashboard tabs
- Respect view/edit permissions
- Enforce column-level security
- Work with the same frontend components


# Tech Stack

## Frontend
- React
- Bootstrap

## Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication

# Prerequisites

Make sure the following are installed on your system:

- Node.js (v18 or above)
- MySQL Server(v8+)
- Git


#  Installation & Setup

### Clone the Repository

git clone https://github.com/Gokul1903/ZOHO-RBAC.git

- cd ZOHO-RBAC
- cd BackEnd
- npm install
- npm install nodemon

## Create .env file inside BackEnd

- PORT=5000
- DB_HOST=localhost
- DB_USER=root
- DB_PASS=your_mysql_password
- DB_NAME=zoho_RBAC
- JWT_SECRET=your_secret_key

Use .env.example as reference if shared.

## Database Setup

- Open MySQL

- Run the SQL file provided in the project (schema.sql)

This will create:

- roles
- users
- permissions
- employees
- projects
- sensitive_fields
- data_tables

## Start Backend Server
 - npm run dev

Backend will run on:
- http://localhost:5000




## Frontend Setup
open new teerminal
- cd FrontEnd
- npm install

Create .env inside FrontEnd/:

- VITE_BASE_URL=http://localhost:5000

Use .env.example as reference if shared.

Start Frontend
- npm run dev

Frontend will run on:
- http://localhost:5173


## Default Login for admin
Email: admin@zoho.in
Password: zohoadmin@321


# Adding a New Table (No Frontend Change Required)

- Create a table in MySQL
- Insert its name into data_tables
- Define sensitive columns in sensitive_fields
- Add permissions (view_x, edit_x, edit_x_field)
- Assign permissions to roles

Table will automatically appear in UI
Permissions will work without code changes


# Author
Gokul Raj
Zoho RBAC Interview Project