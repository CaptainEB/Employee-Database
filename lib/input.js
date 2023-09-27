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
			],
		},
	]);
}
