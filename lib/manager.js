import db from "../db/connection.js";

export default class Database {
	async viewDepartments() {
		const [departments] = await db.query("SELECT * FROM departments");
		return departments;
	}

	async viewRoles() {
		const [roles] = await db.query("SELECT * FROM roles");
		return roles;
	}

	async viewEmployees() {
		const [employees] = await db.query("SELECT * FROM employees");
		return employees;
	}

	async addDepartment(department) {
		const [result] = await db.query("INSERT INTO departments SET ?", department);
		return result;
	}
	async addRole({ roleName, roleSalary, roleDepartment }) {
		const [result] = await db.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [roleName, roleSalary, roleDepartment]);
		return result;
	}

	async addEmployee({ firstName, lastName, role, manager }) {
		const [result] = await db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [
			firstName,
			lastName,
			role,
			manager,
		]);
		return result;
	}
	async updateEmployeeRole({ employee, role}) {
		const [result] = await db.query("UPDATE employees SET role_id = ? WHERE id = ?", [role, employee]);
		return result;
	}
}
