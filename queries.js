const pool = require('./db');

// Function to get all departments
const getAllDepartments = async () => {
  const result = await pool.query('SELECT * FROM department');
  return result.rows;
};

// Function to get all roles
const getAllRoles = async () => {
  const result = await pool.query(`
    SELECT role.id, role.title, role.salary, department.name as department
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  return result.rows;
};

// Function to get all employees
const getAllEmployees = async () => {
  const result = await pool.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title as job_title, department.name as department, role.salary, manager.first_name as manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
  `);
  return result.rows;
};


const addDepartment = async (name) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

const addRole = async (title, salary, department_id) => {
  await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
};

const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
};

const update_answers = async (employee_id, role_id) => {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
}
// Functions to add and update entries

// (implement as needed)

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  update_answers,
  // Add more functions here
};
