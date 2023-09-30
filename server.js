import input from "./lib/input.js";
import manager from "./lib/manager.js";

// const manager = new Manager();

while (true) {
	const departments = await manager.viewDepartments();
	const roles = await manager.viewRoles();
	const employees = await manager.viewEmployees();
	console.log("---------------------");
	switch ((await input.mainMenu()).choice) {
		case "View all departments":
			console.log("---------------------");
			departments.forEach((department) => console.log(`   Department Name: ${department.name}`));
			break;
		case "View all roles":
			console.log("---------------------");
			roles.forEach((role) => {
				const roleDepartment = departments.find((department) => department.id === role.department_id).name;
				console.log(`   Role Title: ${role.title}  | Salary: ${role.salary}  | Department: ${roleDepartment}`);
			});
			break;
		case "View all employees":
			console.log("---------------------");
			employees.forEach((employee) => {
				const employeeRole = roles.find((role) => role.id === employee.role_id).title;
				const employeeManager = employees.find((manager) => manager.id === employee.manager_id);
				console.log(
					`   Name: ${employee.first_name} ${employee.last_name}  | Role: ${employeeRole}  | Manager: ${
						employeeManager ? employeeManager.first_name : "None"
					}`
				);
			});
			break;
		case "Add a department":
			console.log("---------------------");
			manager.addDepartment(await input.departmentInput());
			break;
		case "Add a role":
			console.log("---------------------");
			const roleInfo = await input.roleInput(departments);
			manager.addRole(roleInfo);
			break;
		case "Add an employee":
			console.log("---------------------");
			const employeeInfo = await input.employeeInput(roles, employees);
			manager.addEmployee(employeeInfo);
			break;
		case "Update an employee role":
			console.log("---------------------");
			const updatedEmployeeRole = await input.updateEmployeeRoleInput(departments, roles);
			manager.updateEmployeeRole(updatedEmployeeRole);
			break;
		case "Update an employee manager":
			console.log("---------------------");
			const updatedEmployeeManager = await input.updateEmployeeManagerInput(departments);
			manager.updateEmployeeManager(updatedEmployeeManager);
			break;
		case "Sort employees by manager":
			console.log("---------------------");
			const sortedByManager = await manager.sortByManager();
			console.log(sortedByManager);
			break;
		case "Sort employees by department":
			console.log("---------------------");
			const sortedByDepartment = await manager.sortByDepartment();
			console.log(sortedByDepartment);
			break;
		case "Delete a department":
			console.log("---------------------");
			const deleteDepartmentChoice = await input.deleteDepartmentInput(departments);
			await manager.deleteDepartment(deleteDepartmentChoice);
			break;
		case "Delete a role":
			console.log("---------------------");
			const deleteRoleChoice = await input.deleteRoleInput(roles);
			manager.deleteRole(deleteRoleChoice);
			break;
		case "Delete an employee":
			console.log("---------------------");
			const deleteEmployeeChoice = await input.deleteEmployeeInput(employees);
			manager.deleteEmployee(deleteEmployeeChoice);
			break;
		case "View total utilized budget of a department":
			console.log("---------------------");
			const departmentBudgetChoice = await input.viewBudgetInput(departments);
			const departmentBudgetName = departments.find((department) => department.id === departmentBudgetChoice).name;
			const departmentBudget = await manager.viewDepartmentBudget(departmentBudgetChoice);
			console.log(`The total utilized budget of ${departmentBudgetName} department is: $${departmentBudget[Object.keys(departmentBudget)[0]]}`);
			break;
		case "Exit":
			process.exit();
		default:
			console.log("Invalid choice");
			break;
	}
}
