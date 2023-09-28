import "dotenv/config";
import mysql from "mysql2";

export default mysql.createConnection(
	{
		host: "localhost",
		user: process.env._USERNAME,
		password: process.env._PASSWORD,
		database: process.env._DATABASE,
	},
	console.log("Connected to the database")
).promise();
