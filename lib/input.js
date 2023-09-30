import inquirer from "inquirer";

class Input {
	async mainMenu() {
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
					"Update an employee manager",
					"Sort employees by manager",
					"Sort employees by department",
					"Delete a department",
					"Delete a role",
					"Delete an employee",
					"View total utilized budget of a department",
					"Exit",
				],
			},
		]);
	}

	async departmentInput() {
		return await inquirer.prompt([
			{
				type: "input",
				name: "name",
				message: "Enter the department name",
			},
		]);
	}

	async roleInput(departments) {
		const result = await inquirer.prompt([
			{
				type: "input",
				name: "roleName",
				message: "Enter the role title",
			},
			{
				type: "input",
				name: "roleSalary",
				message: "Enter the role salary",
			},
			{
				type: "list",
				name: "roleDepartment",
				message: "Choose the role department",
				choices: departments.map((department) => department.name),
			},
		]);
		result.roleSalary = parseInt(result.roleSalary);
		result.roleDepartment = departments.find((department) => department.name === result.roleDepartment).id;
		return result;
	}

	async employeeInput(roles, employees) {
		employees.push({ id: null, first_name: "NA", last_name: "NA" });
		const result = await inquirer.prompt([
			{
				type: "input",
				name: "firstName",
				message: "Enter the employee first name",
			},
			{
				type: "input",
				name: "lastName",
				message: "Enter the employee last name",
			},
			{
				type: "list",
				name: "role",
				message: "Choose the employee role",
				choices: roles.map((role) => role.title),
			},
			{
				type: "list",
				name: "manager",
				message: "Choose the employee manager",
				choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`),
			},
		]);
		result.role = roles.find((role) => role.title === result.role).id;
		result.manager = employees.find((employee) => `${employee.first_name} ${employee.last_name}` === result.manager).id;

		return result;
	}

	async updateEmployeeRoleInput(employees, roles) {
		const result = await inquirer.prompt([
			{
				type: "list",
				name: "employee",
				message: "Choose the employee to update",
				choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`),
			},
			{
				type: "list",
				name: "role",
				message: "Choose the employee role",
				choices: roles.map((role) => role.title),
			},
		]);
		result.employee = employees.find((employee) => `${employee.first_name} ${employee.last_name}` === result.employee).id;
		result.role = roles.find((role) => role.title === result.role).id;

		return result;
	}

	async updateEmployeeManagerInput(employees) {
		employees.push({ id: null, first_name: "NA", last_name: "NA" });
		const result = await inquirer.prompt([
			{
				type: "list",
				name: "employee",
				message: "Choose the employee to update",
				choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`),
			},
			{
				type: "list",
				name: "manager",
				message: "Choose the employee manager",
				choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`),
			},
		]);
		result.employee = employees.find((employee) => `${employee.first_name} ${employee.last_name}` === result.employee).id;
		result.manager = employees.find((employee) => `${employee.first_name} ${employee.last_name}` === result.manager).id;
		if (result.employee === result.manager) {
			console.log("------------ Employee cannot be their own manager. Try again. ------------");
			return await this.updateEmployeeManagerInput(employees);
		}
		return result;
	}

	async deleteDepartmentInput(departments) {
		const answer = await inquirer.prompt([
			{
				type: "list",
				name: "department",
				message: "Choose the department to delete",
				choices: departments.map((department) => department.name),
			},
		]);
		const result = departments.find((department) => department.name === answer.department).id;
		return result;
	}
	async deleteRoleInput(roles) {
		const answer = await inquirer.prompt([
			{
				type: "list",
				name: "role",
				message: "Choose the role to delete",
				choices: roles.map((role) => role.title),
			},
		]);
		const result = roles.find((role) => role.title === answer.role).id;
		return result;
	}
	async deleteEmployeeInput(employees) {
		const answer = await inquirer.prompt([
			{
				type: "list",
				name: "employee",
				message: "Choose the employee to delete",
				choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`),
			},
		]);
		const result = employees.find((employee) => `${employee.first_name} ${employee.last_name}` === answer.employee).id;
		return result;
	}
	async viewBudgetInput(departments) {
		const answer = await inquirer.prompt([
			{
				type: "list",
				name: "department",
				message: "Choose the department to view budget",
				choices: departments.map((department) => department.name),
			},
		]);
		const result = departments.find((department) => department.name === answer.department).id;
		return result;
	}
}

export default new Input();
