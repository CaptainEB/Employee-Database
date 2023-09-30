import db from "../db/connection.js";

class Database {
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
	async updateEmployeeRole({ employee, role }) {
		const [result] = await db.query("UPDATE employees SET role_id = ? WHERE id = ?", [role, employee]);
		return result;
	}
	async updateEmployeeManager({ employee, manager }) {
		const [result] = await db.query("UPDATE employees SET manager_id = ? WHERE id = ?", [manager, employee]);
		return result;
	}
	async sortByManager() {
		const [result] = await db.query("SELECT * FROM employees ORDER BY manager_id");
		return result;
	}
	async sortByDepartment() {
		const [result] = await db.query("SELECT * FROM employees ORDER BY role_id");
		return result;
	}
	async deleteDepartment(department) {
		const [result] = await db.query("DELETE FROM departments WHERE id = ?", department);
		return result;
	}
	async deleteRole(role) {
		const [result] = await db.query("DELETE FROM roles WHERE id = ?", role);
		return result;
	}
	async deleteEmployee(employee) {
		const [result] = await db.query("DELETE FROM employees WHERE id = ?", employee);
		return result;
	}
	async viewDepartmentBudget(department) {
		const [[result]] = await db.query("SELECT SUM(salary) FROM roles WHERE department_id = ?", department);
		return result;
	}
}

export default new Database();
