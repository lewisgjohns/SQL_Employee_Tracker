const inquirer = require('inquirer');
const queries = require('./queries');

const mainMenu = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
    ],
  });

  switch (action) {
    case 'View all departments':
      const departments = await queries.getAllDepartments();
      console.table(departments);
      break;
    case 'View all roles':
      const roles = await queries.getAllRoles();
      console.table(roles);
      break;
    case 'View all employees':
      const employees = await queries.getAllEmployees();
      console.table(employees);
      break;
    case 'Add a department':
      const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
      });
      await queries.addDepartment(name);
      // Handle adding a department
      break;
    case 'Add a role':
      const {title, salary, department_id} = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          type: 'number',
          name: 'salary',
          message: 'Enter the salary of the role:',
        },
        {
          type: 'input',
          name: 'department_id',
          message: 'Enter the department id of the role:',
        },
      ]);
      await queries.addRole(title, salary, department_id);
      // Handle adding a role
      break;
    case 'Add an employee':
      const {first_name, last_name, role_id, manager_id} = await inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter the first name of the employee:',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter the last name of the employee:',
        },
        {
          type: 'input',
          name: 'role_id',
          message: 'Enter the role id of the employee:',
        },
        {
          type: 'input',
          name: 'manager_id',
          message: 'Enter the manager id of the employee:',
        },
      ]);
      await queries.addEmployee(first_name, last_name, role_id, manager_id);
      // Handle adding an employee
      break;
    case 'Update an employee role':
      const update_answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'employee_id',
          message: 'Enter the id of the employee:',
        },
        {
          type: 'input',
          name: 'role_id',
          message: 'Enter the id of the new role:',
        },
      ]);
      await queries.update_answers(update_answers.employee_id, update_answers.role_id);
      // Handle updating an employee role
      break;
    default:
      console.log('Invalid option');
  }

  mainMenu();
};

mainMenu();
