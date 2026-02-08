-- Create database
CREATE DATABASE zoho_RBAC;
USE zoho_RBAC;

-- Roles table
CREATE TABLE roles (
  role_id INT PRIMARY KEY AUTO_INCREMENT,
  role_name VARCHAR(100) UNIQUE
);

-- Users table
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(200) UNIQUE,
  password_hash VARCHAR(255),
  role_id INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- Permissions table
CREATE TABLE permissions (
  permission_id INT PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(100) UNIQUE,    
  description VARCHAR(255)
);

-- Role-Permissions mapping
CREATE TABLE role_permissions (
  role_id INT,
  permission_id INT,
  PRIMARY KEY(role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (permission_id) REFERENCES permissions(permission_id)
);

-- Employees table
CREATE TABLE employees (
  employee_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150),
  email VARCHAR(150),
  department VARCHAR(100),
  salary DECIMAL(10,2),
  leave_balance INT
);

-- Sensitive fields table
CREATE TABLE sensitive_fields (
  table_name VARCHAR(100),
  column_name VARCHAR(100),
  PRIMARY KEY (table_name, column_name)
);

-- Data tables metadata
CREATE TABLE data_tables (
  table_name VARCHAR(100) PRIMARY KEY,
  display_name VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE
);

-- Projects table
CREATE TABLE projects (
  project_id INT PRIMARY KEY AUTO_INCREMENT,
  project_name VARCHAR(150),
  client_name VARCHAR(150),
  budget DECIMAL(10,2),
  status VARCHAR(50)
);

-- INSERT DATA

-- Roles
INSERT INTO roles (role_name) VALUES
  ('ADMIN'),
  ('HR'),
  ('USER');

-- Users
INSERT INTO users (email, password_hash, role_id) VALUES
  ('admin@zoho.in', '$2b$10$Gtp1f62lcHgpo6X47FBxBueKS3YlmBAfLeuYjQrKHvWtXF2WmK8pu', 1);

-- Permissions
INSERT INTO permissions (slug, description) VALUES
  ('view_projects', 'View projects'),
  ('edit_projects', 'Edit projects'),
  ('view_projects_budget', 'View project budget'),
  ('edit_projects_budget', 'Edit project budget'),
  ('manage_roles', 'Create users and assign roles'),
  ('view_employees', 'View employees table'),
  ('edit_employees', 'Edit employees table'),
  ('view_employees_salary','View employee salary'),
  ('edit_employees_salary','Edit employee salary'),
  ('view_employees_leave_balance','View leave balance'),
  ('edit_employees_leave_balance','Edit leave balance'),
  ('view_tables', 'View tables');
  

-- ADMIN gets everything
INSERT INTO role_permissions VALUES
  (1, 1),(1, 2),(1, 3),(1, 4),
  (1, 5),(1, 6),(1, 7),(1, 8),
  (1, 9),(1, 10),(1, 11),(1,12);

-- HR
INSERT INTO role_permissions VALUES
  (2, 6),  
  (2, 8),  
  (2, 10),
  (2,12); 

-- USER
INSERT INTO role_permissions VALUES
  (3, 6),
  (3,12);  

-- Employees
INSERT INTO employees (name, email, department, salary, leave_balance) VALUES
  ('Gokul', 'gokul@zoho.in', 'Engineering', 75000.00, 12),
  ('Vicky', 'vicky@zoho.in', 'HR', 55000.00, 18),
  ('Hari', 'hari@zoho.in', 'Finance', 68000.00, 10),
  ('Krishna', 'krishna@zoho.in', 'Marketing', 60000.00, 15),
  ('Akash', 'akash@zoho.in', 'Engineering', 80000.00, 8),
  ('Saravana', 'saravana@zoho.in', 'Sales', 50000.00, 20),
  ('Bharath', 'bharath@zoho.in', 'Finance', 72000.00, 9),
  ('Gokul Vicky', 'gokul.vicky@zoho.in', 'HR', 56000.00, 14),
  ('Hari Krishna', 'hari.krishna@zoho.in', 'Engineering', 85000.00, 7),
  ('Akash Saravana', 'akash.saravana@zoho.in', 'Marketing', 62000.00, 16);

-- Projects
INSERT INTO projects (project_name, client_name, budget, status) VALUES
  ('HR Portal', 'Zoho', 250000, 'Active'),
  ('CRM Revamp', 'TCS', 400000, 'Planning'),
  ('Payroll System', 'Infosys', 300000, 'Completed');

-- Sensitive fields to restrict
INSERT INTO sensitive_fields VALUES
  ('projects', 'budget'),
  ('employees', 'salary'),
  ('employees', 'leave_balance');

-- Data tables to show available table
INSERT INTO data_tables (table_name, display_name) VALUES
  ('employees', 'Employees'),
  ('projects', 'Projects');