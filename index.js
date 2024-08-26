const inquirer = require('inquirer');
const queries = require('./queries');

//this function will display the main menu
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

  //this switch statement will call the appropriate function based on the user's choice
  switch (action) {
    case 'View all departments':
      const departments = await queries.getAllDepartments();
      console.table(departments);
      break;
      //this case will call the getAllRoles function and display the results in a table
    case 'View all roles':
      const roles = await queries.getAllRoles();
      console.table(roles);
      break;
      //this case will call the getAllEmployees function and display the results in a table
    case 'View all employees':
      const employees = await queries.getAllEmployees();
      console.table(employees);
      break;
      //this case will prompt the user to enter the name of the department they would like to add
    case 'Add a department':
      const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
      });
      await queries.addDepartment(name);
      break;
      //this case will prompt the user to enter the title, salary, and department id of the role they would like to add
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
      break;
      //this case will prompt the user to enter the first name, last name, role id, and manager id of the employee they would like to add
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
      break;
      //this case will prompt the user to enter the id of the employee they would like to update and the id of the new role
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
    
      break;
      //this case will display an error message if the user enters an invalid option
    default:
      console.log('Invalid option');
  }

  mainMenu();
};

mainMenu();
