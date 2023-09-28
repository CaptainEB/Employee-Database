import inquirer from "inquirer";

export default async function input() {
	return await inquirer.prompt([
		{
			type: "list",
			name: "choice",
			message: "Choose an option",
			choices: [
				"View all departments",
				"View all roles",
				"View all employees",
				"Add a department",
				"Add a role",
				"Add an employee",
				"Update an employee role",
				"Exit",
			],
		},
	]);
}

export async function departmentInput() {
	return await inquirer.prompt([
		{
			type: "input",
			name: "name",
			message: "Enter the department name",
		},
	]);
}

export async function roleInput(departments) {
	const result = await inquirer.prompt([
		{
			type: 'input',
			name: 'roleName',
			message: 'Enter the role title',
		},
		{
			type: 'input',
			name: 'roleSalary',
			message: 'Enter the role salary',
		},
		{
			type: 'list',
			name: 'roleDepartment',
			message: 'Choose the role department',
			choices: departments.map(department => department.name),
		},
	]);
	result.roleSalary = parseInt(result.roleSalary);
	result.roleDepartment = departments.find(department => department.name === result.roleDepartment).id;
	return result;
}

export async function employeeInput(roles, employees) {
	employees.push({ id: null, first_name: 'NA', last_name: 'NA' });
	const result = await inquirer.prompt([
		{
			type: 'input',
			name: 'firstName',
			message: 'Enter the employee first name',
		},
		{
			type: 'input',
			name: 'lastName',
			message: 'Enter the employee last name',
		},
		{
			type: 'list',
			name: 'role',
			message: 'Choose the employee role',
			choices: roles.map(role => role.title),
		},
		{
			type: 'list',
			name: 'manager',
			message: 'Choose the employee manager',
			choices: employees.map(employee => `${employee.first_name} ${employee.last_name}`),
		},
	]);
	result.role = roles.find(role => role.title === result.role).id;
	result.manager = employees.find(employee => `${employee.first_name} ${employee.last_name}` === result.manager).id;

	return result;
}

export async function updateEmployeeRoleInput(employees, roles) {
	const result = await inquirer.prompt([
		{
			type: 'list',
			name: 'employee',
			message: 'Choose the employee to update',
			choices: employees.map(employee => `${employee.first_name} ${employee.last_name}`),
		},
		{
			type: 'list',
			name: 'role',
			message: 'Choose the employee role',
			choices: roles.map(role => role.title),
		},
	]);
	result.employee = employees.find(employee => `${employee.first_name} ${employee.last_name}` === result.employee).id;
	result.role = roles.find(role => role.title === result.role).id;

	return result;
}