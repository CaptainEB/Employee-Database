import input, { departmentInput, employeeInput, roleInput, updateEmployeeRoleInput } from "./lib/input.js";
import Manager from "./lib/manager.js";

const manager = new Manager();

while (true) {
	console.log("---------------------");
	switch ((await input()).choice) {
		case "View all departments":
			console.log("---------------------");
			console.log(await manager.viewDepartments());
			break;
		case "View all roles":
			console.log("---------------------");
			console.log(await manager.viewRoles());
			break;
		case "View all employees":
			console.log("---------------------");
			console.log(await manager.viewEmployees());
			break;
		case "Add a department":
			console.log("---------------------");
			manager.addDepartment(await departmentInput());
			break;
		case "Add a role":
			console.log("---------------------");
			const roleInfo = await roleInput(await manager.viewDepartments());
			manager.addRole(roleInfo);
			break;
		case "Add an employee":
			console.log("---------------------");
			const employeeInfo = await employeeInput(await manager.viewRoles(), await manager.viewEmployees());
			manager.addEmployee(employeeInfo);
			break;
		case "Update an employee role":
			console.log("---------------------");
			const updatedEmployeeRole = await updateEmployeeRoleInput(await manager.viewEmployees(), await manager.viewRoles());
			manager.updateEmployeeRole(updatedEmployeeRole);
			break;
		case "Exit":
			process.exit();
		default:
			console.log("Invalid choice");
			break;
	}
}
